// 글쓰기

// 글쓰기 함수
async function writePost(collection, post) {
  // 생성일시와 조회수를 넣어줌
  post.hits = 0;
  post.createdDt = new Date().toISOString(); // 날짜는 ISO 포맷으로 저장
  return await collection.insertOne(post); // 몽고디비에 post를 저장 후 결과 반환
}

// list()함수
const paginator = require("../utils/paginator");
async function list(collection, page, search) {
  const perPage = 10;
  // title이 search와 부분일치하는지 확인
  const query = { title: new RegExp(search, "i") };
  // limit는 10개만 가져온다는 의미, skip은 설정된 개수만큼 건너뛴다는 의미
  // 생성일 역순으로 정렬
  const cursor = collection
    .find(query, { limit: perPage, skip: (page - 1) * perPage })
    .sort({
      createdDt: -1,
    });
  // 검색어에 걸리는 게시물의 총합
  const totalCount = await collection.count(query);
  const posts = await cursor.toArray(); // 커서로 받아온 데이터를 리스트로 변경
  // 페이지네이터 생성
  const paginatorObj = paginator({ totalCount, page, perPage: perPage });
  return [posts, paginatorObj];
}

// 상세 페이지
const { ObjectId } = require("mongodb");

// 패스워드는 노출할 필요가 없으므로 결과값으로 가져오지 않음
const projectionOption = {
  projection: {
    // 프로젝션(투영): 결과값에서 일부만 가져올 때 사용
    password: 0,
    "comments.password": 0,
  },
};

async function getDetailPost(collection, id) {
  // 몽고디비 Collection의 findOneAndUpdate() 함수를 사용
  // 게시글을 읽을 때마다 hits를 1 증가
  return await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $inc: { hits: 1 } },
    projectionOption
  );
}

// id와 password로 게시글 데이터 가져오기
async function getPostByIdAndPassword(collection, { id, password }) {
  // findOne() 함수 사용
  return await collection.findOne(
    { _id: new ObjectId(id), password: password },
    projectionOption
  );
}

// id로 데이터 불러오기
async function getPostById(collection, id) {
  return await collection.findOne({ _id: new ObjectId(id) }, projectionOption);
}

// 게시글 수정
async function updatePost(collection, id, post) {
  const toUpdatePost = {
    $set: {
      ...post,
    },
  };
  return await collection.updateOne({ _id: new ObjectId(id) }, toUpdatePost);
}

// 게시글 삭제
async function deletePost(collection, id, password) {
  try {
    // collection의 deleteOne을 사용해 게시글 하나를 삭제
    console.log(id, password);
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      password: password,
    });
    if (result.deletedCount !== 1) {
      console.log("삭제 실패");
      console.log(result.deletedCount);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 댓글 삭제
async function deleteComment(collection, id, password, idx) {
  const post = await collection.findOne(
    {
      _id: new ObjectId(id),
      comments: { $elemMatch: { idx: parseInt(idx), password } },
    },
    projectionOption
  );

  if (!post) {
    return false;
  }

  // 댓글 번호가 idx 이외의 것만 comment에 닫시 할당 후 저장
  post.comments = post.comments.filter((comment) => comment.idx != idx);
  updatePost(collection, id, post);
  return true;
}

// require()로 파일을 임포트 시 외부로 노출하는 객체
module.exports = {
  writePost,
  list,
  getDetailPost,
  getPostById,
  getPostByIdAndPassword,
  updatePost,
  deletePost,
  deleteComment,
};
