import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  // imports: [SequelizeModule.forFeature([Token])],
})
export class AuthModule {}
