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
import { MailerModule } from '@nestjs-modules/mailer';
import { TopBanner } from './topbaner/models/top-banner.model';
import { FileModule } from './file/file.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: +process.env.MAIL_PORT,
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
        defaults: {
          from: process.env.MAIL_SENDER,
        },
      }),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [User, Token, TopBanner],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TopbanerModule,
    FileModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
