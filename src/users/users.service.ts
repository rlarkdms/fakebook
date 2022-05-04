import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';

import { SignUpUserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
    async signup(signUpUserDto: SignUpUserDto){
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
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
      return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
s
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
