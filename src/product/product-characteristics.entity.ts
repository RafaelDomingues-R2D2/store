import { Column, Entity } from 'typeorm';

@Entity('product_characteristics')
export class ProductCharacteristicsEntity {
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;
}
