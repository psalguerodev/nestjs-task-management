import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.respository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService) {}

    async signUp(authCrendentialsDto: AuthCredentialsDto): Promise<void> {
      return this.userRepository.signUp(authCrendentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
      const username = await this.userRepository.validateUserPassword(authCredentialsDto);

      if (!username) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    }
}
