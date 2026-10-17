import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [PrismaModule,AuthModule,
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'heliovet-2.0',
    }),
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
