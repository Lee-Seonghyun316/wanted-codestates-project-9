import { randomData } from './data';

//최신순 정렬함수:  id 기준 오름차순 정렬
export const lastOrder = (randomData) => {
  return [...randomData].sort((a, b) => b.id - a.id);
};

//리뷰카운터수 기준 정렬함수: like 기준 오름차순 정렬
export const reviewCount = (randomData) => {
  return [...randomData].sort((a, b) => b.like - a.liek);
};

//사용방법
// console.log('랜덤데이터', randomData);
// console.log('최신순', lastOrder(randomData));
// console.log('랜덤데이터', reviewCount(randomData));
