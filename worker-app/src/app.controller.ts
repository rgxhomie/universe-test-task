import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MetricDto } from './dtos';

@Controller('metrics')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMetrics() {
    return this.appService.getMetrics();
  }

  @Post()
  saveMetrics(@Body() data: MetricDto) {
    return this.appService.saveMetrics(data.name, data.value);
  }
}
