

import { RequestMethod, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'
import { IS_DEV_ENV } from './utils/is-dev.util'
import { json, urlencoded } from 'express'


async function bootstrap() {
	// const app = await NestFactory.create<NestExpressApplication>(AppModule)

	const app = await NestFactory.create(AppModule, { bodyParser: false })
	app.use(cookieParser())
	app.use(json({ limit: '100mb' })) 
	app.use(urlencoded({ extended: true, limit: '100mb' }))

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	app.setGlobalPrefix('api', {
		exclude: [{ path: 'verify-email', method: RequestMethod.GET }]
	})

	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	app.use(helmet({ contentSecurityPolicy: IS_DEV_ENV ? false : undefined }))
	

	// app.enableCors({
	// 	origin: 'http://localhost:3000',
	// 	credentials: true
	// })
	
	const allowedOrigins = [ 'https://youtube-clone-eight-tan.vercel.app', 'https://youtube-clone-eight-tan.vercel.app/', 'http://localhost:3000' ]

	if (process.env.FRONTEND_URL) { allowedOrigins.push(process.env.FRONTEND_URL) }

	app.enableCors({ 
		origin: [ 
			'https://youtube-clone-eight-tan.vercel.app', 
			'http://localhost:3000' ], 
			credentials: true, 
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', 
			allowedHeaders: ['Content-Type', 'Authorization', 'set-cookie', 'recaptcha'], 
			exposedHeaders: ['set-cookie'] })

	app.getHttpAdapter().getInstance().disable('x-powered-by')	

	await app.listen(process.env.PORT || 4200, '0.0.0.0')
}
bootstrap()
