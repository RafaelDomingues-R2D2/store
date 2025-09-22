import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ProductEntity } from './product.entity';
import { findAllProductDTO } from './dto/findAllUser.dto';
import { v4 as uuid } from 'uuid';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.id = uuid();
    productEntity.userId = productData.userId;
    productEntity.name = productData.name;
    productEntity.value = productData.value;
    productEntity.quantity = productData.quantity;
    productEntity.description = productData.description;
    // productEntity.characteristics = productData.characteristics;
    // productEntity.images = productData.images;
    productEntity.category = productData.category;

    this.productRepository.create(productEntity);

    return {
      product: new findAllProductDTO(
        productEntity.id,
        productEntity.userId,
        productEntity.name,
        productEntity.value,
        productEntity.quantity,
        productEntity.description,
        // productEntity.characteristics,
        // productEntity.images,
        productEntity.category,
      ),
    };
  }

  @Get()
  async findAllProducts() {
    return this.productRepository.findAll();
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() newData: CreateProductDTO,
  ) {
    const updatedProduct = await this.productRepository.update(id, newData);

    return {
      product: updatedProduct,
    };
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.productRepository.delete(id);

    return {
      product: deletedProduct,
    };
  }
}
