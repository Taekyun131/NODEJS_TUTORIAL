const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const postService = require("./services/post-service"); // 서비스 파일 로딩

// http요청의 body를 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 몽고디비 연결함수
const mongodbConnection = require("./configs/mongodb-connection");

// 템플릿 엔진으로 핸들바 등록
// app.engine("handlebars", handlebars.engine());
// 핸들바 커스텀 함수 설정 추가
app.engine(
  "handlebars",
  handlebars.create({
    // 핸들바 생성 및 엔진 반환
    helpers: require("./configs/handlebars-helpers"),
  }).engine
);

app.set("view engine", "handlebars"); // 웹 페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 뷰 디렉터리를 views로 설정

// 라우터 설정

// 리스트 페이지
// app.get("/", (req, res) => {
//   //   res.render("home", { title: "안녕하세요", message: "만나서 반갑습니다!" });
//   res.render("home", { title: "테스트 게시판" });
// });
app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // 현재 페이지 데이터
  const search = req.query.search || ""; // 검색어 데이터
  try {
    // postService.list에서 글 목록과 페이지네이터를 가져옴
    const [posts, paginator] = await postService.list(collection, page, search);

    // 리스트 페이지 렌더링
    res.render("home", { title: "테스트 게시판", search, paginator, posts });
  } catch (error) {
    console.error(error);
    res.render("home", { title: "테스트 게시판" }); // 에러가 나는 경우 빈 값으로 렌더링
  }
});

// write 페이지 이동 핸들러
app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판" });
});

// 글쓰기
app.post("/write", async (req, res) => {
  const post = req.body;
  // 글쓰기 후 결과 반환
  const result = await postService.writePost(collection, post);
  // 생성된 도큐먼트의 id를 사용해 상세페이지로 이동
  res.redirect(`/detail/${result.insertedId}`);
});

// 상세페이지 이동 핸들러
app.get("/detail/:id", async (req, res) => {
  res.render("detail", {
    title: "테스트 게시판",
  });
});

// app.listen(3000);
let collection;
app.listen(3000, async () => {
  console.log("Server started");
  // mongodbConnection()의 결과는 mongoClient
  const mongoClient = await mongodbConnection();
  // mongoClient.db()로 디비 선택, collection()으로 컬렉션 선택 후 collection에 할당
  collection = mongoClient.db().collection("post");
  console.log("MongoDB connected");
});
