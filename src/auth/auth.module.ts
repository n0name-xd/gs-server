import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { Token } from './models/token.model';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [SequelizeModule.forFeature([User, Token])],
})
export class AuthModule {}
