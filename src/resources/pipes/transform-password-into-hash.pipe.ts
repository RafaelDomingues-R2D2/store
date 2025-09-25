import { Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TransformPasswordIntoHash implements PipeTransform {
  async transform(password: string) {
    const salt = process.env.SALT;

    const passwordHash = await bcrypt.hash(password, salt!);

    return passwordHash;
  }
}
