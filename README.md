# React 공부하기

## 3. 컴포넌트 html의 이해

- 컴포넌트의 용도 1 은 html 을 출력한다.
- 컴포넌트의 용도 2 은 여러번 재사용.
- 컴포넌트의 용도 3 은 유지보수 편리.
- 컴포넌트는 관례상 파일로 생성.
- 컴포넌트는 반드시 파스칼케이스(대문자)로 파일 및 코드 생성.

### 2. 리액트 작업 (CSS 작업)

- `npm i -D sass` 설치
- /src/scss 폴더 생성후 .scss 파일들을 작성
- Watch Sass 즉, 하단의 버튼을 클릭하여 Watching 을 시켜줌
- 파일명.scss 를 저장하니까 파일명.css가 만들어 졌어요.
- scss 로 저장해서 만들어진 css 갯수만큼 배치해야한다.
- \_를 붙여준 .scss 는 저장을 해도 css 가 안만들어진다.
- @import "파일명"을 할 때 \_기호를 제거하고 파일명만 넣어주면 하나의 파일로 합쳐진다.

`/src/scss/mian.scss`

```scss
@import "variables";
@import "mixin";
@import "header";
@import "footer";

.wrap {
  position: relative;
  @include bt(red);
  background: green;
  .main {
    position: relative;
    .slide {
      position: relative;
    }

    @media screen and (max-width: $mobile-screen) {
      .slide {
        position: absolute;
      }
    }
  }
}

@media screen and (max-width: $wide_screen) {
  .wrap {
    position: relative;
  }
}
@media screen and (max-width: $pc-screen) {
  .wrap {
    position: relative;
  }
}
@media screen and (max-width: $notebook-screen) {
  .wrap {
    position: relative;
  }
}
@media screen and (max-width: $tablet-screen) {
  .wrap {
    position: relative;
  }
}
@media screen and (max-width: $mobile-screen) {
  .wrap {
    position: relative;
  }
}
@media screen and (max-width: $min-mobile-screen) {
  .wrap {
    position: relative;
  }
}
```

`/src/scss/_variables.scss`

```scss
$wide-screen: 1920px;
$pc-screen: 1280px;
$notebook-screen: 1024px;
$tablet-screen: 960px;
$mobile-screen: 760px;
$min-mobile-screen: 480px;
```

`/src/scss/_mixin.scss`

```scss
@mixin bt($cc) {
  border: 5px solid $cc;
}
```

#### 2.3. 파일 : link .scss 방식

#### 2.4. js 형식 : inline {} 방식

#### 2.5. js 형식 : 변수 {} 방식

#### 2.6. CSS-in-JS 형식 : emotion.js 방식
