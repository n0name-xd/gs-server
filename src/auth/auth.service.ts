import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginDto } from './dto/loginDto';
import { RegistrationDto } from './dto/registrationDto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { Token } from './models/token.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Token)
    private tokenModel: typeof Token,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      console.log('loginDto', loginDto);
    } catch (error) {
      console.log(error);
    }
  }

  async registration(registrationDto: RegistrationDto) {
    try {
      const email = registrationDto.email;

      const candidate = await this.userModel.findOne({
        where: { email },
      });

      if (candidate) {
        throw new HttpException(
          `The user with email: ${email} is already exists`,
          HttpStatus.FORBIDDEN,
        );
      }

      const hashPassword = await bcrypt.hash(registrationDto.password, 3);

      const activationLink = `${new Date()}${Math.random()}`;

      const user = await this.userModel.create({
        ...registrationDto,
        password: hashPassword,
        activationLink,
      });

      await this.sendActivationMail(email, activationLink);

      return user;
    } catch (error) {
      console.log('error', error);
    }
  }

  private async sendActivationMail(to: string, link: string) {
    console.log(to, link);
  }

  private generateToken(payload: string | object | Buffer) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    console.log(userId, refreshToken);
    // const tokenData = await
  }
}
