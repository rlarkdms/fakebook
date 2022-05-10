import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SignInUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    readonly id: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    readonly password: string;
}