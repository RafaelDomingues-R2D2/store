import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { EmailIsUniqueValidator } from './validation/email-is-unique.validator';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, EmailIsUniqueValidator],
})
export class UserModule {}
