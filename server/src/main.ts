

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
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	app.setGlobalPrefix('api', {
		exclude: [{ path: 'verify-email', method: RequestMethod.GET }]
	})

	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	app.use(helmet({ contentSecurityPolicy: IS_DEV_ENV ? false : undefined }))
	app.use(cookieParser())

	// app.enableCors({
	// 	origin: 'http://localhost:3000',
	// 	credentials: true
	// })
	
	const allowedOrigins = ['http://localhost:3000', 'https://youtube-clone-eight-tan.vercel.app']

	if (process.env.FRONTEND_URL) { allowedOrigins.push(process.env.FRONTEND_URL) }

	// app.enableCors({ origin: allowedOrigins, credentials: true })
	app.enableCors({ origin: 'https://youtube-clone-eight-tan.vercel.app/', credentials: true, exposedHeaders: 'set-cookie' })

	app.disable('x-powered-by')

	app.use(json({ limit: '100mb' })) app.use(urlencoded({ extended: true, limit: '100mb' }))

	await app.listen(process.env.PORT || 4200, '0.0.0.0')
}
bootstrap()
