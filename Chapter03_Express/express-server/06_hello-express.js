// "헬로 Express"를 반환하는 익스프레스 서버
const express = require("express"); // express 모듈 불러오기
const app = express(); // express를 초기화 후 app에 할당
const port = 3000;

app.get("/", (req, res) => {
  // "/"으로 요청이 오는 경우 실행
  res.setHeader("Content-Type", "text/html;charset=utf-8"); // 헤더값 설정
  res.end("헬로 Express");
});

app.listen(port, () => {
  // 서버를 기동해 클라이언트 요청을 기다림
  console.log(`START SERVER: use ${port}`);
});
