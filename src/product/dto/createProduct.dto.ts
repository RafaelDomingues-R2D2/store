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
import { ProductEntity } from '../product.entity';

export class ProductCharacteristicDTO {
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  product: ProductEntity;
}

export class ProductImageDTO {
  @IsOptional()
  id: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  product: ProductEntity;
}

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
