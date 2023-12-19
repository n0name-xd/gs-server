import { Body, Controller, Post, UseGuards, Get, Res } from '@nestjs/common';
import { LoginDto } from './dto/loginDto';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registrationDto';
import { PrevAuthGuard } from './guards/prev-auth.guard';
import { Response } from 'express';

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
  async registration(
    @Body() body: RegistrationDto,
    @Res({ passthrough: true })
    res: Response,
  ) {
    try {
      const { userName, password, email, clientSecret } = body;

      const user = await this.authServices.registration({
        userName,
        password,
        email,
        clientSecret,
      });

      res.cookie('refreshToken', user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60_000,
        httpOnly: true,
      });

      return {
        user: user.user,
      };
    } catch (err) {
      throw err;
    }
  }

  @Post('logout')
  logout() {}

  @Get('activate')
  activateLink() {}

  @Get('refresh')
  refresh() {}

  @Get('checkToken')
  checkToken() {
    return this.authServices.checkTokens();
  }
}
