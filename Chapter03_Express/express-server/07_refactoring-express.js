// 직접 만든 라우터 코드를 express 로 리팩터링
const url = require("url");
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("Express로 라우터 리팩터링하기");
});

// GET 메서드의 라우팅 설정
app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
  const user = url.parse(req.url, true).query;

  // 결과값으로 유저명과 나이 설정
  res.json(`[user] name: ${user.name}, age: ${user.age}`);
}

// "/feed"로 요청이 오면 실행되는 함수
function feed(_, res) {
  res.json(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
            </ul>`);
}
