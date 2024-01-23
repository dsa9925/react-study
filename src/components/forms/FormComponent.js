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
