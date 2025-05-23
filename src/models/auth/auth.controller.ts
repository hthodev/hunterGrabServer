import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  HttpException,
  HttpCode,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { responseEndpoint } from 'src/responses/endpoint';
import { IResponseGoogle } from './auth.interface';
import { comparePassword, signToken } from 'src/shares/ultis';
import { GoogleAuthService } from './google-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Post('google/login')
  @HttpCode(200)
  async googleAuthLogin(@Body() body: any) {
    try {
      const credential = body.credential;
      const payload = await this.googleAuthService.verifyToken(credential);
      if (!payload) throw new UnauthorizedException('Invalid token');

      const user = await this.authService.verifyGoogle(
        payload as IResponseGoogle,
      );
      return responseEndpoint({ data: signToken(user) })
    } catch (error) {
      console.log(error.status, error.message);
      
      if (error.status === 500 || !error.status) {
        throw new HttpException('Something error from server', 500)
      }
      throw error
    }
  }

  @Post('login')
  @HttpCode(200)
  async loginNormal(@Body() body) {
    const user = await this.authService.loginNormal(body)
    return responseEndpoint({ data: signToken(user) })
  }

  @Post('registry')
  @HttpCode(201)
  async registry(@Body() body) {
    await this.authService.registry(body)
    return responseEndpoint({ message: "OK" })
  }
}
