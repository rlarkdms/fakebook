import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export class ApiResponse {
    @IsNotEmpty()
    @IsNumber()
    statusCode: number = HttpStatus.OK;

    @IsNotEmpty()
    @IsString()
    message = 'Success';

    // ? Default { "statusCode": 200, "message": "Success" }
    constructor(init?: Partial<ApiResponse>) {
        Object.assign(this, init);
    }
}
