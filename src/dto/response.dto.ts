import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export class ApiResponse {
    @IsNotEmpty()
    @IsNumber()
    statusCode: number;

    @IsNotEmpty()
    @IsString()
    message: string;

    // ? Default { "statusCode": 200, "message": "Success" }
    constructor(params: { statusCode?: number; message?: string }) {
        this.statusCode = params.statusCode ?? HttpStatus.OK;
        this.message = params.message ?? 'Success';
    }
}
