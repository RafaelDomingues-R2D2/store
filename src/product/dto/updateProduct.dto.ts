import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCharacteristicsDTO } from './productCharacteristicsDTO';
import { Type } from 'class-transformer';
import { ProductImagesDTO } from './productImages.dto';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsPositive()
  value: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  availableQuantity: number;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => ProductCharacteristicsDTO)
  @ArrayMinSize(3)
  characteristics: ProductCharacteristicsDTO[];

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => ProductImagesDTO)
  @ArrayMinSize(1)
  images: ProductImagesDTO[];

  @IsOptional()
  @IsNotEmpty()
  category: string;
}
