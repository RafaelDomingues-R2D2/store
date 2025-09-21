import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EmailIsUnique } from '../validation/email-is-unique.validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @EmailIsUnique({ message: 'Email must be unique' })
  @IsOptional()
  email?: string;

  @MinLength(6)
  @IsOptional()
  password?: string;
}
