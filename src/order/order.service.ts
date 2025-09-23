import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { FindAllOrdersDTO } from './dto/findAllOrder.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    return await this.prisma.order.create({ data: data });
  }

  async findAll() {
    const orderSaved = await this.prisma.order.findMany();

    const orderList = orderSaved.map(
      (order) =>
        new FindAllOrdersDTO(
          order.id,
          order.userId,
          order.totalValue,
          order.status,
        ),
    );

    return orderList;
  }

  async update(id: string, newData: UpdateOrderDto) {
    return await this.prisma.order.update({
      where: {
        id: id,
      },
      data: newData,
    });
  }

  async delete(id: string) {
    return await this.prisma.order.delete({
      where: {
        id: id,
      },
    });
  }
}
