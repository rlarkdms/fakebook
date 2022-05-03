import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: 5432,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASS,
          database: process.env.DATABASE_NAME,
          autoLoadEntities: true,
          synchronize: true,
          entities: ["dist/**/*.entity{.ts,.js}"]
      }),
      UsersModule
  ]
})
export class AppModule {}

모듈 리드미에 설명 적기