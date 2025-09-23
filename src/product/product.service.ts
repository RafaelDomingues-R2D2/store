import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { FindAllProductsDTO } from './dto/findAllProducts.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDTO) {
    await this.prisma.product.create({
      data: {
        userId: data.userId,
        name: data.name,
        value: data.value,
        availableQuantity: data.availableQuantity,
        description: data.description,
        category: data.category,
        Characteristics: { create: data.characteristics },
        Images: { create: data.images },
      },
    });
  }

  async findAll() {
    const productsSaved = await this.prisma.product.findMany();
    const products = productsSaved.map(
      (product) => new FindAllProductsDTO(product.id, product.name),
    );

    return products;
  }

  async update(id: string, newData: UpdateProductDto) {
    await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        user: {
          connect: { id: newData.userId },
        },
        name: newData.name,
        value: newData.value,
        availableQuantity: newData.availableQuantity,
        description: newData.description,
        category: newData.category,
        Characteristics: { create: newData.characteristics },
        Images: { create: newData.images },
      },
    });
  }

  async delete(id: string) {
    await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
