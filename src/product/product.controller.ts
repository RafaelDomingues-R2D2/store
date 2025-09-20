import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() productData) {
    return this.productRepository.create(productData);
  }

  @Get()
  async findAllProducts() {
    return this.productRepository.findAll();
  }
}
