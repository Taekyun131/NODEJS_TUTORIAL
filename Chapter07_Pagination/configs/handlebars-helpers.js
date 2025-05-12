// 게시판에 필요한 핸들바 커스텀 헬퍼
// 1. 리스트 길이를 구하는 함수
// 2. 두 값이 같은지 비교하는 함수
// 3. ISO 데이터 포맷에서 날짜만 뽑아내는 함수

module.exports = {
  // 리스트 길이 반환
  lengthOfList: (list = []) => list.length,

  // 두 값을 비교해 같은지 여부를 반환
  eq: (val1, val2) => val1 === val2,

  // ISO 날짜 문자열에서 날짜만 반환
  dateString: (isoString) => new Date(isoString).toLocaleDateString(),
};
