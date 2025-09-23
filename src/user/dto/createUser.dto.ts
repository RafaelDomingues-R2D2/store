import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validation/email-is-unique.validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @EmailIsUnique({ message: 'Email must be unique' })
  email: string;

  @MinLength(6)
  password: string;
}
