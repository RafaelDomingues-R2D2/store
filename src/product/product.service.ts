import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { FindAllProductsDTO } from './dto/findAllProducts.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(productEntity: ProductEntity) {
    await this.productRepository.save(productEntity);
  }

  async findAll() {
    const productsSaved = await this.productRepository.find();
    const products = productsSaved.map(
      (product) =>
        new FindAllProductsDTO(
          product.id,
          product.userId,
          product.name,
          product.value,
          product.quantity,
          product.description,
          product.category,
        ),
    );

    return products;
  }

  async update(id: string, newData: UpdateProductDto) {
    const entityName = await this.productRepository.findOneBy({ id });
    Object.assign(entityName ?? '', newData);

    await this.productRepository.save(entityName ?? {});
  }

  async delete(id: string) {
    await this.productRepository.delete(id);
  }
}
