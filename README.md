# React 공부하기

## 3. 컴포넌트 html의 이해

- 컴포넌트의 용도 1 은 html 을 출력한다.
- 컴포넌트의 용도 2 은 여러번 재사용.
- 컴포넌트의 용도 3 은 유지보수 편리.
- 컴포넌트는 관례상 파일로 생성.
- 컴포넌트는 반드시 파스칼케이스(대문자)로 파일 및 코드 생성.

### 2. 리액트 작업 (CSS 작업)

- prettier 프로젝트 설정
  - vscode에 prettier 익스텐슨 설치 필수
  - /에 `.prettierrc.json` 파일 생성

```json
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

- eslint 프로젝트 설정

  - `npx eslint --init` 외부에서 설정하도록 진행
  - To check syntax and find problems 선택
  - JavaScript modules (import/export) 선택
  - React 선택
  - Does your project use TypeScript? No 선택
  - Where does your code run? Browser 선택
  - What format do you want your config file to be in? JavaScript 선택
  - Would you like to install them now? Yes 선택
  - Which package manager do you want to use? npm 선택
  - .eslintrc.js

  ```js
  module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [".eslintrc.{js,cjs}"],
        parserOptions: {
          sourceType: "script",
        },
      },
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["react"],
    rules: {},
  };
  ```

- eslint 와 prettier 를 연결하여서 eslint 설정
  `npm install eslint-config-prettier --save-dev`
- `.eslintrc.js` 내용 수정("prettier" 추가)

```js
  ...
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  ...
```

- eslint rules 추가(오류, 경고, 제외할 설정 작성)

```js
  ...
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": "off",
  },
  ...
```

- 버전에 의한 경고(Warning) 제외
  `npm install @babel/plugin-proposal-private-property-in-object --dev`

#### 2.4. js 형식 : inline {} 방식

#### 2.5. js 형식 : 변수 {} 방식

#### 2.6. CSS-in-JS 형식 : emotion.js 방식
