import { Controller, Get, Post, Delete } from "@nestjs/common";
import { MetricsService } from "./metrics.service";

@Controller('metrics')
export class RateController {
    constructor(
        private metricsService: MetricsService
    ) {}

    @Get()
    async getRate() {
        return await this.metricsService.getMetrics();
    }
}