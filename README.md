# React 공부하기

## 1. 프로젝트 구조파악하기

- node modules

  - npm 으로 다운로드 받은 파일 보관 장소
  - `npm install 라이브러리이름`
  - 깃허브에 push 할 경우 제외합니다.
  - 깃허브에 제외되는 내용은 gitignore 에 자동 셋팅
  - `npm install` 줄여서 `npm i`실행시 package.json 기준 목록으로 자동 설치

- public 폴더

  - 최초 실행시 보여줄 파일이 배치 : `index.html`
  - 압축하지 않은 즉, 용량 최적화가 되지 않은 원본 파일들이 배치됩니다.
  - SEO 관련된 파일들이 배치됩니다.
  - 추가로 원하시는 css 폴더 및 파일, images 폴더 및 파일 배치됩니다.
  - 리액트 src 폴더에서 접근하려면 /images 등으로 접근합니다.

- src 폴더

  - 실제 컨텐츠 코드 진행하는 폴더
  - 작업은 src 안쪽을 작업합니다.

- root 폴더(/)
  - npm 관련 설치 내용 : package.json
  - 각 라이브러리(node_modules) 설치된 버전정보 : package-lock.json
  - 깃허브 예외 : .gitignore
  - ESlint 설정
  - Prettier 설정
  - TypeScript 설정
  - README.md 설정
