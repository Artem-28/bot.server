import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { TypeOrmModule } from '@nestjs/typeorm';

// Configuration
import configuration from './config/configuration';
import typeorm from './config/typeorm';
// Providers
import { AllExceptionFilter } from './base/filters/all-exception.filter';
import { ResponseInterceptor } from './base/interceptors/response.interceptor';
// Modules
import { ConfirmationCodeModule } from './confirmation-code/confirmation-code.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, typeorm],
      isGlobal: true, // Включение\отключение глобальной обрасти для конфига .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    ConfirmationCodeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
