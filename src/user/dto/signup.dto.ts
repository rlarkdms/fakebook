import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { SignInUserDto } from './signin-user.dto';

export class SignUpUserDto extends PartialType(SignInUserDto) {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(30)
    readonly email: string;
}