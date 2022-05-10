import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus } from '@nestjs/common';

import { SignUpUserDto } from 'src/users/dto/signup-user.dto';
import { SignInUserDto } from 'src/users/dto/signin-user.dto';

import { UserEntity } from 'src/users/entities/user.entity';

import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: any,
        @Inject(forwardRef(()=>AuthService))
        private readonly authService: AuthService
    ) {
        this.userRepository = getRepository(UserEntity);
    }
    // return user's information if id is matched. if not, return null
    public async findUser(userId: SignInUserDto["id"]): Promise <SignUpUserDto|null> {
        const userInfo = await this.userRepository.find({where: {id: userId}});
        if (userInfo.length > 0) return userInfo;
        else return null;
    }
    public async signup(signUpUserDto: SignUpUserDto): Promise<{status: number, message: string}>{
        const { id, password } = signUpUserDto;
        if (await this.findUser(id)) {
            return {status: HttpStatus.CONFLICT, message: "Duplicate user id"};
        } else {
            const userAdd = this.userRepository.create(signUpUserDto);
            userAdd.password = await this.authService.hashPassword(password);
            await this.userRepository.save(userAdd);
            return {status: HttpStatus.OK, message: "Success"};
        }
    }
    public async signin(signInUserDto: SignInUserDto): Promise<{status: number, message: string}>{
        if (await this.findUser(signInUserDto.id)){
            const accessToken: string = await this.authService.signin(signInUserDto);
            return {status: HttpStatus.OK, message: accessToken }
        } else {
            return {status: HttpStatus.NOT_FOUND, message: "Cannot found user"};
        }
    }
    public test(): string{
        return "shit"
    }
}
