import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class UsersModule {}