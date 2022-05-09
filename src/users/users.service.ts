import { Injectable } from '@nestjs/common';
import { getManager, getRepository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
    async findDuplicateUser(signInUserDto: SignInUserDto["id"]): Promise <true|false> {
        const userInfo = await getRepository(UserEntity).find({where: {id: signInUserDto}});
        return !!userInfo.length;
    }
    async signup(signUpUserDto: SignUpUserDto): Promise<{status: number, message: string}>{
        const userRepository = getRepository(UserEntity);
        if (await this.findDuplicateUser(signUpUserDto.id)) {
            return {status: HttpStatus.CONFLICT, message: "Duplicate user id"};
        } else {
            const userAdd = userRepository.create(signUpUserDto);
            await userRepository.save(userAdd);
            return {status: HttpStatus.OK, message: "Success"};
        }
    }
    async signin(signInUserDto: SignInUserDto): Promise<{status: number, message: string}>{
        const userRepository = getRepository(UserEntity);
        if (await this.findDuplicateUser(signInUserDto.id)){

        } else {
            return {status: HttpStatus.NOT_FOUND, message: "Cannot found user"}
        }
    }
}