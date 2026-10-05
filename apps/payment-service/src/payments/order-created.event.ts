export interface OrderCreatedEvent {
    id: string;
    userId: string;
    item: string;
    amount: number;
    status: string;
}