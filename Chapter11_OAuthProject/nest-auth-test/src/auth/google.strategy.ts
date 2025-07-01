import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { access } from 'fs';
import { Profile, Strategy, StrategyOptions } from 'passport-google-oauth20';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
// PassportStrategy(Strategy) 상속
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    // 부모 클래스의 생성자를 호출
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google',
      scope: ['email', 'profile'],
    } as StrategyOptions);
  }

  // OAuth 인증이 끝나고 콜백으로 실행되는 메서드
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    console.log(accessToken);
    console.log(refreshToken);

    const providerId = id;
    const email = emails?.[0]?.value;
    const fullName = `${name?.familyName ?? ''}${name?.givenName ?? ''}`;
    // 유저 정보 저장 혹은 가져오기
    const user: User = await this.userService.findByEmailOrSave(
      email,
      fullName,
      providerId,
    );

    console.log(providerId, email, name?.familyName, name?.givenName);
    return user;
  }
}
