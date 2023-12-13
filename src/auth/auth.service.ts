import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/loginDto';
import { RegistrationDto } from './dto/registrationDto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { Token } from './models/token.model';
import { ClientUserDto } from './dto/clientUserDto';

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

      const userDto = new ClientUserDto(user);
      const tokens = this.generateToken({ ...userDto });

      await this.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      };
    } catch (error) {
      throw error;
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

  async saveToken(userId: number, refreshToken: string) {
    console.log('userId', userId);

    const tokenData = await this.tokenModel.findOne({
      where: { userId: userId },
    });
    console.log('tokenData', tokenData);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }

    const token = await this.tokenModel.create({
      userId: userId,
      refreshToken,
    });

    return token;
  }

  async checkTokens() {
    const tokens = await this.tokenModel.findAll();
    return tokens;
  }
}
