import { IsNotEmpty, IsNumber } from 'class-validator';

export class SuccessDto {
    @IsNotEmpty()
    @IsNumber()
    readonly statusCode: Number;
    readonly message: String;
}