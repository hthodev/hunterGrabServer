// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth.service';
import { AuthController } from './auth.controller';
import authConfig from 'configs/auth.config';
import { UserModule } from '../users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.schema';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, GoogleAuthService],
  controllers: [AuthController],
  exports: [AuthService, GoogleAuthService],
})
export class AuthModule {}
