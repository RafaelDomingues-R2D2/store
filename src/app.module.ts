import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './modules/order/order.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './resources/filters/global-exception-filter';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

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
  ],
  providers: [{ provide: APP_FILTER, useClass: GlobalExceptionFilter }],
})
export class AppModule {}
