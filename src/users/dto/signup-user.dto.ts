import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { SignInUserDto } from './signin-user.dto';

export class SignUpUserDto extends PartialType(SignInUserDto){
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}