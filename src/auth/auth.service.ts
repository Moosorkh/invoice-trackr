import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../invoices/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    try {
      // Look up the user in the database
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      // Handle incorrect email or password
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user.id, email: user.email };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      // Catch any unexpected errors
      throw new UnauthorizedException(
        'Login failed, please check your credentials and try again.',
      );
    }
  }

  async login(data: LoginDto) {
    const validatedUser = await this.validateUser(data);
    return { message: 'Login successful', ...validatedUser };
  }
}