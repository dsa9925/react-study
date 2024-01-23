# AntDesign Form / Daum Post 활용

## Daum Post 활용 (우편번호/주소)

- [Daum Post](https://www.npmjs.com/package/react-daum-postcode)
- `npm install react-daum-postcode`

```js
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

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
    // console.log("전체값", _전체값);
    const sendData = { ..._전체값, zonecode: zone, address: adr };
    setUserInfo(sendData);
  };
  // 사용자 입력시 변경된 값 출력
  const onValuesChanged = (_필드값, _전체값) => {
    // console.log(_필드값);
    // console.log(_전체값);
    const sendData = { ..._전체값, zonecode: zone, address: adr };
    setUserInfo(sendData);
  };

  // Daum Post 관련
  const handleComplete = data => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // 우편번호
    const zoneCode = data.zonecode;
    // 기본주소
    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    // console.log(zoneCode); // 우편번호

    setZone(zoneCode);
    setAdr(fullAddress);
  };
  // 우편번호
  const [zone, setZone] = useState("");
  // 주소
  const [adr, setAdr] = useState("");

  return (
    <>
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

        <Form.Item label="우편번호" name="zonecode" valuePropName="zone">
          <Input disabled value={zone} />
        </Form.Item>
        <Form.Item label="주소" name="address" valuePropName="adr">
          <Input disabled value={adr} />
        </Form.Item>

        <Form.Item label="상세주소" name="address2">
          <Input />
        </Form.Item>

        <Form.Item label="필요없을 듯">
          <Button htmlType="submit">확인</Button>
        </Form.Item>
      </Form>

      {/* Daum Post */}
      <div>
        <DaumPostcodeEmbed onComplete={handleComplete} />;
      </div>
    </>
  );
};
export default FormComponent;
```

## Daum Post 모달창 CSS 해보기

```js
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

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
    // console.log("전체값", _전체값);
    const sendData = { ..._전체값, zonecode: zone, address: adr };
    setUserInfo(sendData);
  };
  // 사용자 입력시 변경된 값 출력
  const onValuesChanged = (_필드값, _전체값) => {
    // console.log(_필드값);
    // console.log(_전체값);
    const sendData = { ..._전체값, zonecode: zone, address: adr };
    setUserInfo(sendData);
  };

  // Daum Post 관련
  const [isOpen, setInOpen] = useState(false);

  const handleComplete = data => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // 우편번호
    const zoneCode = data.zonecode;
    // 기본주소
    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    // console.log(zoneCode); // 우편번호

    setZone(zoneCode);
    setAdr(fullAddress);
    setInOpen(false);
  };
  // 우편번호
  const [zone, setZone] = useState("");
  // 주소
  const [adr, setAdr] = useState("");

  return (
    <>
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

        <Form.Item label="우편번호" name="zonecode" valuePropName="zone">
          <Input disabled value={zone} />
        </Form.Item>
        <Form.Item label="주소" name="address" valuePropName="adr">
          <Input disabled value={adr} />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => setInOpen(true)}>우편번호찾기</Button>
        </Form.Item>

        <Form.Item label="상세주소" name="address2">
          <Input />
        </Form.Item>

        <Form.Item label="필요없을 듯">
          <Button htmlType="submit">확인</Button>
        </Form.Item>
      </Form>

      {/* Daum Post */}
      {isOpen ? (
        <div
          style={{
            position: "fixed",
            zIndex: 999,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.7)",
            left: 0,
            top: 0,
          }}
        >
          <DaumPostcodeEmbed onComplete={handleComplete} />;
        </div>
      ) : null}
    </>
  );
};
export default FormComponent;
```

## Daum Post Ant 모달 적용하기

- 다음포스트는 새로 생성이 안됩니다.
- 참고 사항 (Ant 디자인 모달 창 하단 버튼 없애기)
  : footer={[]}

```js
<Modal open={isOpen} footer={[]}>
  <DaumPostcode onComplete={handleComplete} />
</Modal>
```

```js
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

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
    // console.log("전체값", _전체값);
    const sendData = { ..._전체값, zonecode: zone, address: adr };
    setUserInfo(sendData);
  };
  // 사용자 입력시 변경된 값 출력
  const onValuesChanged = (_필드값, _전체값) => {
    // console.log(_필드값);
    // console.log(_전체값);
    const sendData = { ..._전체값, zonecode: zone, address: adr };
    setUserInfo(sendData);
  };

  // Daum Post 관련
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = data => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // 우편번호
    const zoneCode = data.zonecode;
    // 기본주소
    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    // console.log(zoneCode); // 우편번호

    setZone(zoneCode);
    setAdr(fullAddress);
    setIsOpen(false);
  };
  // 우편번호
  const [zone, setZone] = useState("");
  // 주소
  const [adr, setAdr] = useState("");

  return (
    <>
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

        <Form.Item label="우편번호" name="zonecode" valuePropName="zone">
          <Input disabled value={zone} />
        </Form.Item>
        <Form.Item label="주소" name="address" valuePropName="adr">
          <Input disabled value={adr} />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => setIsOpen(true)}>우편번호찾기</Button>
        </Form.Item>

        <Form.Item label="상세주소" name="address2">
          <Input />
        </Form.Item>

        <Form.Item label="필요없을 듯">
          <Button htmlType="submit">확인</Button>
        </Form.Item>
      </Form>

      {/* Daum Post */}
      {isOpen ? (
        <div>
          <Modal open={true} footer={[]}>
            <DaumPostcode onComplete={handleComplete} />
          </Modal>
        </div>
      ) : null}
    </>
  );
};
export default FormComponent;
```
