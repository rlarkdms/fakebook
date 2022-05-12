import {
    ConflictException,
    forwardRef,
    HttpStatus,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/user/dto/signup.dto';
import { SigninDto } from 'src/user/dto/signin.dto';
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

    // return user's information if id is matched. if not, return null
    // This method used on auth too. that is why this is public method
    async findUser(userId: SigninDto["id"]): Promise<UserEntity | null> {
        return await this.userRepository.findOne({ id: userId }) ?? null;
    }

    async signup(signupDto: SignupDto): Promise<SuccessDto> {
        if ( await this.findUser(signupDto.id) )
            throw new ConflictException("User ID is already exist");
        try {
            let { id, password, name, email } = await this.userRepository.create(signupDto)
            password = await this.authService.hashPassword(password);
            await this.userRepository.save({ id, password, name, email });
            return { statusCode: HttpStatus.OK, message: "Success" };
        } catch (e) {
            throw new InternalServerErrorException("Signup failed")
        }
    }

    async signin(signinDto: SigninDto): Promise<SuccessDto> {
        const { id } = signinDto;
        if ( !await this.findUser(id) )
            throw new NotFoundException("Cannot found user");
        try {
            return { statusCode: HttpStatus.OK, message: await this.authService.signin(signinDto) }
        } catch (e) {
            throw new InternalServerErrorException("Signin failed")
        }
    }
}
