import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service.js';
import { authJwtGuard } from '../auth/jwt-auth.guard.js';
import { CLINICregisterDTO, loginDTO, OWNERregisterDTO } from '../auth/regester.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register/clinic')
  regsiterClinic(@Body() dto: CLINICregisterDTO) {
    return this.AuthService.regsiterClinic(dto);
  }

  @Post('login')
  loginfn(@Body() dto: loginDTO) {
    return this.AuthService.loginfn(dto);
  }

  @Post('register/owner')
  ownerResgter(@Body() dto:OWNERregisterDTO){
    return this.AuthService.ownerResgter(dto)
  }
  
}
