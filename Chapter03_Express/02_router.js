// user와 feed 요청을 처리하는 서버
const http = require("http");
const url = require("url"); // url 모듈 로딩
http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // 패스명 할당
    res.setHeader("Content-Type", "text/html");

    if (path === "/user") {
      res.end("[user] name: andy, age: 30"); // user에 대한 결과값 설정
    } else if (path === "/feed") {
      res.end(`<ul>
                <li>picture1</li>
                <li>picture2</li>
                <li>picture3</li>
                </ul>`); // feed에 대한 결과값 설정
    } else {
      res.statusCode = 400; // 결과값으로 에러 메시지 설정
      res.end("404 page not found");
    }
  })
  .listen("3000", () => console.log("라우터를 만들어보자!"));
