import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'payment-service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'payment-service'
      }
    }
  })

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3003);
}
await bootstrap();
