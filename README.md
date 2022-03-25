## Description
고객이 리뷰를 등록 하고 리뷰를 확인할 수 있는 기능을 구현합니다.

(자세한 실행 방법)

(배포 링크)

## 기술스택
- React.js
- prop-types
- (Storybook)
- uuid
- redux-toolkit, RTK query
- styled-component, theme, GlobalStyle
- fontawesome, react-icons
- react-loading
- react-router

## preview
- **상품 리뷰 리스트 페이지** : 고객이 구매한 상품에 대한 전체 리뷰를 확인 할 수 있는 페이지
- **상품 리뷰 상세 페이지** : 특정 리뷰를 클릭하면 보이는 리뷰 상세 페이지
- 리뷰 등록 페이지 : 리뷰를 등록하는 페이지

## 상품 리뷰 리스트 페이지

<img width="289" alt="스크린샷 2022-03-25 오후 2 41 06" src="https://user-images.githubusercontent.com/70502670/160061921-ea062005-a5f3-4f9b-9545-dafd9deb1d83.png"><img width="287" alt="스크린샷 2022-03-25 오후 2 41 44" src="https://user-images.githubusercontent.com/70502670/160061815-cdbcc77f-4e09-41da-82ee-d5949c7af008.png"><img width="289" alt="스크린샷 2022-03-25 오후 2 42 09" src="https://user-images.githubusercontent.com/70502670/160061953-f2db3419-9660-474e-98fc-df7f2afb73fe.png">

- 무한 스크롤 : Intersection Observer
- 정렬(최신, 리뷰카운트, 랜덤 등)
  랜덤구현 : 현재 가지고 있는 데이터를 suffling해서 보여주고, 이후에는 최신순 데이터를 가져와 suffling후 추가한다. 
- 리뷰 목록 표시 형태 선택 (그리드, 리스트)
- 상태 관리
- 공통 컴포넌트 생성
- (client 상태, 서버 데이터 캐시 관리 분리)

## 상품 리뷰 상세 페이지

<img width="290" alt="스크린샷 2022-03-25 오후 2 41 21" src="https://user-images.githubusercontent.com/70502670/160061935-94fcbcd4-54d5-4107-8895-ce6a60037e25.png"><img width="289" alt="스크린샷 2022-03-25 오후 2 42 52" src="https://user-images.githubusercontent.com/70502670/160061823-c36b0e9e-c06d-4906-b93d-23150f187b4a.png"><img width="289" alt="스크린샷 2022-03-25 오후 2 43 31" src="https://user-images.githubusercontent.com/70502670/160061832-be81171a-33ef-408b-93d4-a6634c5c7e11.png"><img width="288" alt="스크린샷 2022-03-25 오후 2 47 30" src="https://user-images.githubusercontent.com/70502670/160062064-a6611503-252e-4755-ae11-6f9f48d3f790.png">

- 리뷰 댓글,대댓글 추가, 수정, 삭제
  자신의 댓글인 경우 표시
  대댓글에 @targetUsername 추가
  이모지 랜더링
  (로컬 캐싱)
- 좋아요
  (모달, 위시리스트)
- 링크 공유
  모달
  url 쿼리 포함(라우팅 설정)
- 무한스크롤

## 리뷰 등록 페이지

<img width="290" alt="스크린샷 2022-03-25 오후 2 48 13" src="https://user-images.githubusercontent.com/70502670/160062223-60dcface-422a-49ea-8b3d-c93c890d7bd0.png"><img width="287" alt="스크린샷 2022-03-25 오후 2 48 53" src="https://user-images.githubusercontent.com/70502670/160062226-9f7d9819-e6e1-4c8b-a1b4-de2a15cdd963.png">


- 제목 + 이미지 + 평점 등록
- controlledInput 사용
- 이미지업로드 (다중 선택 가능, 개수 제한, 미리보기)
- 버튼 활성화/비활성화
- (리덕스 상태 변경)
- (로컬 캐싱)

## dev log
- 예시 페이지에서 url 변경 없이 페이지 이동(컴포넌트 변경)이 일어나고 있어서 동일하게 개발했는데, 공유기능을 개발하면서 보니 공유 url에는 쿼리포함 라우팅된 주소가 들어있었다. 공유 기능을 위해 react-router를 추가하여 url 과 쿼리를 설정해주었는데, 예시 페이지에서 왜 그렇게 개발한지 궁금하다. 
(가설1 : 네트워크 요청을 줄일려고)
(가설2 : 페이지 전환을 부드럽게 하려고)
- 웹 접근성 향상을 위해 개발하면서 Input focus를 건들였는데, falsy값 필터링을 해주지 않아서 무한 스크롤이나 페이지 전환 시 의도하지 않은대로 스크롤이 이동하였다. (디버깅 2시간동안..)
- (고민중)모달창이 활성화될때, scroll을 비활성화하려고 하는데 현재 body 태그 스타일을 변경하여 개발한 문제가 있다. 사이드 이펙트 감소를 위해 더 좋은 방법이 있을까?
- 코드 퀄리티를 위해서 코드배치에 대한 고민. 현재 (useState(주요 상태)/useSelect & 네트워크 요청/, 함수선언, useEffect(함수사용)순이다)
- 이미지 로드 지연 해결 필요
