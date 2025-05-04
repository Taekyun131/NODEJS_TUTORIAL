// 간단 게시판 만들기
const express = require("express");
const app = express();
let posts = []; // 게시글 리스트로 사용할 posts에 빈 리스트를 할당

// req.body를 사용하려면 json 미들웨어를 사용해야 함
// 사용하지 않으면 undefined로 반환
app.use(express.json()); // json미들웨어 활성화

// POST 요청 시 컨텐트 타입이 application/x-www-form-urlencoded인 경우 파싱
app.use(express.urlencoded({ extended: true })); // json 미들웨어와 함께 사용

app.get("/", (req, res) => {
  // "/"로 요청 시
  res.json(posts); // 게시글 리스트를 JSON 형식으로 보여줌
});

app.post("/posts", (req, res) => {
  // "/posts"로 요청 시
  const { title, name, text } = req.body; // HTTP 요청의 body 데이터를 변수에 할당

  // 게시글 리스트에 새로운 게시글 정보 추가
  posts.push({ id: posts.length + 1, title, name, text, createdDate: Date() });
  res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; // app.delete에 설정한 path 정보에 id값을 가져옴
  const filteredPosts = posts.filter((post) => post.id !== +id); // 글 삭제 로직
  // +id는 문자열인 id를 숫자형으로 형 변환
  // 해당 id와 같지 않은 게시글을 포함한 리스트를 리턴
  const isLengthChanged = posts.length !== filteredPosts.length; // 삭제 확인
  posts = filteredPosts;
  if (isLengthChanged) {
    // posts의 데이터 개수가 변경되었으면 삭제 성공
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED"); // 변경되지 않음
});

app.listen(3000, () => {
  console.log("welcome posts START!");
});

// 게시판 API curl로 테스트
// - 게시글 조회: curl -X GET http://localhost:3000 (-X GET 생략가능)
// - 게시글 작성: curl -X POST -H "Content-Type: application/x-www-form-urlencoded"-d "title=?&name=?&text=?" http://localhost:300/posts
// - 게시글 삭제: curl -X DELETE localhost:3000/posts/?
