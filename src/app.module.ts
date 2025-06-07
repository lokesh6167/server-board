import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CanvasModule } from './canvas/canvas.module';
import { User } from './users/user.entity';
import { CanvasItem } from './canvas/canvas-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Test@123',
      database: 'board',
      entities: [User, CanvasItem],
      synchronize: true,
      logging:true
    }),
    JwtModule.register({
      global: true,
      secret: 'lokesh-jwt-board',
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UsersModule,
    CanvasModule,
  ],
})
export class AppModule {}