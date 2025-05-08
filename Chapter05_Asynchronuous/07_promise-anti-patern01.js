/* 문제점
1. Promise의 then() 함수에 성공 시와 실패 시 처리할 함수를 둘 다 넘기는 경우
2. Promise를 중첩해서 사용하는 경우 
*/

function myWork(work) {
  return new Promise((resolve, reject) => {
    if (work === "done") {
      resolve("게임 가능");
    } else {
      reject(new Error("게임 불가능"));
    }
  });
}

// 콜백과 다를 바가 없음
myWork("done").then(
  function (value) {
    console.log(value);
  },
  function (err) {
    console.error(err);
  }
);

// 좋음
myWork("doing")
  .then(function (value) {
    console.log(value);
  })
  .catch(function (err) {
    console.error(err);
  });
