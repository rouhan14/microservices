import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { OrderCreatedEvent } from "./order-created.event.js";

@Injectable()
export class PaymentsService implements OnModuleInit {
    
    constructor(@Inject('KAFKA_CLIENT') private readonly kafka: ClientKafka) {}


    async onModuleInit() {
        await this.kafka.connect()
    }

    processPayment(order: OrderCreatedEvent) {
        this.kafka.emit('payment.completed', {
            key: order.id,
            value: {
                orderID: order.id,
                amount: order.amount,
                paidAt: new Date().toISOString(),
            }
        })
    }
}