import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MetricsService } from 'src/metrics/metrics.service';

@Injectable()
export class MailerService {
    #transporter
    constructor(
        private configService: ConfigService,
        private metricsService: MetricsService
    ) {
        this.#transporter = nodemailer.createTransport({
            host: configService.get('SMTP_HOST'),
            port: configService.get('SMTP_PORT'),
            secure: false,
            auth: {
                user: configService.get('SMTP_USER'),
                pass: configService.get('SMTP_PASSWORD')
            }
        });
    }

    async sendRate(to, rate) {
        this.metricsService.pushMetric('email-send')
        try {
            await this.#transporter.sendMail({
                from: this.configService.get('SMTP_USER'),
                to,
                subject: 'BTC-UAH Rate',
                text: '',
                html:
                    `
                        <div>
                            <h1>Here is the current exchange rate:</h1>
                            <p>1 btc = ${rate} uah</p>
                        </div>
                    `
            });
        } catch (error) {
            this.metricsService.pushMetric('email-send-error')
        }
    }
}
