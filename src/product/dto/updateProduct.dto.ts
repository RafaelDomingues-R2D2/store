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
import { Type } from 'class-transformer';
import { ProductCharacteristicDTO, ProductImageDTO } from './createProduct.dto';

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
  @Type(() => ProductCharacteristicDTO)
  @ArrayMinSize(3)
  characteristics: ProductCharacteristicDTO[];

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => ProductImageDTO)
  @ArrayMinSize(1)
  images: ProductImageDTO[];

  @IsOptional()
  @IsNotEmpty()
  category: string;
}
