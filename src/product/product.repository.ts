import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private products: any[] = [];

  async create(product) {
    this.products.push(product);

    return product;
  }

  async findAll() {
    return this.products;
  }

  private async findById(id: string) {
    const productExists = this.products.find((product) => product.id === id);

    if (!productExists) {
      throw new Error('Product not exists');
    }

    return productExists;
  }

  async update(id: string, newData) {
    const productExists = await this.findById(id);

    Object.entries(newData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      productExists[key] = value;
    });

    return productExists;
  }

  async delete(id: string) {
    const productExists = await this.findById(id);

    this.products = this.products.filter(
      (product) => product.id !== productExists.id,
    );

    return productExists;
  }
}
