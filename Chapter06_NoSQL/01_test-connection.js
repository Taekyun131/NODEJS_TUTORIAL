// MongoDB 연결
const { MongoClient } = require("mongodb"); // 몽고디비 패키지를 임포트

// MongoDB 연결정보
const uri = require("./Info.js");
const client = new MongoClient(uri); // MongoDB 클라이언트 객체 생성
// client.connect((err) => {
//   const collection = client.db("test").collection("devices"); // DB 및 컬렉션에 접속
//   client.colse(); // 연결끊기
// });

async function run() {
  // 비동기 처리 함수
  await client.connect();
  const adminDB = client.db("test").admin(); // adminDB 인스턴스
  const listDatabases = await adminDB.listDatabases(); // 데이터베이스 정보 가져오기
  console.log(listDatabases);
  return "OK";
}

run() // 실행함수
  .then(console.log)
  .catch(console.err)
  .finally(() => client.close());
