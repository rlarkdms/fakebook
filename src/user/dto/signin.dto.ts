import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SigninDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    readonly id: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    readonly password: string;
}