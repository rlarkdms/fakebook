import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { SigninDto } from './signin.dto';

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