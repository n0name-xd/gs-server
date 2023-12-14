import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { AuthModule } from './auth/auth.module';
import { Token } from './auth/models/token.model';
import { TopbanerModule } from './topbaner/topbaner.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [User, Token],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TopbanerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
