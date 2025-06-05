import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config';

console.log('env: ' + process.env.NODE_ENV); // 기동 시 환경변수 출력
console.log('current working directory: ' + process.cwd()); // 현재 디렉토리의 절대경로 출력

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`, // 환경변수 파일경로 지정
      load: [config], // 커스텀 설정 파일 설정
      cache: true, // 캐시설정
      expandVariables: true, // 확장변수 옵션추가
    }),
    WeatherModule,
  ], // ConfigModule설정(전역 모듈 설정 추가)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
