import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

class Password{
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(30)
    password: string;
}

export class SigninDto extends PartialType(Password) {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(15)
    id: string;
}

export class SignupDto extends PartialType(SigninDto) {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(30)
    email: string;
}

export class UpdateDto extends PartialType(Password){
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    name: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(30)
    email: string;
}