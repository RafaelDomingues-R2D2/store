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
import { ProductService } from './product.service';
import { randomUUID } from 'crypto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    return this.productService.create(productData);
  }

  @Get()
  async findAllProducts() {
    return this.productService.findAll();
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() newData: UpdateProductDto,
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
