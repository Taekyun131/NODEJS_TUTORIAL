const postOption = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const postId = document.querySelector("[data-id]").dataset.id;
async function modifyPost() {
  const password = prompt("패스워드를 입력해주세요");
  // 프롬프트에서 취소를 누른 경우 처리
  if (!password) {
    return;
  }

  // check-password API 실행
  const result = await fetch("/check-password", {
    ...postOption,
    body: JSON.stringify({ id: postId, password }),
  });

  // json 함수를 실행하는 경우도 await 처리 해야함
  const data = await result.json();

  // 패스워드가 맞는 경우 수정 페이지로 이동
  if (data.isExist) {
    document.location = `/modify/${postId}`;
  } else {
    alert("패스워드가 올바르지 않습니다.");
  }
}

const deleteOption = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
};
async function deletePost() {
  // 프롬프트로 값 입력받기
  const password = prompt("삭제하려면 패스워드를 입력해주세요");
  // 프롬프트에서 취소를 누른 경우
  if (!password) {
    return;
  }

  // fetch API를 사용해 delete API 호출
  const result = await fetch("/delete", {
    ...deleteOption,
    body: JSON.stringify({ id: postId, password }),
  });

  // delete API의 결과에 따라 다른 메시지 출력
  const data = await result.json();
  if (!data.isSuccess) {
    alert("삭제에 실패했습니다. 패스워드를 확인해주세요");
    return;
  } else {
    alert("삭제되었습니다.");
  }

  document.location = "/";
}

// 댓글 삭제
async function deleteComment(idx) {
  const password = prompt("삭제하려면 패스워드를 입력해주세요");
  // 프롬프트에서 취소를 누른 경우 처리
  if (!password) {
    return;
  }

  // /delete-comment APi 실행
  const result = await fetch("/delete-comment", {
    ...deleteOption,
    body: JSON.stringify({ id: postId, idx, password }),
  });

  // 댓글 삭제 실패 시 메시지 띄우고 함수 실행 종료
  const data = await result.json();
  if (!data.isSuccess) {
    alert("댓글 삭제에 실패했습니다. 패스워드를 확인해주세요");
    return;
  }
  alert("삭제 성공");
  document.location.reload();
}
