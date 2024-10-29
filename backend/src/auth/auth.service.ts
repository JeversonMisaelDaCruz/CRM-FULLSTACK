import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../users/repositories/user.repository';
import { jwtConstants } from './jwtConstants';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly PrismaService: PrismaService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais Inválidas!');
    }

    const payload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
    });

    await this.prisma.token.create({
      data: {
        access_token: accessToken,
        user_id: user.id,
      },
    });

    return {
      access_token: accessToken,
    };
  }

  async getProfile(id: string) {
    return await this.prisma.user.findFirst({
      where: { id: id },
      select: {
        name: true,
        email: true,
        identifier: true,
      },
    });
  }

  async logout(userId: string) {
    await this.prisma.token.updateMany({
      where: {
        user_id: userId,
        is_revoked: false,
      },
      data: {
        is_revoked: true,
      },
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    console.log('User found:', user);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      console.log('Is password matching?', isPasswordMatching);
      if (isPasswordMatching) {
        return user;
      }
    }
    return null;
  }
}
