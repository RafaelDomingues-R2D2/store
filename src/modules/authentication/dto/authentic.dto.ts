import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
