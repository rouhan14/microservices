import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
    @IsUUID()
    userId: string;

    @IsString()
    @IsNotEmpty()
    item: string;

    @IsNumber()
    @IsPositive()
    amount: number;
}
