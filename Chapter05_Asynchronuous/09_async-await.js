// async와 await는 기존의 비동기 처리 방식인 콜백 함수와 Promise의 단점을 보완하고, 가독성 높은 코드 작성 가능

// async 예제
async function myName() {
  return "Andy";
}

console.log(myName());

// async-await 예제
// 이름을 출력하는 함수
async function showName() {
  const name = await myName(); // await는 Promise 객체인 async 함수의 실행이 끝나길 기다림
  console.log(name);
}

console.log(showName());

// async-await, setTimeout()으로 1부터 10까지 세기
function waitOneSecond(msg) {
  // 1초 대기하고 메시지 출력
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(`${msg}`), 1000);
  });
}

async function countOneToTen() {
  // 10초 동안 1초마다 메시지 출력
  for (let x of [...Array(10).keys()]) {
    // 0부터 9까지 루프를 순회
    // 1초 대기 후 result에 결과 저장
    let result = await waitOneSecond(`${x + 1}초 대기 중...`);
    console.log(result);
  }
  console.log("완료");
}

countOneToTen();
