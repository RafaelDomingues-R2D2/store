import { IsNotEmpty } from 'class-validator';

export class ProductCharacteristicsDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
