
import { Module } from "@nestjs/common";
import { AuthService } from './auth.service.js';
import {JwtModule} from '@nestjs/jwt'
import { AuthController } from './auth.controller.js';

@Module({
  imports: [JwtModule.register({secret: process.env.JWT_SECRET!,signOptions:{expiresIn:'30days'}})],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})

export class AuthModule{};