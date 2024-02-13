# react-quill ( WYSIWYG Editor)

- [CKEditor](https://ckeditor.com/)
- [Toast Editor(npm 말고 yarn 설치)](https://ui.toast.com/tui-editor)
- [react-quill](https://quilljs.com/)
- [github](https://www.npmjs.com/package/react-quill)

## 1. 설치 및 초기화

- `npm i react-quill`

```js
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FormComponent = () => {
  return (
    <div>
      <div>
        <ReactQuill />
      </div>
    </div>
  );
};

export default FormComponent;
```

## 2. 출력결과 필요

- 실제로 입력되는 값은 html 태그 형식입니다.
- 내용이 없을 때는 <br> 태그 들어갑니다.

```js
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FormComponent = () => {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <div>
        <ReactQuill onChange={setValue} />
      </div>
      <div>{value}</div>
    </div>
  );
};

export default FormComponent;
```

## 3. 위험한 태그(크로스 사이트 스크립트(XSS)) 막아주기

- 추가 설치해 주어야 하는 라이브러리
- [dumprify](https://www.npmjs.com/package/dompurify)
- `npm i dompurify`

```js
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const FormComponent = () => {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <div>
        <ReactQuill onChange={setValue} />
      </div>
      <h2>내용 출력 하기</h2>
      <div>{value}</div>
      <div dangerouslySetInnerHTML={{ __html: value }} />
      ! 올바르게 html 출력하는 방법 !
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
    </div>
  );
};

export default FormComponent;
```

## 4. 옵션(모듈)들

- toolbar : 에디터에서 사용할 툴바 목록 설정
- useMemo : 렌더링 될때 마다 입력이 끊기는 버그를 해결

```js
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const FormComponent = () => {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],
        ["image", "video"],
        ["clean"],
      ],
    },
  };

  return (
    <div>
      <div>
        <ReactQuill onChange={setValue} modules={modules} />
      </div>
      <h2>내용 출력 하기</h2>
      <div>{value}</div>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
    </div>
  );
};

export default FormComponent;
```

## 5. 핸들러 활용하기

```js
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const FormComponent = () => {
  // 1. React Quill 태그 를 저장한다.
  const quillRef = useRef(null);
  // 2. 이미지 핸들링
  const imageHandler = () => {};

  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);

  // 화면이 갱신이 될때 마다 아래 모듈이 적용
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image", "video"],
          ["clean"],
        ],
        // 이미지 관련해서는 내가 직접 처리할께.
        handlers: { image: imageHandler },
      },
    }),
    [],
  );

  return (
    <div>
      <div>
        <ReactQuill ref={quillRef} onChange={setValue} modules={modules} />
      </div>
      <h2>내용 출력 하기</h2>
      <div>{value}</div>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
    </div>
  );
};

export default FormComponent;
```

## 6. 핸들러 활용하기 (이미지처리하기)

- 우선 백엔드로 이미지 보내고, 주소 받아서 처리 필요

```js
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const FormComponent = () => {
  // 1. React Quill 태그 를 저장한다.
  const quillRef = useRef(null);
  // 2. 이미지 핸들링
  const imageHandler = () => {
    // 1. 에디터를 저장한다.
    const editor = quillRef.current.getEditor();
    // 2. 이미지 업로드를 위한 트릭
    //   image를 저장할 html 태그를 즉시 생성한다.
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click(); // 강제클릭
    // 이미지 선택을 한다면 처리를 진행한다.
    input.addEventListener("change", () => {
      // console.log("파일체인지");
      try {
        // 일반적인 파일 처리과정을 진행한다.

        // 백엔드 이미지 서버로 전송해서 이미지 경로 받아야 합니다.
        // 1. 화면에 이미지를 보여주기 전에
        // 2. 백엔드로 이미지를 전송한다.
        // 3. 전송이 완료되면 결과를 리턴 받는다.
        // 4. 결과에는 무엇이 담겨지는가 하면
        // 5. 이미지의 경로와 이미지의 파일명이 문자열로 들어온다.

        const file = input.files[0];
        // console.log(file);
        const formData = new FormData();
        formData.append("pics", file);
        const header = { headers: { "Content-Type": "multipart/form-data" } };
        const res = jwtAxios.post("백엔드와 협의한 주소", formData, header);
        // const res = jwtAxios.post(`/api/board/image-upload?iboard=${newIBoard}`,, formData, header);
        // res.data ====> /board/1048/e75629d1-3e06-496a-86f4-11da4a38a4b5.png
        // 서버주소 : http://192.168.0.144:5223/pic
        const imgUrl = "서버주소" + res.data;
        console.log("서버로 이미지 전송 axio 실행");
        // 에디터에 이미지 배치하기
        // 현재 에디터에 마우스 커서가 깜빡거리는 위치를 알아낸다.
        const range = editor.getSelection();
        // html 태그 img 생성한다. 그리고, 추가한다.
        editor.insertEmbed(range.index, "image", imgUrl);
        // 강제로 마우스 커서 위치를 다음으로 이동한다.
        editor.setSelection(range.index + 1);
      } catch (err) {
        console.log("err");
      }
    });
  };

  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);

  // 화면이 갱신이 될때 마다 아래 모듈이 적용
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image", "video"],
          ["clean"],
        ],
        // 이미지 관련해서는 내가 직접 처리할께.
        handlers: { image: imageHandler },
      },
    }),
    [],
  );

  return (
    <div>
      <div>
        <ReactQuill ref={quillRef} onChange={setValue} modules={modules} />
      </div>
      <h2>내용 출력 하기</h2>
      <div>{value}</div>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
    </div>
  );
};

export default FormComponent;
```

## 7. 백엔드에서 URL 받은 이후 처리

- Editor 안쪽에 배치하기

```js
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import jwtAxios from "../../util/jwtUtil";

const FormComponent = () => {
  // 1. React Quill 태그 를 저장한다.
  const quillRef = useRef(null);
  // 2. 이미지 핸들링
  const imageHandler = () => {
    // 1. 에디터를 저장한다.
    const editor = quillRef.current.getEditor();
    // 2. 이미지 업로드를 위한 트릭
    //   image를 저장할 html 태그를 즉시 생성한다.
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click(); // 강제클릭
    // 이미지 선택을 한다면 처리를 진행한다.
    input.addEventListener("change", () => {
      // console.log("파일체인지");
      try {
        // 일반적인 파일 처리과정을 진행한다.

        // 백엔드 이미지 서버로 전송해서 이미지 경로 받아야 합니다.
        // 1. 화면에 이미지를 보여주기 전에
        // 2. 백엔드로 이미지를 전송한다.
        // 3. 전송이 완료되면 결과를 리턴 받는다.
        // 4. 결과에는 무엇이 담겨지는가 하면
        // 5. 이미지의 경로와 이미지의 파일명이 문자열로 들어온다.

        const file = input.files[0];
        // console.log(file);
        const formData = new FormData();
        formData.append("pics", file);
        const header = { headers: { "Content-Type": "multipart/form-data" } };
        const res = jwtAxios.post("백엔드와 협의한 주소", formData, header);
        // const res = jwtAxios.post(`/api/board/image-upload?iboard=${newIBoard}`,, formData, header);
        // res.data ====> /board/1048/e75629d1-3e06-496a-86f4-11da4a38a4b5.png
        // 서버주소 : http://192.168.0.144:5223/pic
        const imgUrl = "서버주소" + res.data;
        console.log("서버로 이미지 전송 axio 실행");
        // 에디터에 이미지 배치하기
        // 현재 에디터에 마우스 커서가 깜빡거리는 위치를 알아낸다.
        const range = editor.getSelection();
        // html 태그 img 생성한다. 그리고, 추가한다.
        editor.insertEmbed(range.index, "image", imgUrl);
        // 강제로 마우스 커서 위치를 다음으로 이동한다.
        editor.setSelection(range.index + 1);
      } catch (err) {
        console.log("err");
      }
    });
  };

  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);

  // 화면이 갱신이 될때 마다 아래 모듈이 적용
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image", "video"],
          ["clean"],
        ],
        // 이미지 관련해서는 내가 직접 처리할께.
        // 이미지 미리 보기 및 파일 관리는 개발자가 처리한다고 표현
        handlers: { image: imageHandler },
      },
    }),
    [],
  );

  return (
    <div>
      <div>
        <ReactQuill ref={quillRef} onChange={setValue} modules={modules} />
      </div>
      <h2>내용 출력 하기</h2>
      <div>{value}</div>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
    </div>
  );
};

export default FormComponent;
```
