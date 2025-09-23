import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './createOrder.dto';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  userId: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsPositive()
  totalValue: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
