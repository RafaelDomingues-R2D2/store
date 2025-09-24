import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDTO } from './createOrder.dto';

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
