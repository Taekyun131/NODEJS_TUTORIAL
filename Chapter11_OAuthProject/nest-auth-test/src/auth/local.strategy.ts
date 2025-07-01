import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // PassportStrategy 믹스인
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // 기본값이 username이므로 email로 변경
  }

  // 유저정보의 유효성 검증
  async validate(email: string, passport: string): Promise<any> {
    const user = await this.authService.validateUser(email, passport);
    if (!user) {
      return null; // null이면 401에러 발생
    }
    return user; // null이 아니면 user정보 반환
  }
}
