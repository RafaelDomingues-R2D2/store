import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { randomUUID } from 'crypto';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.id = randomUUID();
    productEntity.userId = productData.userId;
    productEntity.name = productData.name;
    productEntity.value = productData.value;
    productEntity.quantity = productData.quantity;
    productEntity.description = productData.description;
    productEntity.characteristics = productData.characteristics;
    productEntity.images = productData.images;
    productEntity.category = productData.category;

    return this.productService.create(productEntity);
  }

  @Get()
  async findAllProducts() {
    return this.productService.findAll();
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() newData: CreateProductDTO,
  ) {
    const updatedProduct = await this.productService.update(id, newData);

    return {
      product: updatedProduct,
    };
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.productService.delete(id);

    return {
      product: deletedProduct,
    };
  }
}
