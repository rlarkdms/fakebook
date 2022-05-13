import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([ UserEntity ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn:'7d'}
        })
    ],
    controllers: [ UserController ],
    providers: [ UserService ],
    exports: [ UserService ]
})
export class UserModule {
}
