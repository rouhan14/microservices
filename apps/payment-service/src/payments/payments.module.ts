import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentsService } from './payments.service.js';

@Module({
  controllers: [PaymentsController],
  imports : [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payment-service',
            brokers: ['localhost:9092']
          },
          producerOnlyMode: true
        }
      }
    ])
  ],
  providers: [PaymentsService]
})
export class PaymentsModule {}
