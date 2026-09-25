import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order-service',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'order-service-consumer',
          }
        }
      }
    ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
