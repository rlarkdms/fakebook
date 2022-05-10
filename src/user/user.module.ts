import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([ UserEntity ])
    ],
    controllers: [ UserController ],
    providers: [ UserService ],
    exports: [ UserService ]
})
export class UserModule {
}
