export type OrderStatus = 'pending' | 'paid' | 'failed';

export interface Order {
    id: string;
    userId: string;
    item: string;
    amount: number;
    status: OrderStatus;
}