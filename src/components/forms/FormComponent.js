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
    </Form>
  );
};
export default FormComponent;
