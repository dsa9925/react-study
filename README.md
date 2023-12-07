# React 공부하기

## 9. Ant design

- [Ant.design](https://ant.design/)
- [Components](https://ant.design/components/overview/)
  : `npm install antd --save`
  : `npm install @ant-design/icons --save`
- 시간 관련 npm 설치
- [moment](https://momentjs.com/)
  : `npm install moment --save`
- [dayjs](https://day.js.org/)
  : `npm install dayjs`

## 코드샘플

- App.js
  : 반드시 API 의 common props 체크해 보자.

```js
import React from "react";
import { Button } from "antd";
const App = () => (
  <div>
    <Button type="primary" shape="circle">
      Primary Button
    </Button>
  </div>
);
export default App;
```

- style 적용하기(객체 리터럴 방식)

```js
import React from "react";
import { Button } from "antd";
// 이전 버전은 5.4 이전은 css 를 직접 수정가능
// import 'antd/dist/antd.css';
// 현재 최신 버전을 설치한경우

const App = () => {
  const btStyle = {
    backgroundColor: "red",
    color: "yellow",
  };

  return (
    <div>
      <Button type="primary" shape="circle" style={btStyle}>
        Primary Button
      </Button>
    </div>
  );
};
export default App;
```

- class 적용하기(안되면 !important)
  : App.css

```css
.bg {
  background: green !important;
}
```

: App.js

```js
import React from "react";
import { Button } from "antd";
// 이전 버전은 5.4 이전은 css 를 직접 수정가능
// import 'antd/dist/antd.css';
// 현재 최신 버전을 설치한경우
import "./App.css";

const App = () => {
  const btStyle = {
    backgroundColor: "red",
    color: "yellow",
  };

  return (
    <div>
      <Button type="primary" shape="circle" style={btStyle} className="bg">
        Primary Button
      </Button>
    </div>
  );
};
export default App;
```

- Ant 컴포넌트 에 styled 적용하기

```js
import React from "react";
import { Button } from "antd";
import styled from "@emotion/styled";

const App = () => {
  // 태그인 경우
  const MyDiv = styled.div`
    background-color: hotpink;
  `;
  // Ant 또는 컴포넌트인 경우
  const MyButton = styled(Button)`
    background-color: yellowgreen;
  `;
  return (
    <MyDiv>
      <MyButton type="primary">Primary Button</MyButton>
    </MyDiv>
  );
};
export default App;
```

- Emotion 에 props 전달하기

```js
import React from "react";
import { Button } from "antd";
import styled from "@emotion/styled";

const App = () => {
  // 태그인 경우 (백틱이므로  ${ }   )
  const MyDiv = styled.div`
    background-color: ${props => {
      return props.aaa;
    }};
  `;
  // Ant 또는 컴포넌트인 경우
  const MyButton = styled(Button)`
    background-color: ${props => {
      return props.bbb;
    }};
  `;

  /* background-color: ${(props) =>  return props.aaa}; */
  /* background-color: ${(props) =>  props.aaa}; */

  return (
    <MyDiv aaa="hotpink">
      <MyButton type="primary" bbb="yellowgreen">
        Primary Button
      </MyButton>
    </MyDiv>
  );
};
export default App;
```

- icon 적용 및 변경하기 (https://ant.design/components/icon)

```js
import React from "react";
import { Button } from "antd";
import styled from "@emotion/styled";

const App = () => {
  // Ant 또는 컴포넌트인 경우
  const MyButton = styled(Button)`
    background-color: ${props => {
      return props.bbb;
    }};
  `;

  return (
    <div>
      {/* styled 적용 */}
      <MyButton type="primary" bbb="yellowgreen">
        Primary Button
      </MyButton>

      {/* Ant 오리지널 */}
      <Button type="primary">버튼</Button>
    </div>
  );
};
export default App;
```

- 수정된 내용

```js
import React from "react";
import { Button } from "antd";
import styled from "@emotion/styled";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";

const App = () => {
  // Ant 또는 컴포넌트인 경우
  const MyButton = styled(Button)`
    background-color: ${props => {
      return props.bbb;
    }};
  `;

  return (
    <div>
      {/* styled 적용 */}
      <MyButton type="primary" bbb="yellowgreen" icon={<AppleOutlined />}>
        Primary Button
      </MyButton>

      {/* Ant 오리지널 */}
      <Button type="primary" icon={<AndroidOutlined />}>
        버튼
      </Button>
    </div>
  );
};
export default App;
```

```js
import React from "react";
import { Button } from "antd";
import styled from "@emotion/styled";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";

const MyComButton = props => {
  return (
    <button
      onClick={() => {
        props.say();
      }}
    >
      {props.children} {props.txt}
    </button>
  );
};

const App = () => {
  // Ant 또는 컴포넌트인 경우
  const MyButton = styled(Button)`
    background-color: ${props => {
      return props.bbb;
    }};
  `;

  // 전달할 기능
  const say = () => {
    alert("안녕하세요.");
  };
  const hello = () => {
    alert("Hello");
  };
  const 울라라 = () => {
    alert("울라라라");
  };
  return (
    <div>
      <MyComButton txt="안녕" say={say}>
        <AppleOutlined />
      </MyComButton>

      <MyComButton txt="로그인하세요." say={hello}>
        <AppleOutlined />
      </MyComButton>

      <MyComButton txt="가입하세요" say={울라라}>
        <AndroidOutlined />
      </MyComButton>
    </div>
  );
};
export default App;
```

- props 객체 구조 분해 할당 적용하기

```js
import React from "react";
import { Button } from "antd";
import styled from "@emotion/styled";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";

const MyComButton = ({ say, txt, children }) => {
  return (
    <button
      onClick={() => {
        say();
      }}
    >
      {children} {txt}
    </button>
  );
};

const App = () => {
  // Ant 또는 컴포넌트인 경우
  const MyButton = styled(Button)`
    background-color: ${props => {
      return props.bbb;
    }};
  `;

  // 전달할 기능
  const say = () => {
    alert("안녕하세요.");
  };
  const hello = () => {
    alert("Hello");
  };
  const 울라라 = () => {
    alert("울라라라");
  };
  return (
    <div>
      <MyComButton txt="안녕" say={say}>
        <AppleOutlined />
      </MyComButton>

      <MyComButton txt="로그인하세요." say={hello}>
        <AppleOutlined />
      </MyComButton>

      <MyComButton txt="가입하세요" say={울라라}>
        <AndroidOutlined />
      </MyComButton>
    </div>
  );
};
export default App;
```

## Form의 이해(https://ant.design/components/form)

```js
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const onFinish = values => {
  // 데이터 모아서 전송하는 자리
  // onSubmit 이벤트 자리
  console.log("Success:", values);
};

const onFinishFailed = errorInfo => {
  // Error 처리하기
  console.log("Failed:", errorInfo);
};

const App = () => (
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
      username: "hohoho",
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: "Please input your username!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: "제발 이메일 좀 넣어주세요.",
        },
        {
          type: "email",
          message: "이메일형식으로 넣어야 해요",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: "Please input your password!",
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default App;
```

### Calendar의 이해(https://ant.design/components/calendar)

```js
import React from "react";
import { Calendar } from "antd";
const App = () => {
  const onPanelChange = (value, mode) => {
    console.log(value);
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  // function(date: Dayjs)
  const onChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD HH:mm:ss"));
  };
  return <Calendar onPanelChange={onPanelChange} onChange={onChange} />;
};
export default App;
```

- 특정 날짜 제한

```js
import React from "react";
import { Calendar } from "antd";
import dayjs from "dayjs";
const App = () => {
  const onPanelChange = (value, mode) => {
    console.log(value);
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  // function(date: Dayjs)
  const onChange = value => {
    console.log(value.format("YYYY-MM-DD HH-mm-ss"));
  };
  // 특정기간 만 가능
  const limitDay = [dayjs("2023-12-23"), dayjs("2023-12-26")];
  return (
    <Calendar
      onPanelChange={onPanelChange}
      onChange={onChange}
      validRange={limitDay}
    />
  );
};
export default App;
```

- 일정 출력하기

```js
import React from "react";
import { Badge, Calendar } from "antd";
const getListData = value => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event......",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = value => {
  if (value.month() === 8) {
    return 1394;
  }
};
const App = () => {
  const monthCellRender = value => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = value => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    console.log(current.format("YYYY-MM-DD"));
    console.log(info);
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return <Calendar cellRender={cellRender} />;
};
export default App;
```

## DatePicker (일정설정 달력)

```js
import React from "react";
import { DatePicker, Space } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const App = () => (
  <Space direction="vertical" size={12}>
    <RangePicker />
    <RangePicker
      open={true}
      disabled
      defaultValue={[
        dayjs("2023-12-20", "YYY-MM-DD"),
        dayjs("2023-12-26", "YYY-MM-DD"),
      ]}
    />
  </Space>
);
export default App;
```
