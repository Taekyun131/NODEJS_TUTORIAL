import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm'; // typeorm의 리포지토리(저장, 읽기와 같은 기본적인 메서드 제공)

@Injectable() // 의존성 주입을 위한 데코레이터
export class UserService {
  constructor(
    // 리포지토리 주입
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // 유저 생성
  createUser(user): Promise<User> {
    return this.userRepository.save(user);
  }

  // 한 명의 유저정보 찾기
  async getUser(email: string) {
    const result = this.userRepository.findOne({
      where: { email },
    });
    return result;
  }

  // 유저 정보 업데이트
  async updateUser(email, _user) {
    const user = await this.getUser(email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    console.log(_user);
    user.username = _user.username;
    user.password = _user.password;
    console.log(user);
    this.userRepository.save(user);
  }

  // 유저 정보 삭제
  deleteUser(email: any) {
    return this.userRepository.delete({ email });
  }
}
