import { Body, Controller, Delete, Get, Logger, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import type { PaymentCompletedEvent } from './payment-completed.event.js';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {

    private readonly logger = new Logger(OrdersController.name)

    @EventPattern<string>('payment.completed')
    handlePaymentCompleted(@Payload() payment: PaymentCompletedEvent) {
        const order = this.ordersService.markAsPaid(payment.orderId);
        this.logger.log(`order ${order.id} marked as paid`)
    }

    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Post()
    create(@Body() body: CreateOrderDto) {
        return this.ordersService.create(body.userId, body.item, body.amount);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(id);
    }
}
