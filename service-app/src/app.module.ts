import { Module } from '@nestjs/common';
import { RateModule } from './rate/rate.module';
import { EmailsModule } from './emails/emails.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [RateModule, EmailsModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), MailerModule, MetricsModule],
  providers: [MailerService]
})
export class AppModule {}
