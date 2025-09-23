import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [PrismaModule, UserModule, ProductModule, OrderModule],
})
export class AppModule {}
