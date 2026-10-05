export interface PaymentCompletedEvent {
    orderId: string;
    amount: number;
    paidAt: string;
}