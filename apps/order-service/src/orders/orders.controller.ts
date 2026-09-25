import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Controller('orders')
export class OrdersController {

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
