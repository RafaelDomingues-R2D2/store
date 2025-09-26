import { ConsoleLogger, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './modules/order/order.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './resources/filters/global-exception-filter';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { LoggerGlobalInterceptor } from './resources/intercptores/logger-global/logger-global.interceptor';

@Module({
  imports: [
    PrismaModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          url: 'redis://127.0.0.1:6379',
          ttl: 10 * 1000,
        }),
      }),
      isGlobal: true,
    }),
    UserModule,
    ProductModule,
    OrderModule,
    AuthenticationModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerGlobalInterceptor,
    },
    ConsoleLogger,
  ],
})
export class AppModule {}
