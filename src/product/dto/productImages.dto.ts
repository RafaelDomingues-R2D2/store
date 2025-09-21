import { IsNotEmpty } from 'class-validator';

export class ProductImagesDTO {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  description: string;
}
