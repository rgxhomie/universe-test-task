import { Controller, Get, Post, Delete, Body } from "@nestjs/common";
import { EmailsService } from "./emails.service";
import { SubscribeDto, UnSubscribeDto } from "./dto";
import { MetricsService } from "src/metrics/metrics.service";

@Controller('emails')
export class EmailsController {
    constructor(
        private emailsService : EmailsService,
        private metricsService: MetricsService
    ) {}

    @Get()
    getEmails() {
        return this.emailsService.getEmails();
    }

    @Post()
    async subscribe(@Body() dto: SubscribeDto) {
        this.metricsService.pushMetric('subscribe');

        return await this.emailsService.subscribeUser(dto.email);
    }

    @Delete()
    unSubscribe(@Body() dto: UnSubscribeDto) {
        this.metricsService.pushMetric('unsubscribe');

        return this.emailsService.unSubscribeUser(dto.email);
    }
}