// 콜 스택 예제

// 자바스크립트는 싱글 스레드이므로 한 번에 하나의 작업만 가능
function func1() {
  console.log("1");
  func2();
  return;
}

function func2() {
  console.log("2");
  return;
}

func1();
