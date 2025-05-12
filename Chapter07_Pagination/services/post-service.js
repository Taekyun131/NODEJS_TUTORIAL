// 게시글의 CRUD 로직을 포함

// 글쓰기
async function writePost(collection, post) {
  // 글쓰기 함수
  // 생성일시와 조회수를 넣어줌
  post.hits = 0;
  post.createdDt = new Date().toISOString(); // 날짜를 ISO 포맷으로 저장
  return await collection.insertOne(post); // 몽고디비에 post를 저장 후 결과 반환
}

module.exports = {
  // require()로 파일을 임포트 시 외부로 노출하는 객체
  writePost,
};
