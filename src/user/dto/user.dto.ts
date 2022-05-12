import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

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

export class SignupDto extends PartialType(SigninDto) {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(30)
    readonly email: string;
}

export class UpdateDto extends PartialType(SignupDto){}