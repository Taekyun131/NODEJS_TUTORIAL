const { MongoClient } = require("mongodb");
// 몽고디비 연결주소
const uri = require("../../Info") + "/board";

// 몽고디비 커넥션 연결함수 반환
module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
