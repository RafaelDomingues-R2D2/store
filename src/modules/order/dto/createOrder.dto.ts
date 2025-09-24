import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class OrderItemDTO {
  @IsNumber()
  quantity: number;

  @IsString()
  productId: string;
}

export class CreateOrderDTO {
  @IsString()
  userId: string;

  @ValidateNested()
  @IsArray()
  @Type(() => OrderItemDTO)
  orderItems: OrderItemDTO[];
}
