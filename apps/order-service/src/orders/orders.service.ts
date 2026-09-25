import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.interface.js';

@Injectable()
export class OrdersService {

    private readonly orders: Order[] = [];

    findAll(): Order[] {
        return this.orders;
    }

    create(userId: string, item: string, amount: number): Order {
        const order: Order = {
            id: crypto.randomUUID(),
            userId,
            item,
            amount,
            status: 'pending',
        };

        this.orders.push(order);

        return order;
    }

    findOne(id: string): Order {
        const order = this.orders.find((order) => order.id === id);

        if (!order) {
            throw new NotFoundException(`Order with id ${id} not found`);
        }

        return order;
    }

    remove(id: string): Order {
        const index = this.orders.findIndex((order) => order.id === id);

        if (index === -1) {
            throw new NotFoundException(`Order with id ${id} not found`);
        }

        const [deleted] = this.orders.splice(index, 1);

        return deleted;
    }
}
