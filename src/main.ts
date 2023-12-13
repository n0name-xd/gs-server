import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 7001;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();

  await app.listen(PORT, () => console.log(`Server working on port: ${PORT}`));
}
bootstrap();
