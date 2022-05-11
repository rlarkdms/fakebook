import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus } from '@nestjs/common';

import { SignupDto } from 'src/user/dto/signup.dto';
import { SigninDto } from 'src/user/dto/signin.dto';

import { UserEntity } from 'src/user/entities/user.entity';

import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: any,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) {
        this.userRepository = getRepository(UserEntity);
    }

    // return user's information if id is matched. if not, return null
    public async findUser(userId: SigninDto["id"]): Promise<SignupDto | null> {
        const userInfo = await this.userRepository.find({ where: { id: userId } });
        if ( userInfo.length > 0 ) return userInfo;
        else return null;
    }

    public async signup(signupDto: SignupDto): Promise<{ status: number, message: string }> {
        const { id, password } = signupDto;
        if ( await this.findUser(id) ) {
            return { status: HttpStatus.CONFLICT, message: "Duplicate user id" };
        } else {
            const userAdd = this.userRepository.create(signupDto);
            userAdd.password = await this.authService.hashPassword(password);
            await this.userRepository.save(userAdd);
            return { status: HttpStatus.OK, message: "Success" };
        }
    }

    public async signin(signinDto: SigninDto): Promise<{ status: number, message: string }> {
        if ( await this.findUser(signinDto.id) ) {
            const accessToken: string = await this.authService.signin(signinDto);
            return { status: HttpStatus.OK, message: accessToken }
        } else {
            return { status: HttpStatus.NOT_FOUND, message: "Cannot found user" };
        }
    }

    public test(): string {
        return "shit"
    }
}
