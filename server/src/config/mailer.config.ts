import { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

export const getMailerConfig = async (configService: ConfigService): Promise<MailerOptions> => ({
  transport: {
    host: configService.get('SMTP_SERVER'),
    port: 587,
    secure: false,
    auth: {
      user: configService.get('SMTP_LOGIN'),
      pass: configService.get('SMTP_PASSWORD'),
    },
  },
  defaults: {
    // from: `"MyApp" <${configService.get('SMTP_LOGIN')}>`,
	from: "rekops13@gmail.com"
  },
})