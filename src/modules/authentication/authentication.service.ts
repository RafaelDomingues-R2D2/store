import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

export interface userPayload {
  sub: string;
  userName: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    const authenticUser = await bcrypt.compare(password, user!.password);

    if (!authenticUser) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const payload: userPayload = {
      sub: user.id,
      userName: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
