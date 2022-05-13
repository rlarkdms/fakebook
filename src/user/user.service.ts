import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteDto, SigninDto, SignupDto, UpdateDto } from 'src/user/dto/user.dto';
import { SuccessDto } from 'src/user/dto/response.success.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';
import * as Http from "http";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {
        this.userRepository = getRepository(UserEntity);
    }

    private static successResponse(): SuccessDto {
        return { statusCode: HttpStatus.OK, message: "Success" }
    }

    private static checkRequestUserId(previous, current): void {
        if ( previous !== current )
            throw new HttpException("You can only access your own account", HttpStatus.UNAUTHORIZED);
    }

    // return user's information if id is matched. if not, return null
    // This method used on auth too. that is why this is public method
    async findUser(userId: SigninDto["id"]): Promise<UserEntity | null> {
        return await this.userRepository.findOne({ id: userId }) ?? null;
    }

    async signup(signupDto: SignupDto): Promise<SuccessDto> {
        if ( await this.findUser(signupDto.id) )
            throw new HttpException("User ID is already exist", HttpStatus.CONFLICT);
        try {
            let { id, password, name, email } = await this.userRepository.create(signupDto);
            password = await AuthService.hashPassword(password);
            await this.userRepository.save({ id, password, name, email });
            return UserService.successResponse();
        } catch (e) {
            throw new HttpException("Signup failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async signin(signinDto: SigninDto): Promise<SuccessDto> {
        const { id } = signinDto;
        if ( !await this.findUser(id) )
            throw new HttpException("Cannot found user", HttpStatus.NOT_FOUND);
        const token = await this.authService.generateToken(signinDto)
        if ( !token )
            throw new HttpException("Password not match", HttpStatus.NOT_ACCEPTABLE);
        return { statusCode: HttpStatus.OK, message: token };
    }

    //targetId === JWT.id
    async update(targetId: SigninDto["id"], updateDto: UpdateDto): Promise<SuccessDto> {
        UserService.checkRequestUserId(targetId, updateDto.id);
        let { id, password, name, email } = await this.findUser(targetId);
        try {
            updateDto.password = await AuthService.hashPassword(updateDto.password);
            await this.userRepository.save(Object.assign({ id, password, name, email }, updateDto));
            return UserService.successResponse();
        } catch (e) {
            throw new HttpException("User information update failed", HttpStatus.NOT_MODIFIED);
        }
    }

    async delete(targetId: SigninDto["id"], deleteDto: DeleteDto): Promise<SuccessDto> {
        UserService.checkRequestUserId(targetId, deleteDto.id);
        if ( !await this.findUser(targetId) )
            throw new HttpException("Cannot found user", HttpStatus.NOT_FOUND);
        const { id, password } = await this.findUser(targetId);
        if ( !bcrypt.compareSync(deleteDto.password, password) )
            throw new HttpException("Incorrect password", HttpStatus.UNAUTHORIZED)
        try {
            await this.userRepository.delete({id: id});
            return UserService.successResponse();
        } catch (e) {
            throw new HttpException("Cannot delete user", HttpStatus.NOT_ACCEPTABLE);
        }
    }
}