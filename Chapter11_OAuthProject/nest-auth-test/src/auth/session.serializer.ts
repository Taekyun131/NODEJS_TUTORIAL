import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
// PassportSerializer 상속받음
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  // 세션에 정보를 저장할 때 사용
  serializeUser(user: any, done: (err: Error | null, user: any) => void): any {
    console.log('SERIALIZE:', user);
    done(null, user.email); // 세션에 저장할 정보
  }

  // 세션에서 정보를 꺼내올 때 사용
  async deserializeUser(
    payload: any,
    done: (err: Error | null, payload: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUser(payload);

    // 유저 정보가 없는 경우 done() 함수에 에러 전달
    if (!user) {
      done(new Error('No User'), null);
      return;
    }
    const { password, ...userInfo } = user;

    // 유저 정보가 있다면 유저 정보 반환
    done(null, userInfo);
  }
}
