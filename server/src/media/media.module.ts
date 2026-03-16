import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { MediaController } from './media.controller'
import { MediaService } from './media.service'
import { UploadsController } from './uploads.controller'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.join(process.cwd(), 'uploads'),
			serveRoot: '/uploads',
			renderPath: '/', 
			exclude: ['/api/(.*)'],
			})
	],
	controllers: [MediaController, UploadsController],
	providers: [MediaService]
})
export class MediaModule {}
