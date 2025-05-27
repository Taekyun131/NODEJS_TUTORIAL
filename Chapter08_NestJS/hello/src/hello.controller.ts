import { Controller, Get } from "@nestjs/common"; // 필요한 함수 임포트

@Controller() // 컨트롤러 데코레이터
export class HelloController {
  @Get() // Get 요청 처리 데코레이터
  hello() {
    return "안녕하세요! NestJS로 만든 첫 애플리케이션입니다";
  }
}
