import { CreateProductDTO } from './createProduct.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductDto extends PartialType(CreateProductDTO) {}
