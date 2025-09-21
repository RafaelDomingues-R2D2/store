import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ProductCharacteristicsDTO } from './productCharacteristicsDTO';
import { Type } from 'class-transformer';
import { ProductImagesDTO } from './productImages.dto';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsPositive()
  value: number;

  @IsNumber()
  @Min(0)
  availableQuantity: number;

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
