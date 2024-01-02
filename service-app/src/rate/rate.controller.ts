import { Controller, Get, Post, Delete } from "@nestjs/common";
import { RateService } from "./rate.service";

@Controller('rate')
export class RateController {
    constructor(
        private rateService : RateService
    ) {}

    @Get()
    async getRate() {
        return await this.rateService.getRate();
    }

    @Post()
    async sendRate() {
        return await this.rateService.sendRate();
    }
}