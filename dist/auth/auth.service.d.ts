import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    register(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
