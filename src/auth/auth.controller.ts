import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { LoginDto } from './dto/loginDto';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registrationDto';
import { PrevAuthGuard } from './guards/prev-auth.guard';
// import { Response } from 'express';

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
    @Body() registrationDto: RegistrationDto,
    // @Res({ passthrough: true }) response: Response,
  ) {
    try {
      // console.log(1);
      const user = await this.authServices.registration(registrationDto);
      // console.log('user', user);
      return user;
    } catch (err) {
      throw err;
    }

    // response.cookie('refreshToken', user.refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60_000,
    //   httpOnly: true,
    //   // secure: false,  // if I use httpS
    // });
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
