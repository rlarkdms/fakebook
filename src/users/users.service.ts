import { Injectable } from '@nestjs/common';
import { getManager, getRepository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService{
    // return user's information if id is matched. if not, return null
    public async findUser(userId: SignInUserDto["id"]): Promise <SignInUserDto[]|null> {
        const userInfo = await getRepository(UserEntity).find({where: {id: userId}});
        if (userInfo.length > 0) return userInfo
        else return null
    }
    public async signup(signUpUserDto: SignUpUserDto): Promise<{status: number, message: string}>{
        const userRepository = getRepository(UserEntity);
        if (await this.findUser(signUpUserDto.id)) {
            return {status: HttpStatus.CONFLICT, message: "Duplicate user id"};
        } else {
            const userAdd = userRepository.create(signUpUserDto);
            await userRepository.save(userAdd);
            return {status: HttpStatus.OK, message: "Success"};
        }
    }
    public async signin(signInUserDto: SignInUserDto): Promise<{status: number, message: string}>{
        const userRepository = getRepository(UserEntity);
        if (await this.findUser(signInUserDto.id)){
        } else {
            return {status: HttpStatus.NOT_FOUND, message: "Cannot found user"}
        }
    }
}