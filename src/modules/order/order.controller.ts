import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDTO } from './dto/updateOrder.dto';
import { CreateOrderDTO } from './dto/createOrder.dto';
import { AuthenticationGuard } from '../authentication/authentication/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDTO) {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDTO,
  ) {
    const order = await this.orderService.update(id, updateOrderDto);

    return {
      order: order,
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.orderService.delete(id);
  }
}
