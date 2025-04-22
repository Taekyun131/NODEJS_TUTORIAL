import http from "k6/http";

export const options = {
  // 테스트 옵션
  vus: 100, // 가상 유저를 100명으로 설정
  duration: "10s", // 10초 동안 계속 요청
};

export default function () {
  http.get("http://localhost:8000"); // 테스트에 사용할 함수 지정
}
