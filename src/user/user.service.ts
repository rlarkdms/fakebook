import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SigninDto, SignupDto, UpdateDto } from 'src/user/dto/user.dto';
import { SuccessDto } from 'src/user/dto/response.success.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';

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
    // return user's information if id is matched. if not, return null
    // This method used on auth too. that is why this is public method
    async findUser(userId: SigninDto['id']): Promise<UserEntity | null> {
        return await this.userRepository.findOne({ id: userId }) ?? null;
    }

    async signup(signupDto: SignupDto): Promise<SuccessDto> {
        if ( await this.findUser(signupDto.id) )
            throw new HttpException("User ID is already exist", HttpStatus.CONFLICT);
        try {
            let { id, password, name, email } = await this.userRepository.create(signupDto)
            password = await this.authService.hashPassword(password);
            await this.userRepository.save({ id, password, name, email });
            return UserService.successResponse()
        } catch (e) {
            throw new HttpException("Signup failed", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async signin(signinDto: SigninDto): Promise<SuccessDto> {
        const { id } = signinDto;
        if ( !await this.findUser(id) )
            throw new HttpException("Cannot found user", HttpStatus.NOT_FOUND);
        const token = await this.authService.generateToken(signinDto)
        if ( !token )
            throw new HttpException("Password not match", HttpStatus.NOT_ACCEPTABLE);
        return { statusCode: HttpStatus.OK, message: token }
    }

    async update(targetId: SigninDto['id'], updateDto: UpdateDto): Promise<SuccessDto> {
        // You can update only 3 field
        try {
            let {id, password, name, email} = await this.findUser(targetId);
            updateDto.password = await this.authService.hashPassword(updateDto.password);
            this.userRepository.save(Object.assign({id, password, name, email}, updateDto));
            return UserService.successResponse()
        } catch (e) {
            throw new HttpException("User information update failed", HttpStatus.NOT_MODIFIED)
        }
    }

    async delete(targetId): Promise<SuccessDto>{
        return UserService.successResponse()
    }
}