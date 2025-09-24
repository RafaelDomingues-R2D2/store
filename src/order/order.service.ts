import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllOrdersDTO } from './dto/findAllOrder.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDTO } from './dto/createOrder.dto';
import { UpdateOrderDTO } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const productIds = data.orderItems.map((orderItem) => orderItem.productId);

    const relatedProducts = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const newOrderItems = data.orderItems.map((orderItem) => {
      const product = relatedProducts.find(
        (product) => product.id === orderItem.productId,
      );

      return {
        productId: orderItem.productId,
        quantity: orderItem.quantity,
        sellValue: Number(product?.value),
      };
    });

    const totalValue = newOrderItems.reduce((total, item) => {
      return total + Number(item.sellValue) * item.quantity;
    }, 0);

    newOrderItems.forEach(
      async (item) =>
        await this.prisma.product.update({
          where: { id: item.productId },
          data: {
            availableQuantity: {
              decrement: item.quantity,
            },
          },
        }),
    );

    const product = await this.prisma.order.create({
      data: {
        userId: data.userId,
        totalValue,
      },
    });

    newOrderItems.map((item) =>
      this.prisma.orderItems.create({
        data: {
          orderId: product.id,
          productId: item.productId,
          quantity: item.quantity,
          sellValue: item.sellValue,
        },
      }),
    );
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

  async update(id: string, newData: UpdateOrderDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: newData.userId },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const orderExists = await this.prisma.order.findUnique({
      where: { id: id },
    });

    if (!orderExists) {
      throw new NotFoundException('Order not found');
    }

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
