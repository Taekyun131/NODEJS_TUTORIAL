// 핸들바는 기본적인 헬퍼 함수는 제공하지만 나머지는 모두 커스텀 헬퍼 함수로 구현해 사용해야 함
// 커스텀 헬퍼함수
// 1. 리스트의 길이를 구하는 함수
// 2. 두 값이 같은지 비교하는 함수
// 3. ISO 데이터 포맷에서 날짜만 뽑아내는 함수

module.exports = {
  // 리스트 길이변환
  lengthOfList: (list = []) => list.length,
  // 두 값을 비교해 같은지 여부를 반환
  eq: (val1, val2) => val1 === val2,
  // ISO 날짜 문자열에서 날짜만 반환
  dateString: (isoString) => new Date(isoString).toLocaleDateString(),
};

// 헬퍼함수 사용시
// {{ 헬퍼함수명 변수1 변수2 ... }}
// {{ 헬퍼함수1 (헬퍼함수2 변수1 변수2) 변수1 }}
