import { Injectable } from "@nestjs/common";
import { MailerService } from "src/mailer/mailer.service";
import { MetricsService } from "src/metrics/metrics.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class RateService {
    #rate: number

    constructor(
        private mailerService: MailerService,
        private prismaService: PrismaService,
        private metricsService: MetricsService,
    ) {}

    async getRate(): Promise<{success: boolean, conversion: number}> {
        const coinwatchUrl = new URL('https://http-api.livecoinwatch.com/tools/conversion?from=BTC&to=UAH');
        const response = await fetch(coinwatchUrl);
        const data = await response.json();

        const gauge = this.#rate ? this.#rate - data.conversion : 0;
        this.metricsService.pushMetric('exchange-gauge', gauge)
        this.#rate = data.conversion;

        return data;
    }

    async sendRate() {
        const emails = await this.prismaService.email.findMany({
            select: {
                email: true
            },
            where: {
                is_subscribed: true
            }
        });

        await Promise.allSettled(
            emails.map(async email => {
                return await this.mailerService.sendRate(email.email, (await this.getRate()).conversion);
            }
        ))

        return 'Rate successfully sent to active subscriptions';
    }
}