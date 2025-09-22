import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCharacteristicsDTO } from './productCharacteristicsDTO';
import { Type } from 'class-transformer';
import { ProductImagesDTO } from './productImages.dto';

export class CreateProductDTO {
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsPositive()
  value: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ValidateNested()
  @IsArray()
  @Type(() => ProductCharacteristicsDTO)
  @ArrayMinSize(3)
  characteristics: ProductCharacteristicsDTO[];

  @ValidateNested()
  @IsArray()
  @Type(() => ProductImagesDTO)
  @ArrayMinSize(1)
  images: ProductImagesDTO[];

  @IsNotEmpty()
  category: string;
}
