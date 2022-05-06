import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';

import { SignUpUserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
    async signup(signUpUserDto: SignUpUserDto) {
        const userRepository = getManager().getRepository(SignUpUserEntity);
        const userInfo = await userRepository.find({where:{id: signUpUserDto.id}});
        if (userInfo.length) {
            return {status: HttpStatus.CONFLICT, message: "Duplicate user id"};
        } else {
            const userAdd = userRepository.create(signUpUserDto);
            await userRepository.save(userAdd);
            return {status: HttpStatus.OK, message: "Success"};
        }
  }
  async signin(signInUserDto: SignInUserDto){

  }
}
