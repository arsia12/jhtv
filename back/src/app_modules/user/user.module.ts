import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositroy } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepositroy])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
