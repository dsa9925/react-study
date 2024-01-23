# react-hook-form

- [react-hook-form](https://www.react-hook-form.com/)
- `npm install react-hook-form`
- Ant Design 은 관리자 쪽만 활용
  : 커스터마이징 힘듭니다. (디자이너와 협업 어렵다)
  : 주어진 대로 활용해야 한다.

## 1. 기본코드

```js
import React from "react";

const FormComponent = () => {
  const handleSubmit = e => {
    // 새로 고침 막기
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" name="userid" />
        <br />
        <input type="password" name="userpass" />
        <br />
        <input type="email" name="useremail" />
        <br />
        <textarea name="usermemo"></textarea>
        <br />
        <button>확인</button>
      </form>
    </>
  );
};

export default FormComponent;
```

## 2. useState 적용하기

```js
import React from "react";
import { useState } from "react";

// 초기값
const initState = {
  userid: "",
  userpass: "",
  useremail: "",
  usermemo: "",
};

const FormComponent = () => {
  const [userInfo, setUserInfo] = useState(initState);
  const handleSubmit = e => {
    // 새로 고침 막기
    e.preventDefault();
  };
  const handleChange = e => {
    // e.target.name, e.target.value
    userInfo[e.target.name] = e.target.value;
    setUserInfo({ ...userInfo });
  };
  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          name="userid"
          value={userInfo.userid}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="password"
          name="userpass"
          value={userInfo.userpass}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="email"
          name="useremail"
          value={userInfo.useremail}
          onChange={e => handleChange(e)}
        />
        <br />
        <textarea
          name="usermemo"
          value={userInfo.useremail}
          onChange={e => handleChange(e)}
        ></textarea>
        <br />
        <button>확인</button>
      </form>
    </>
  );
};

export default FormComponent;
```

## 3. 심각한 문제 발생 (리 랜더링 문제)

- 특별한 경우가 아니면 useState 활요
- 실무적으로 가면 문제가 되요.
- 디자인 적용시에 Ant Design 문제
  : 디자인 편하고, 검증 코드(yup)도 쉽게 활용
- react-hook-form 을 사용

## 4. react-hook-form 적용

- form 의 입력요소의 name을 읽거나 작성하기

```js
import React from "react";
import { useForm } from "react-hook-form";

// 초기값
const initState = {
  userid: "",
  userpass: "",
  useremail: "",
  usermemo: "",
};

const FormComponent = () => {
  console.log("리랜더링");
  // 1. useForm 을 활용
  // register 는 폼의 name 값 셋팅 및 읽기기능
  const { register } = useForm();

  const handleSubmit = e => {
    // 새로 고침 막기
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" {...register("userid")} />
        <br />
        <input type="password" {...register("userpass")} />
        <br />
        <input type="email" {...register("useremail")} />
        <br />
        <textarea {...register("usermemo")}></textarea>
        <br />
        <button>확인</button>
      </form>
    </>
  );
};

export default FormComponent;
```

### 4.1. 완료시 데이터 출력

```js
import React from "react";
import { useForm } from "react-hook-form";

// 초기값
const initState = {
  userid: "",
  userpass: "",
  useremail: "",
  usermemo: "",
};

const FormComponent = () => {
  console.log("리랜더링");
  // 1. useForm 을 활용
  // register 는 폼의 name 값 셋팅 및 읽기기능
  // handleSubmit 은 폼의 상태 변화 및 완료시 실행이 됩니다.
  const { register, handleSubmit } = useForm();

  // 확인 버튼 선택시 실행
  const handleSubmitMy = data => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitMy)}>
        <input type="text" {...register("userid")} />
        <br />
        <input type="password" {...register("userpass")} />
        <br />
        <input type="email" {...register("useremail")} />
        <br />
        <textarea {...register("usermemo")}></textarea>
        <br />
        <button type="submit">확인</button>
      </form>
    </>
  );
};

export default FormComponent;
```

### 4.2. 초기값 셋팅

```js
import React from "react";
import { useForm } from "react-hook-form";

// 초기값
const initState = {
  userid: "",
  userpass: "",
  useremail: "",
  usermemo: "",
};

const FormComponent = () => {
  console.log("리랜더링");
  // 1. useForm 을 활용
  // register 는 폼의 name 값 셋팅 및 읽기기능
  // handleSubmit 은 폼의 상태 변화 및 완료시 실행이 됩니다.
  const { register, handleSubmit } = useForm({
    defaultValues: initState,
  });

  // 확인 버튼 선택시 실행
  const handleSubmitMy = data => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitMy)}>
        <input type="text" {...register("userid")} />
        <br />
        <input type="password" {...register("userpass")} />
        <br />
        <input type="email" {...register("useremail")} />
        <br />
        <textarea {...register("usermemo")}></textarea>
        <br />
        <button type="submit">확인</button>
      </form>
    </>
  );
};

export default FormComponent;
```

## 3. 폼의 값 검증 라이브러리 yup

- [yup](https://github.com/jquense/yup)
- `npm i yup`
- react-hook-form 에서 yup 을 사용하려면 추가 설치 필요
- [resolver](https://www.npmjs.com/package/@hookform/resolvers)
- `npm i @hookform/resolvers`

### 3.1. 기본 셋팅

```js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// 초기값
const initState = {
  userid: "",
  userpass: "",
  useremail: "",
  usermemo: "",
};

const FormComponent = () => {
  console.log("리랜더링");
  // 1. useForm 을 활용
  // register 는 폼의 name 값 셋팅 및 읽기기능
  // handleSubmit 은 폼의 상태 변화 및 완료시 실행이 됩니다.
  const { register, handleSubmit } = useForm({
    defaultValues: initState,
    resolver: yupResolver(),
  });

  // 확인 버튼 선택시 실행
  const handleSubmitMy = data => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitMy)}>
        <input type="text" {...register("userid")} />
        <br />
        <input type="password" {...register("userpass")} />
        <br />
        <input type="email" {...register("useremail")} />
        <br />
        <textarea {...register("usermemo")}></textarea>
        <br />
        <button type="submit">확인</button>
      </form>
    </>
  );
};

export default FormComponent;
```

### 3.2. 검증 코드 만들기

- [레퍼런스](https://www.react-hook-form.com/advanced-usage/#CustomHookwithResolver)

```js
import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 초기값
const initState = {
  userid: "",
  userpass: "",
  useremail: "",
  usermemo: "",
};

const FormComponent = () => {
  console.log("리랜더링");

  // yup 검증 코드
  const validationSchema = yup.object({
    userid: yup.string("내용을 입력하세요.").required("아이디는 필수입니다."),
    userpass: yup
      .string("내용을 입력하세요.")
      .required("비밀번호는 필수입니다.")
      .min("4자 이상 입력하세요.")
      .max(16, "16자까지만 입력하세요 "),
    useremail: yup
      .string("내용을 입력하세요.")
      .required("이메일은 필수입니다.")
      .email("이메일 형식에 맞지 않습니다"),
    usermemo: yup.string("내용을 입력하세요.").required("메모 필수입니다."),
  });

  // 1. useForm 을 활용
  // register 는 폼의 name 값 셋팅 및 읽기기능
  // handleSubmit 은 폼의 상태 변화 및 완료시 실행이 됩니다.
  const { register, handleSubmit } = useForm({
    defaultValues: initState,
    resolver: yupResolver(validationSchema),
  });

  // 확인 버튼 선택시 실행
  const handleSubmitMy = data => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitMy)}>
        <input type="text" {...register("userid")} />
        <br />
        <input type="password" {...register("userpass")} />
        <br />
        <input type="email" {...register("useremail")} />
        <br />
        <textarea {...register("usermemo")}></textarea>
        <br />
        <button type="submit">확인</button>
      </form>
    </>
  );
};

export default FormComponent;
```

### 3.3. 검증 코드 메시지 출력 시점

```js
const { register, handleSubmit, formState } = useForm({
  defaultValues: initState,
  resolver: yupResolver(validationSchema),
  mode: "onChange",
});
```

### 3.4. 최종 적용 코드

```js
import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 초기값
const initState = {
  userid: "",
  userpass: "",
  useremail: "",
  usermemo: "",
};

const FormComponent = () => {
  console.log("리랜더링");

  // yup 검증 코드
  const validationSchema = yup.object({
    userid: yup.string("내용을 입력하세요.").required("아이디는 필수입니다."),
    userpass: yup
      .string("내용을 입력하세요.")
      .required("비밀번호는 필수입니다.")
      .min(4, "4자 이상 입력하세요.")
      .max(16, "16자까지만 입력하세요 "),
    useremail: yup
      .string("내용을 입력하세요.")
      .required("이메일은 필수입니다.")
      .email("이메일 형식에 맞지 않습니다"),
    usermemo: yup.string("내용을 입력하세요.").required("메모 필수입니다."),
  });

  // 1. useForm 을 활용
  // register 는 폼의 name 값 셋팅 및 읽기기능
  // handleSubmit 은 폼의 상태 변화 및 완료시 실행이 됩니다.
  const { register, handleSubmit, formState } = useForm({
    defaultValues: initState,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  // 확인 버튼 선택시 실행
  const handleSubmitMy = data => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitMy)}>
        <input type="text" {...register("userid")} />
        <div style={{ color: "red" }}>{formState.errors.userid?.message}</div>
        <br />
        <input type="password" {...register("userpass")} />
        <div style={{ color: "red" }}>{formState.errors.userpass?.message}</div>
        <br />
        <input type="email" {...register("useremail")} />
        <div style={{ color: "red" }}>
          {formState.errors.useremail?.message}
        </div>
        <br />
        <textarea {...register("usermemo")}></textarea>
        <div style={{ color: "red" }}>{formState.errors.usermemo?.message}</div>
        <br />

        <div>
          모든 검증을 통과했는지 파악 : {formState.isValid ? "OK" : "NO"}
        </div>

        <button type="submit">확인</button>
      </form>
    </>
  );
};

export default FormComponent;
```
