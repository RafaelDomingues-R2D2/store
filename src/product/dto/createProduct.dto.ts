import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductCharacteristicDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class ProductImageDTO {
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateProductDTO {
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
  @Type(() => ProductCharacteristicDTO)
  @ArrayMinSize(3)
  characteristics: ProductCharacteristicDTO[];

  @ValidateNested()
  @IsArray()
  @Type(() => ProductImageDTO)
  @ArrayMinSize(1)
  images: ProductImageDTO[];

  @IsNotEmpty()
  category: string;
}
