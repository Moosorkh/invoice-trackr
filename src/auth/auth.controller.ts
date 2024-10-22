import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginSchema, LoginDto } from '..//invoices/dto/login.dto'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    // Validate the login data using Zod
    const result = LoginSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }

    // Call AuthService for login after successful validation
    try {
      return this.authService.login(result.data);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new BadRequestException('Something went wrong during login.');
    }
  }
}