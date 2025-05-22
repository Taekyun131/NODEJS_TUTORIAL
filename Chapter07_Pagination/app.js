const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const postService = require("./services/post-service"); // 서비스 파일 로딩
// http요청의 body를 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 프로젝트 정적 파일 경로 등록
app.use(express.static("public"));

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
  res.render("write", { title: "테스트 게시판", mode: "create" });
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
// app.get("/detail/:id", async (req, res) => {
//   res.render("detail", {
//     title: "테스트 게시판",
//   });
// });
app.get("/detail/:id", async (req, res) => {
  // 게시글 정보 가져오기
  const result = await postService.getDetailPost(collection, req.params.id);
  res.render("detail", {
    title: "테스트 게시판",
    // post: result.value,  // 오류발생
    post: result,
  });
});

// 패스워드 체크 API

// 패스워드 체크
// id, password 값을 가져옴
app.post("/check-password", async (req, res) => {
  const { id, password } = req.body;

  // postService의 getPostByIdAndPassword() 함수를 사용해 게시글 데이터 확인
  const post = await postService.getPostByIdAndPassword(collection, {
    id,
    password,
  });

  if (!post) {
    return res.status(404).json({ isExist: false });
  } else {
    return res.json({ isExist: true });
  }
});

// 글 수정 페이지로 이동, mode는 modify
app.get("/modify/:id", async (req, res) => {
  // getPostById() 함수로 게시글 데이터를 받아옴
  const post = await postService.getPostById(collection, req.params.id);
  console.log(post);
  res.render("write", { title: "테스트 게시판", mode: "modify", post });
});

// 게시글 수정 API
app.post("/modify/", async (req, res) => {
  const { id, title, writer, password, content } = req.body;

  const post = {
    title,
    writer,
    password,
    content,
    createdDt: new Date().toISOString,
  };
  // 업데이트 결과
  const result = postService.updatePost(collection, id, post);
  res.redirect(`/detail/${id}`);
});

// 게시글 삭제
app.delete("/delete", async (req, res) => {
  const { id, password } = req.body;
  const result = await postService.deletePost(collection, id, password);
  if (result) {
    res.json({ isSuccess: true });
  } else {
    res.json({ isSuccess: false });
  }
});

// 댓글 작성
app.post("/write-comment", async (req, res) => {
  const { id, password, name, comment } = req.body;
  const post = await postService.getPostById(collection, id);

  // 게시글에 기존 댓글 리스트가 있으면 추가
  if (post.comment) {
    post.comment.push({
      idx: post.comments.length + 1,
      name,
      password,
      comment,
      createdDt: new Date().toISOString(),
    });
  } else {
    // 게시글에 댓글 정보가 없으면 리스트에 댓글 정보 추가
    post.comments = [
      { idx: 1, name, password, comment, createdDt: new Date().toISOString() },
    ];
  }

  // 업데이트 후 상세 페이지로 다시 리다이렉트
  postService.updatePost(collection, id, post);
  return res.redirect(`/detail/${id}`);
});

// 댓글 삭제
app.delete("/delete-comment", async (req, res) => {
  const { id, idx, password } = req.body;
  const result = await postService.deleteComment(collection, id, password, idx);
  if (result) {
    return res.json({ isSuccess: true });
  }
  return res.json({ isSuccess: false });
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
