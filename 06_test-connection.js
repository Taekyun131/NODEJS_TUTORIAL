// 몽고디비 연결 코드

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = require("./Info.js");
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

async function run() {
  // async가 있으므로 비동기 처리 함수
  await client.connect();

  const adminDB = client.db("test").admin(); // adminDB 인스턴스
  const listDatabases = await adminDB.listDatabases(); // 데이터베이스 정보 가져오기
  console.log(listDatabases);
  return "OK";
}

run() // 실행함수
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
