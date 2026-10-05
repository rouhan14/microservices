import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule, ObserveInstrument } from './app.module.js';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'order-service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'order-service'
      }
    }
  })

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3002);
}
await bootstrap();
