import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as prometheus from 'prom-client';

@Injectable()
export class AppService {
  private subscribeCount: prometheus.Counter;
  private unsubscribeCount: prometheus.Counter;
  private sendCount: prometheus.Counter;
  private sendErrorCount: prometheus.Counter;
  private exchangeRate: prometheus.Gauge;

  constructor(
    private prisma: PrismaService
  ) {
    this.subscribeCount = new prometheus.Counter({
      name: 'subscribe',
      help: 'Number of subscribed emails',
    });

    this.unsubscribeCount = new prometheus.Counter({
      name: 'unsubscribe',
      help: 'Number of unsubscribed emails',
    });

    this.sendCount = new prometheus.Counter({
      name: 'email-send',
      help: 'Number of sent emails',
    });

    this.sendErrorCount = new prometheus.Counter({
      name: 'email-send-error',
      help: 'Number of email sending errors',
    });

    this.exchangeRate = new prometheus.Gauge({
      name: 'exchange-gauge',
      help: 'Exchange rate',
    });

    setInterval(async() => {
      prisma.metric.update({
        where: {name: 'subscibe'},
        data: {value: Number(this.subscribeCount.get())}
      })
      prisma.metric.update({
        where: {name: 'unsubscibe'},
        data: {value: Number(this.subscribeCount.get())}
      })
      prisma.metric.update({
        where: {name: 'email-send'},
        data: {value: Number(this.subscribeCount.get())}
      })
      prisma.metric.update({
        where: {name: 'email-send-error'},
        data: {value: Number(this.subscribeCount.get())}
      })
      prisma.metric.update({
        where: {name: 'exchange-gauge'},
        data: {value: Number(this.subscribeCount.get())}
      })
    }, 10000)
  }

  getMetrics() {
    return prometheus.register.metrics();
  }

  saveMetrics(name: string, value?: number) {
    switch(name){
      case 'subscibe':
        this.subscribeCount.inc();
        break;
      case 'unsubscibe':
        this.unsubscribeCount.inc();
        break;
      case 'email-send':
        this.sendCount.inc();
        break;
      case 'email-send-error':
        this.sendErrorCount.inc();
        break;
      case 'exchange-gauge':
        this.exchangeRate.set(value);
        break;
      default:
        console.log('invalid name')
    }
  }
}
