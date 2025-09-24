import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    return this.productService.create(productData);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAllProducts() {
    console.log('fitching product');

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
