import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import type { OrderCreatedEvent } from './order-created.event.js';
import { PaymentsService } from './payments.service.js';

@Controller()
export class PaymentsController {

    private readonly logger = new Logger(PaymentsController.name)

    constructor(private readonly paymentsService: PaymentsService) {}

    @EventPattern<string>('order.created')
    handleOrderCreated(@Payload() order: OrderCreatedEvent, @Ctx() context: KafkaContext) {
        const message = context.getMessage();


        this.logger.log(
            `order.created received | key=${message.key} partition=${context.getPartition()} offset=${message.offset}`
        );
        this.logger.log(order)
        this.paymentsService.processPayment(order);
    }
}
