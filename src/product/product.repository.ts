import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private products: any[] = [];

  create(product) {
    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products;
  }
}
