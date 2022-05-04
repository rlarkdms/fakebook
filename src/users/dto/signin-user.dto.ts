import { IsString, IsNotEmpty } from 'class-validator';
export class SigninUserDto {
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}