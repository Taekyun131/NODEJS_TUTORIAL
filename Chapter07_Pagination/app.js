// 게시판 프로젝트
// 익스프레스에서 사용하는 템플릿 엔진 중 핸들바 사용
// 핸들바는 머스태시와 호환되면서 추가기능을 제공

const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const postservice = require("./services/post-service"); // 서비스 파일 로딩

// req.body와 POST 요청을 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 몽고디비 연결 함수
const mongodbConnection = require("./configs/mongodb-connection");

// app.engine("handlebars", handlebars.engine()); // 템플릿 엔진으로 핸들바 등록
app.engine(
  "handlebars",
  handlebars
    .create({
      // 핸들바 생성 및 엔진 반환
      helpers: require("./configs/handlebars-helpers"), // 커스텀 헬퍼 함수를 추가
    })
    .engine()
);

app.set("view engine", "handlebars"); // 웹 페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 뷰 디렉터리를 views로 설정

// 라우터 설정
app.get("/", (req, res) => {
  //   res.render("home", { title: "안녕하세요", message: "만나서 반갑습니다!" });
  res.render("home", { title: "테스트 게시판" });
});

// write 페이지 이동 핸들러 함수
app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판" });
});

// 글쓰기
app.post("/write", async (req, res) => {
  const post = req.body;
  // 글쓰기 후 결과 반환
  const result = await postservice.writePost(collection, post);
  // 생성된 도큐먼트의 id를 사용해 상세 페이지로 이동
  res.redirect(`/detail/${result.insertedId}`);
});

// 상세 페이지 이동 핸들러 함수
app.get("/detail/:id", async (req, res) => {
  res.render("detail", {
    tilte: "테스트 게시판",
  });
});

let collection;
app.listen(3000, async () => {
  console.log("Server started");

  // mongodbConnection()의 결과는 mongoClient
  const mongoClient = await mongodbConnection();
  // mongoClient.db()로 디비선택, collection()으로 컬렉션 선택 후 collection에 할당
  colleciton = mongoClient.db("board").collection("post");
  console.log("MongoDB connected");
});
