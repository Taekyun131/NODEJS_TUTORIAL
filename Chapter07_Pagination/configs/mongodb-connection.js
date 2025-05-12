const { MongoClient } = require("mongodb");

// 몽고디비 연결 주소
const uri = require("../../Info.js");

module.exports = function (callback) {
  // 몽고디비 커넥션 연결 함수 반환
  return MongoClient.connect(uri, callback);
};
