import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {} // ConfigService 주입

  @Get()
  getHello(): string {
    const message = this.configService.get('MESSAGE'); // configService.get()호출
    return message;
  }

  @Get('service-url') // http://localhost:3000/service-url의 경로진입 시 실행
  getServiceUrl(): string {
    const url = this.configService.get('SERVICE_URL'); // SERVICE_URL 환경변수 반환
    return url;
  }

  @Get('db-info')
  getTest(): string {
    console.log(this.configService.get('logLevel'));
    console.log(this.configService.get('apiVersion'));
    const dbInfo = this.configService.get('dbInfo');
    return dbInfo;
  }

  @Get('redis-info')
  getRedisInfo(): string {
    return `${this.configService.get('redis.host')}:${this.configService.get('redis.port')}`;
  }

  @Get('server-url')
  getServerUrl(): string {
    return this.configService.get('SERVER_URL') as string;
  }
}
