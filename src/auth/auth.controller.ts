import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/loginDto';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registrationDto';
import { PrevAuthGuard } from './guards/prev-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @UseGuards(PrevAuthGuard)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authServices.login(loginDto);
  }

  @UseGuards(PrevAuthGuard)
  @Post('registration')
  registration(@Body() registrationDto: RegistrationDto) {
    return this.authServices.registration(registrationDto);
  }
}
