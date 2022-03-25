## 배포링크
https://vercel.com/mn031621019-gmailcom/wanted-codestates-project-9

pc로 접속하는 경우, chrome 브라우저에서 f12 로 개발자도구를 열고, 모바일화면으로(ex: IPhone12pro 390*844) 확인합니다. 

## Description
고객이 리뷰를 등록 하고 리뷰를 확인할 수 있는 기능을 구현합니다.

## Usage(자세한 실행 방법)

1. git clone
```
git clone https://github.com/Lee-Seonghyun316/wanted-codestates-project-9.git
```
2. 필요한 라이브러리 설치
```
npm install
```
3. 실행
```
npm run start
```
4. 모바일 웹 페이지 확인
   chrome 브라우저에서 f12 로 개발자도구를 열고, 모바일화면으로(ex: IPhone12pro 390*844) 확인합니다. 

## 기술스택
- React.js
- 전역상태 관리: redux-toolkit
- 데이터 패칭: RTK query
- CSS: styled-component(theme, GlobalStyle 설정)
- 페이지 이동: react-router
- 코드 퀄리티 향상: prop-types

## preview
- **상품 리뷰 리스트 페이지** : 고객이 구매한 상품에 대한 전체 리뷰를 확인 할 수 있는 페이지
- **상품 리뷰 상세 페이지** : 특정 리뷰를 클릭하면 보이는 리뷰 상세 페이지
- **리뷰 등록 페이지** : 리뷰를 등록하는 페이지

## 상품 리뷰 리스트 페이지

<img width="290" alt="스크린샷 2022-03-25 오후 10 26 58" src="https://user-images.githubusercontent.com/70502670/160130912-29c59814-7a04-4e98-8367-47f3ad04226a.png"><img width="291" alt="스크린샷 2022-03-25 오후 10 27 08" src="https://user-images.githubusercontent.com/70502670/160130052-f9961e6a-0ba1-4c5c-8189-467f591a0c91.png"><img width="291" alt="스크린샷 2022-03-25 오후 10 27 28" src="https://user-images.githubusercontent.com/70502670/160130066-7d78a906-c7b5-473a-a0e0-0fa2255b1b35.png">

- 무한 스크롤 : Intersection Observer
- 정렬(최신, 리뷰카운트, 랜덤 등)
  빨간색으로 표시된 정렬버튼을 눌러 모달창을 눌러서 데이터 정렬 방법을 변경할 수 있습니다. 
  랜덤 : 네트워크 요청 최적화를 위해 현재 가지고 있는 데이터를 suffling해서 보여주고, 이후에는 최신순 데이터를 가져와 suffling후 추가해줍니다. 
  예시페이지의 네트워크탭을 확인해보니 최신으로 정렬된 데이터를 불러올 수 있어서 해당 데이터를 사용해 주었으며, 로컬 데이터를 활용할 상황에 대비해 /src/sort 에 리뷰카운트순과 최신순으로 정렬할 수 있는 함수를 작성하였습니다. 
- 리뷰 목록 표시 형태 선택 (그리드, 리스트)
- 반응형

## 상품 리뷰 상세 페이지

<img width="294" alt="스크린샷 2022-03-25 오후 10 39 02" src="https://user-images.githubusercontent.com/70502670/160131734-81d84497-79d5-409b-8e0d-2a5caf196c51.png"><img width="293" alt="스크린샷 2022-03-25 오후 10 39 14" src="https://user-images.githubusercontent.com/70502670/160131746-f4febe02-7f83-4d9e-9019-96ad450cd4f5.png"><img width="293" alt="스크린샷 2022-03-25 오후 10 39 24" src="https://user-images.githubusercontent.com/70502670/160131759-0cf03b82-3185-4db8-8503-ea81f8bd9fbb.png"><img width="294" alt="스크린샷 2022-03-25 오후 10 39 32" src="https://user-images.githubusercontent.com/70502670/160131892-f6e49a06-dc03-41bf-9e81-cd0be6c49d04.png"><img width="291" alt="스크린샷 2022-03-25 오후 10 40 02" src="https://user-images.githubusercontent.com/70502670/160131902-dc706a7d-39d3-473c-96d2-05cb6abcfd9e.png">

- 리뷰 댓글,대댓글 추가, 수정, 삭제
  자신의 댓글인 경우 표시
  대댓글에 @targetUsername 추가
- 좋아요 기능
  좋아요를 누르면 위시리스트에 해당 리뷰가 저장되고, 로고 옆의 하트를 눌러 위시리스트 페이지에서 해당 데이터를 확인 가능합니다. 
  로컬스토리지에 위시리스트에 필요한 데이터를 저장
- 링크 공유
  모달창에서 url를 복사할 수 있습니다. 
  url에는 데이터 패칭에 필요한 쿼리가 포함되어 있습니다. 
- 무한스크롤 : intersection observer 이용
- 반응형

## 리뷰 등록 페이지

<img width="290" alt="스크린샷 2022-03-25 오후 10 43 56" src="https://user-images.githubusercontent.com/70502670/160133153-8f86079a-eed7-42dc-83a0-9c2b9065eda5.png"><img width="290" alt="스크린샷 2022-03-25 오후 10 45 16" src="https://user-images.githubusercontent.com/70502670/160133181-82dbb5a1-649e-4c93-af65-b51c21fad35a.png"><img width="292" alt="스크린샷 2022-03-25 오후 10 45 30" src="https://user-images.githubusercontent.com/70502670/160133195-fd0b3d36-8b67-4ded-8b8a-904a39fddf80.png"><img width="293" alt="스크린샷 2022-03-25 오후 10 47 32" src="https://user-images.githubusercontent.com/70502670/160133201-2dd50a07-cf48-4f2c-a532-086c97ada460.png"><img width="289" alt="스크린샷 2022-03-25 오후 10 48 41" src="https://user-images.githubusercontent.com/70502670/160133211-ace9967f-b1ef-4a44-98d3-24beafc4a5c0.png">

- 제목 + 내용 + 이미지 + 평점 등록
- controlledInput 사용
- 이미지업로드 (다중 선택 가능, 개수 제한: 최대 8개, 미리보기 가능)
- 폼 입력 상태에 따라 버튼 활성화/비활성화
- 로딩, 완료 상태 피드백
- placeholder 대신 label을 사용하여 웹 접근성을 생각했습니다. 
- 반응형

## dev log
- 예시 페이지에서 url 변경 없이 페이지 이동(컴포넌트 변경)이 일어나고 있어서 동일하게 개발했는데, 공유기능을 개발하면서 보니 공유 url에는 쿼리포함 라우팅된 주소가 들어있었다. 유사하게 개발하면서 그 이유에 대해 고민해보았는데 가설은 다음과 가설은 다음과 같습니다. 
(가설1 : 컴포넌트 변경을 통해 네트워크 요청을 줄이기 위해서)
(가설2 : 컴포넌트 변경을 통해 페이지 전환을 부드럽게 하기 위해)
- 웹 접근성 향상을 위해 개발하면서 Input focus를 건들였는데, falsy값 필터링을 해주지 않아서 무한 스크롤이나 페이지 전환 시 의도하지 않은대로 스크롤이 이동하는 오류가 발생했고, 디버깅을 하여 해결했습니다. 
- 코드 퀄리티를 위해서 코드배치에 대한 고민. 현재 useState(주요 상태)/useSelect & 네트워크 요청/, 함수선언, useEffect(함수사용)순으로 맞추려고 노력했습니다. 
- 팀 프로젝트는 아니지만, project를 만들고 PR 과 issue 작성 시 자세한 내용을 적기 위해 노력했습니다. 
