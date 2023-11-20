# React 공부하기

## 3. 컴포넌트 html의 이해

- 컴포넌트의 용도 1 은 html 을 출력한다.
- 컴포넌트의 용도 2 은 여러번 재사용.
- 컴포넌트의 용도 3 은 유지보수 편리.
- 컴포넌트는 관례상 파일로 생성.
- 컴포넌트는 반드시 파스칼케이스(대문자)로 파일 및 코드 생성.

### 2. 리액트 작업 (CSS 작업)

#### 2.6. CSS-in-JS 형식 : emotion.js 방식

- `npm i @emotion/styled @emotion/react`
- html 태그를 이용해서 내용을 구분하는 것은 한계가 있다.
- html 태그에 이름을 변경하여 가독성/용도 활용을 수월하게 해준다.
- html 태그에 이름을 변경하면서도 css 도 함께 적용한다.
- html 태그 재활용(props 전달)을 수월하게 한다.
- vscode 익스텐션 설치(플러그인) `vscode-styled-components`
- `import styled from "@emotion/styled";`

```js
const SlideSection = styled.section``;
...
<SlideSection>
  <div className="inner">이미지슬라이드</div>
</SlideSection>;
```

- 변수 전달하기

```js
export const SlideSection = styled.section`
  position: relative;
  display: block;
  width: 50%;
  margin: 0 auto;
  height: ${props => (props.h ? props.h + "px" : null)};
  background: ${props => (props.bg ? props.bg : "orange")};
`;

....
<SlideSection bg="yellow" h={200}>
....
</SlideSection>
```
