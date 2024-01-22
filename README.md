# AntDesign Form / Daum Post 활용

- [AntForm](https://ant.design/components/form)
- `npm install antd --save`

## 1. 페이지 생성

- /src/pages/forms/ 폴더
- /src/pages/forms/FormPage.js
- 라우터 적용 / 레이아웃 적용 / 기능담당 컴포넌트생성

```js
import React from "react";
import BasicLayout from "../../layouts/BasicLayout";

const FormPage = () => {
  return (
    <BasicLayout>
      <h1>FormPage</h1>
    </BasicLayout>
  );
};

export default FormPage;
```

- 라우터 연결
  : /src/App.js

```js
// Form 페이지
const LazyFormPage = lazy(() => import("./pages/forms/FormPage"));

<Route
  path="/form"
  element={
    <Suspense fallback={<Loading />}>
      <LazyFormPage />
    </Suspense>
  }
/>;
```

## 2. 컴포넌트 생성

- /src/components/forms/FormComponent.js

```js
import React from "react";

const FormComponent = () => {
  return <div>FormComponent</div>;
};

export default FormComponent;
```

## 3. Link 연결

- /src/components/menus/BasicMenu.js

```js
import React from "react";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
const BasicMenu = () => {
  // 로그인 슬라이스에서 email 읽는다.
  // loginSlice 값을 읽으려고 접근하기
  // const loginState = useSelector(state => state.loginSlice);
  // console.log(loginState);
  const { isLogin } = useCustomLogin();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/form">Form</Link>
        </li>
        {/* 로그인 상태 체크 후 내용 출력 */}
        {isLogin ? (
          <>
            <li>
              <Link to="/todo/">Todo</Link>
            </li>
            <li>
              <Link to="/product/">Product</Link>
            </li>
          </>
        ) : null}
      </ul>

      {/* 로그인 / 로그아웃버튼  */}
      <div>
        {isLogin ? (
          <Link to="/member/logout">로그아웃</Link>
        ) : (
          <Link to="/member/login">로그인</Link>
        )}
      </div>
    </nav>
  );
};

export default BasicMenu;
```

## 4. 컴포넌트 배치

- /src/pages/forms/FormPage.js

```js
import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import FormComponent from "../../components/forms/FormComponent";

const FormPage = () => {
  return (
    <BasicLayout>
      <h1>FormPage</h1>
      <FormComponent />
    </BasicLayout>
  );
};

export default FormPage;
```

## 5. 폼 컴포넌트 진행

- 폼의 초기 기본 값 셋팅하기
- 값 검증(오류, 형식, 길이......)
- 폼 이벤트 (완료 전송등..)
- Daum Post 설치 후 주소검색
- react-hook-form / yup
  : 실무활용, 리액트 폼 성능개선, 디자인 자유롭다
- React-Quill 에디터 작성
- React-Quill 이미지 업로드 붙이기

### 5.1. 폼의 초기 기본 값 셋팅하기

- 반드시 Form 컴포넌트 안에 있어야 해요.

```js
<Form
  initialValues={{
    Input: "안녕하세요.",
  }}
></Form>
```

- 반드시 Form.Item 컴포넌트에 이름(name)이 있어야 한다.
- 반드시 Form.Item 컴포넌트안에 컴포넌트 배치한다.

```js
import { Button, Form, Input } from "antd";
import React from "react";

const FormComponent = () => (
  <Form
    style={{ width: "600px" }}
    initialValues={{
      userid: "홍길동",
      userpass: 1234,
      nickname: "닉네임",
      email: "aaa@aaa.net",
    }}
  >
    <Form.Item name="userid">
      <Input />
    </Form.Item>
    <Form.Item name="userpass">
      <Input.Password />
    </Form.Item>
    <Form.Item name="nickname">
      <Input />
    </Form.Item>
    <Form.Item name="email">
      <Input />
    </Form.Item>
    <Form.Item>
      <Button>확인</Button>
    </Form.Item>
  </Form>
);
export default FormComponent;
```

### 5.2. 폼 요소의 각 입력중인 값 알아내기

- onFieldsChange 활용

```js
import { Button, Form, Input } from "antd";
import React from "react";

// 현재 입력되고있는 필드명, 필드값 출력
const onChangeFiled = (_필드, _필드값) => {
  console.log(_필드, _필드값);
};
const FormComponent = () => (
  <Form
    style={{ width: "600px" }}
    initialValues={{
      userid: "홍길동",
      userpass: 1234,
      nickname: "닉네임",
      email: "aaa@aaa.net",
    }}
    onFieldsChange={(changedFields, allFields) => {
      onChangeFiled(changedFields[0].name, changedFields[0].value);
      //console.log(allFields);
    }}
  >
    <Form.Item name="userid">
      <Input />
    </Form.Item>
    <Form.Item name="userpass">
      <Input.Password />
    </Form.Item>
    <Form.Item name="nickname">
      <Input />
    </Form.Item>
    <Form.Item name="email">
      <Input />
    </Form.Item>
    <Form.Item>
      <Button>확인</Button>
    </Form.Item>
  </Form>
);
export default FormComponent;
```

### 5.3. 확인 버튼 선택시 전체 폼의 입력 값 알아내기

- onFinish
- <Button htmlType="submit">확인</Button>

```js
import { Button, Form, Input } from "antd";
import React from "react";

// 현재 입력되고있는 필드명, 필드값 출력
const onChangeFiled = (_필드, _필드값) => {
  console.log(_필드, _필드값);
};
// 확인 버튼 선택시 전체 값 출력(json 형태)
const onFinshed = _전체값 => {
  console.log(_전체값);
};
const FormComponent = () => (
  <Form
    style={{ width: "600px" }}
    initialValues={{
      userid: "홍길동",
      userpass: 1234,
      nickname: "닉네임",
      email: "aaa@aaa.net",
    }}
    onFieldsChange={(changedFields, allFields) => {
      // onChangeFiled(changedFields[0].name, changedFields[0].value);
      //console.log(allFields);
    }}
    onFinish={values => {
      onFinshed(values);
    }}
  >
    <Form.Item name="userid">
      <Input />
    </Form.Item>
    <Form.Item name="userpass">
      <Input.Password />
    </Form.Item>
    <Form.Item name="nickname">
      <Input />
    </Form.Item>
    <Form.Item name="email">
      <Input />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit">확인</Button>
    </Form.Item>
  </Form>
);
export default FormComponent;
```

### 5.4. 필드 입력 변경시 입력 값 알아내기

- onValuesChange

```js
import { Button, Form, Input } from "antd";
import React from "react";

// 현재 입력되고있는 필드명, 필드값 출력
const onChangeFiled = (_필드, _필드값) => {
  console.log(_필드, _필드값);
};
// 확인 버튼 선택시 전체 값 출력(json 형태)
const onFinshed = _전체값 => {
  console.log(_전체값);
};
// 사용자 입력시 변경된 값 출력
const onValuesChanged = (_필드값, _전체값) => {
  console.log(_필드값);
  console.log(_전체값);
};
const FormComponent = () => (
  <Form
    style={{ width: "600px" }}
    initialValues={{
      userid: "홍길동",
      userpass: 1234,
      nickname: "닉네임",
      email: "aaa@aaa.net",
    }}
    onFieldsChange={(changedFields, allFields) => {
      // onChangeFiled(changedFields[0].name, changedFields[0].value);
      //console.log(allFields);
    }}
    onFinish={values => {
      onFinshed(values);
    }}
    onValuesChange={(changedValues, allValues) => {
      onValuesChanged(changedValues, allValues);
      // console.log(changedValues);
      // console.log(allValues);
    }}
  >
    <Form.Item name="userid">
      <Input />
    </Form.Item>
    <Form.Item name="userpass">
      <Input.Password />
    </Form.Item>
    <Form.Item name="nickname">
      <Input />
    </Form.Item>
    <Form.Item name="email">
      <Input />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit">확인</Button>
    </Form.Item>
  </Form>
);
export default FormComponent;
```

### 5.5. 확인 버튼 클릭시 오류 알아내기

- onFinishFailed

```js
import { Button, Form, Input } from "antd";
import React from "react";

// 현재 입력되고있는 필드명, 필드값 출력
const onChangeFiled = (_필드, _필드값) => {
  console.log(_필드, _필드값);
};
// 확인 버튼 선택시 전체 값 출력(json 형태)
const onFinshed = _전체값 => {
  console.log(_전체값);
};
// 사용자 입력시 변경된 값 출력
const onValuesChanged = (_필드값, _전체값) => {
  console.log(_필드값);
  console.log(_전체값);
};
const FormComponent = () => (
  <Form
    style={{ width: "600px" }}
    initialValues={{
      userid: "홍길동",
      userpass: 1234,
      nickname: "닉네임",
      email: "aaa@aaa.net",
    }}
    onFieldsChange={(changedFields, allFields) => {
      // onChangeFiled(changedFields[0].name, changedFields[0].value);
      //console.log(allFields);
    }}
    onFinish={values => {
      onFinshed(values);
    }}
    onValuesChange={(changedValues, allValues) => {
      onValuesChanged(changedValues, allValues);
      // console.log(changedValues);
      // console.log(allValues);
    }}
    onFinishFailed={({ values, errorFields, outOfDate }) => {
      console.log("onFinishFailed", values, errorFields, outOfDate);
    }}
  >
    <Form.Item name="userid">
      <Input />
    </Form.Item>
    <Form.Item name="userpass">
      <Input.Password />
    </Form.Item>
    <Form.Item name="nickname">
      <Input />
    </Form.Item>
    <Form.Item name="email">
      <Input />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit">확인</Button>
    </Form.Item>
  </Form>
);
export default FormComponent;
```

### 5.6. useState 연동하기

- 변경전

```js
import { Button, Form, Input } from "antd";
import React, { useState } from "react";

// 현재 입력되고있는 필드명, 필드값 출력
const onChangeFiled = (_필드, _필드값) => {
  console.log(_필드, _필드값);
};
// 확인 버튼 선택시 전체 값 출력(json 형태)
const onFinshed = _전체값 => {
  console.log(_전체값);
};
// 사용자 입력시 변경된 값 출력
const onValuesChanged = (_필드값, _전체값) => {
  console.log(_필드값);
  console.log(_전체값);
};
// 초기값
const initState = {
  userid: "",
  userpass: "",
  nickname: "",
  email: "",
};
const FormComponent = () => {
  const [userInfo, setUserInfo] = useState(initState);
  return (
    <Form
      style={{ width: "600px" }}
      initialValues={{
        userid: "홍길동",
        userpass: 1234,
        nickname: "닉네임",
        email: "aaa@aaa.net",
      }}
      onFieldsChange={(changedFields, allFields) => {
        // onChangeFiled(changedFields[0].name, changedFields[0].value);
        //console.log(allFields);
      }}
      onFinish={values => {
        onFinshed(values);
      }}
      onValuesChange={(changedValues, allValues) => {
        onValuesChanged(changedValues, allValues);
        // console.log(changedValues);
        // console.log(allValues);
      }}
      onFinishFailed={({ values, errorFields, outOfDate }) => {
        console.log("onFinishFailed", values, errorFields, outOfDate);
      }}
    >
      <Form.Item name="userid">
        <Input />
      </Form.Item>
      <Form.Item name="userpass">
        <Input.Password />
      </Form.Item>
      <Form.Item name="nickname">
        <Input />
      </Form.Item>
      <Form.Item name="email">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">확인</Button>
      </Form.Item>
    </Form>
  );
};
export default FormComponent;
```

- 초기값 사용하기

```js
import { Button, Form, Input } from "antd";
import React, { useState } from "react";

// 현재 입력되고있는 필드명, 필드값 출력
const onChangeFiled = (_필드, _필드값) => {
  console.log(_필드, _필드값);
};
// 확인 버튼 선택시 전체 값 출력(json 형태)
const onFinshed = _전체값 => {
  console.log(_전체값);
};
// 사용자 입력시 변경된 값 출력
const onValuesChanged = (_필드값, _전체값) => {
  console.log(_필드값);
  console.log(_전체값);
};
// 초기값
const initState = {
  userid: "",
  userpass: "",
  nickname: "",
  email: "",
};
const FormComponent = () => {
  const [userInfo, setUserInfo] = useState(initState);
  return (
    <Form
      style={{ width: "600px" }}
      initialValues={{
        userid: userInfo.userid,
        userpass: userInfo.userpass,
        nickname: userInfo.nickname,
        email: userInfo.email,
      }}
      onFieldsChange={(changedFields, allFields) => {
        // onChangeFiled(changedFields[0].name, changedFields[0].value);
        //console.log(allFields);
      }}
      onFinish={values => {
        onFinshed(values);
      }}
      onValuesChange={(changedValues, allValues) => {
        onValuesChanged(changedValues, allValues);
        // console.log(changedValues);
        // console.log(allValues);
      }}
      onFinishFailed={({ values, errorFields, outOfDate }) => {
        console.log("onFinishFailed", values, errorFields, outOfDate);
      }}
    >
      <Form.Item name="userid">
        <Input />
      </Form.Item>
      <Form.Item name="userpass">
        <Input.Password />
      </Form.Item>
      <Form.Item name="nickname">
        <Input />
      </Form.Item>
      <Form.Item name="email">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">확인</Button>
      </Form.Item>
    </Form>
  );
};
export default FormComponent;
```

- 내용입력시 state set하기
  : onValuesChange 활용 추천

  ```js
  const onValuesChanged = (_필드값, _전체값) => {
    // console.log(_필드값);
    // console.log(_전체값);
    setUserInfo({ ..._전체값 });
  };
  ```

  ```js
  import { Button, Form, Input } from "antd";
  import React, { useState } from "react";

  // 초기값
  const initState = {
    userid: "",
    userpass: "",
    nickname: "",
    email: "",
  };
  const FormComponent = () => {
    const [userInfo, setUserInfo] = useState(initState);

    // 현재 입력되고있는 필드명, 필드값 출력
    const onChangeFiled = (_필드, _필드값) => {
      // console.log(_필드, _필드값);
    };
    // 확인 버튼 선택시 전체 값 출력(json 형태)
    const onFinshed = _전체값 => {
      console.log(_전체값);
    };
    // 사용자 입력시 변경된 값 출력
    const onValuesChanged = (_필드값, _전체값) => {
      // console.log(_필드값);
      // console.log(_전체값);
      setUserInfo({ ..._전체값 });
    };

    return (
      <Form
        style={{ width: "600px" }}
        initialValues={{
          userid: userInfo.userid,
          userpass: userInfo.userpass,
          nickname: userInfo.nickname,
          email: userInfo.email,
        }}
        onFieldsChange={(changedFields, allFields) => {
          // onChangeFiled(changedFields[0].name, changedFields[0].value);
          //console.log(allFields);
        }}
        onFinish={values => {
          onFinshed(values);
        }}
        onValuesChange={(changedValues, allValues) => {
          onValuesChanged(changedValues, allValues);
          // console.log(changedValues);
          // console.log(allValues);
        }}
        onFinishFailed={({ values, errorFields, outOfDate }) => {
          console.log("onFinishFailed", values, errorFields, outOfDate);
        }}
      >
        <Form.Item name="userid">
          <Input />
        </Form.Item>
        <Form.Item name="userpass">
          <Input.Password />
        </Form.Item>
        <Form.Item name="nickname">
          <Input />
        </Form.Item>
        <Form.Item name="email">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">확인</Button>
        </Form.Item>
      </Form>
    );
  };
  export default FormComponent;
  ```

- 확인 버튼 선택시 state set하기

```js
import { Button, Form, Input } from "antd";
import React, { useState } from "react";

// 초기값
const initState = {
  userid: "",
  userpass: "",
  nickname: "",
  email: "",
};
const FormComponent = () => {
  const [userInfo, setUserInfo] = useState(initState);

  // 현재 입력되고있는 필드명, 필드값 출력
  const onChangeFiled = (_필드, _필드값) => {
    // console.log(_필드, _필드값);
  };
  // 확인 버튼 선택시 전체 값 출력(json 형태)
  const onFinshed = _전체값 => {
    console.log("전체값", _전체값);
    setUserInfo({ ..._전체값 });
  };
  // 사용자 입력시 변경된 값 출력
  const onValuesChanged = (_필드값, _전체값) => {
    // console.log(_필드값);
    // console.log(_전체값);
    setUserInfo({ ..._전체값 });
  };

  return (
    <Form
      style={{ width: "600px" }}
      initialValues={{
        userid: userInfo.userid,
        userpass: userInfo.userpass,
        nickname: userInfo.nickname,
        email: userInfo.email,
      }}
      onFieldsChange={(changedFields, allFields) => {
        // onChangeFiled(changedFields[0].name, changedFields[0].value);
        //console.log(allFields);
      }}
      onFinish={values => {
        onFinshed(values);
      }}
      onValuesChange={(changedValues, allValues) => {
        onValuesChanged(changedValues, allValues);
        // console.log(changedValues);
        // console.log(allValues);
      }}
      onFinishFailed={({ values, errorFields, outOfDate }) => {
        console.log("onFinishFailed", values, errorFields, outOfDate);
      }}
    >
      <Form.Item name="userid">
        <Input />
      </Form.Item>
      <Form.Item name="userpass">
        <Input.Password />
      </Form.Item>
      <Form.Item name="nickname">
        <Input />
      </Form.Item>
      <Form.Item name="email">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">확인</Button>
      </Form.Item>
    </Form>
  );
};
export default FormComponent;
```

## 6. Form.Item 활용하기

### 6.1. label 붙이기

```js
 <Form.Item name="userid" label="아이디">
        <Input />
      </Form.Item>
      <Form.Item name="userpass" label="비밀번호">
        <Input.Password />
      </Form.Item>
      <Form.Item name="nickname" label="별칭">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="이메일">
        <Input />
      </Form.Item>
      <Form.Item label="필요없을 듯">
        <Button htmlType="submit">확인</Button>
      </Form.Item>
```

### 6.2. placeholder 출력하기(값 비었을 때)

```js
<Form.Item name="userid" label="아이디">
        <Input placeholder="아이디를 입력하세요." />
      </Form.Item>
      <Form.Item name="userpass" label="비밀번호">
        <Input.Password placeholder="비밀번호를 입력하세요." />
      </Form.Item>
      <Form.Item name="nickname" label="별칭">
        <Input placeholder="별칭을 입력하세요." />
      </Form.Item>
      <Form.Item name="email" label="이메일">
        <Input placeholder="이메일을 입력하세요." />
      </Form.Item>
      <Form.Item label="필요없을 듯">
        <Button htmlType="submit">확인</Button>
      </Form.Item>
```

### 6.3. 필수값 표현하기

```js
  <Form.Item name="userid" label="아이디" required={true}>
    <Input placeholder="아이디를 입력하세요." />
  </Form.Item>
  <Form.Item name="userpass" label="비밀번호" required={true}>
    <Input.Password placeholder="비밀번호를 입력하세요." />
  </Form.Item>
  <Form.Item name="nickname" label="별칭">
    <Input placeholder="별칭을 입력하세요." />
  </Form.Item>
  <Form.Item name="email" label="이메일" required={true}>
    <Input placeholder="이메일을 입력하세요." />
  </Form.Item>
  <Form.Item label="필요없을 듯">
    <Button htmlType="submit">확인</Button>
  </Form.Item>
```

### 6.4. 필수값 표현 및 안내메시지 보여주기

```js
<Form.Item
        name="userid"
        label="아이디"
        rules={[
          { required: true, message: "아이디는 필수항목입니다." },
          // {
          //   pattern: /^[\s]/,
          //   message: "공백만 입력하시면 안됩니다.",
          // },
          {
            min: 4,
            message: "아이디는 4자 이상 입력하세요.",
          },
          {
            max: 8,
            message: "아이디는 8자 이하로 입력하세요.",
          },
        ]}
      >
        <Input placeholder="아이디를 입력하세요." />
      </Form.Item>
      <Form.Item
        name="userpass"
        label="비밀번호"
        rules={[{ required: true, message: "비밀번호는 필수항목입니다." }]}
      >
        <Input.Password placeholder="비밀번호를 입력하세요." />
      </Form.Item>
      <Form.Item name="nickname" label="별칭" rules={[]}>
        <Input placeholder="별칭을 입력하세요." />
      </Form.Item>
      <Form.Item
        name="email"
        label="이메일"
        rules={[
          { required: true, message: "이메일은 필수항목입니다." },
          { type: "email", message: "이메일 형식에 맞지않습니다." },
        ]}
      >
        <Input placeholder="이메일을 입력하세요." />
      </Form.Item>
      <Form.Item label="필요없을 듯">
        <Button htmlType="submit">확인</Button>
      </Form.Item>
```
