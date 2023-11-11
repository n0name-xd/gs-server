import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/loginDto';
import { RegistrationDto } from './dto/registrationDto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {
    console.log('loginDto', loginDto);
  }

  async registration(registrationDto: RegistrationDto) {
    console.log('registrationDto', registrationDto);
  }
}
