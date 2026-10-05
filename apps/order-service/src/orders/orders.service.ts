import { Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Order } from './order.interface.js';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrdersService implements OnModuleInit {

    private readonly orders: Order[] = [];

    constructor(@Inject('KAFKA_CLIENT') private readonly kafka: ClientKafka) {}

    async onModuleInit() {
        await this.kafka.connect();
    }

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

        this.kafka.emit('order.created', {
            key: order.id,
            value: order,
        });

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
