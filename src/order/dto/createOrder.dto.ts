import { OrderStatus } from '@prisma/client';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsPositive()
  totalValue: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
