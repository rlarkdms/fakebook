import { IsString, IsNumber } from 'class-validator';
export class SigninUserDto {
    @IsString()
    readonly id: string;
    @IsString()
    readonly password: string;
}