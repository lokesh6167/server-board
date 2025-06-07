import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: { email: string; password: string }) {
  try {
    const hashed = await bcrypt.hash(body.password, 10);
    const user = this.userRepo.create({ email: body.email, password: hashed });
    await this.userRepo.save(user);
    return { message: 'Registered successfully' };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}


  async login(body: { email: string; password: string }) {
    const user = await this.userRepo.findOneBy({ email: body.email });
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}