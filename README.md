# React

## 11. file (이미지 기준) 관리

- 1단계의 이해

```js
import React, { useState } from "react";

const init = "";
const FileIndex = () => {
  // 미리 보여줄 이미지 주소(http~~~)
  const [uploadImg, setUpLoadImg] = useState(init);

  const handleChange = async event => {
    // 이미지를 참조하는 법(배열[0])
    const file = event.target.files[0];
    // body 에 담는 객체 (html 전송시)
    const formData = new FormData();
    formData.append("pic", file);
    try {
      const res = await fetch("/upload/images", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // 파일 전송시 필요한 설정
        },
      });
      console.log("전송완료", res);
      console.log("이미지 미리보기 해야지.");
      // 웹브라우저에 보관된 이미지의 주소를 받는다.
      setUpLoadImg(URL.createObjectURL(file));
    } catch (error) {
      console.log("업로드 실패", error);
    }
  };

  return (
    <div>
      <h1>이미지 업로드</h1>
      <div>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={event => {
            handleChange(event);
          }}
        />
      </div>
      <div>
        <h3>이미지 미리보기</h3>
        <br />
        {uploadImg}
        <img src={uploadImg} alt="업로드이미지" />
      </div>
    </div>
  );
};

export default FileIndex;
```

- 2단계의 이해(미리보기 하고 파일 전송을 시도한다.)
  -- 여기서는 미리보기만 활용하기를 추천
  -- 이미지를 문자열(blob) 으로 보내서 DB 업데이트하는 것은 무식한 방법입니다.

```js
import React, { useState } from "react";

const init = "";
const imgFile = null;

const FileIndex = () => {
  // 미리 보여줄 이미지 주소(http~~~)
  const [uploadImg, setUpLoadImg] = useState(init);
  // 실제 파일
  const [charImg, setCharImg] = useState(imgFile);

  const handleChange = event => {
    // 이미지를 참조하는 법(배열[0])
    const file = event.target.files[0];
    try {
      if (file) {
        // 미리보기 부터 먼저하겠다.
        const reader = new FileReader();
        // 이미지를 읽어들인다. 여기서는 웹브라우저의 url 을 읽는다.
        reader.readAsDataURL(file);
        // 웹브라우저가 이미지를 모두 읽었다.
        reader.onload = () => {
          // console.log(reader.result);
          setUpLoadImg(reader.result);
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 이미지 취소
  const handleClickCancel = () => {
    // state 변경
    setUpLoadImg(null);
  };

  // 이미지를 실제 파일서버로 업로드
  const handleClickUpload = async () => {
    // 백엔드에 저장할 폴더 주소
    const sendUrl = "/upload/images";
    // key 명 {"food":파일명}
    const sendKey = "food";
    // 미리보기가 되어서 이미지가 있다면
    if (uploadImg != "") {
      const formData = new FormData();
      formData.append(sendKey, uploadImg); // {"food": "~~~~~~~"}
      try {
        const res = await fetch(sendUrl, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
        // 만약에 서버가 정상적으로 처리한다면
        // res.status 는 200 류가 옵니다.
        // 우리는 200 이 올지 201 이 올지 모릅니다.
        // 백엔드 마음입니다.
        // 그래도 2단위로 줍니다.
        const serverStatus = res.status.toString(); //200 => "200"
        if (serverStatus.charAt(0) === "2") {
          // 이미지가 제대로 업로드 되었다.
          setCharImg("실제이미지 즉 백엔드의 이미지 주소를 받는다");
        } else {
          // 이미지가 일단 업로드 되었다고 판단.
          setCharImg(uploadImg);
        }
      } catch (error) {
        // 서버가 없는 경우, 오류인 경우
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>이미지 업로드</h1>
      <div>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={event => {
            handleChange(event);
          }}
        />
      </div>
      <div>
        <h3>이미지 미리보기</h3>
        <br />
        {/* {uploadImg} */}
        <img src={uploadImg} alt="업로드이미지" />
      </div>
      <div>
        <button
          onClick={() => {
            handleClickUpload();
          }}
        >
          이미지 업로드
        </button>
        <button
          onClick={() => {
            handleClickCancel();
          }}
        >
          이미지 업로드 취소
        </button>
      </div>
    </div>
  );
};

export default FileIndex;
```

- 3단계의 이해 (이미지 미리보기 및 실시간 JSX 생성 및 axios 연동)

```js
import axios from "axios";
import React, { useState } from "react";
// axios 를 활용해서 미리보기, 이미지 전송
const initImg = "";
const FileIndex = () => {
  // 웹브라우저 임시 이미지 파일주소
  const [uploadImg, setUploadImg] = useState(initImg);
  // 이미지 미리보기 제거
  const handleClickRemove = () => {
    setUploadImg("");
  };
  // 이미지 서버 업로드
  const handleClickUpload = async () => {
    // 서버 주소(1. 백엔드 폴더 참조 협의)
    const sendUrl = "/upload";
    // body 에 저장할 2. key 도 백엔드와 협의
    const sendKey = "good";
    if (uploadImg) {
      const formData = new FormData();
      // 나중에 실제 파일서버가 만들어지면
      // 3. uploadImg 를 파일로 교체해야 해요.(지금은 문자열)
      formData.append(sendKey, uploadImg);
      // fetch 말고 axios 연동
      try {
        const res = axios.post(sendUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("전송완료");
        const serverStatus = (await res).status.toString();
        if (serverStatus.charAt(0) === "2") {
          // 하고 싶은 일을 한다.
        } else {
          // 한번 더 확인(백엔드랑 얘기해서) 해서 하고 싶은 일을 한다.
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  // 이미지 미리보기
  const renderImagePreview = () => {
    if (uploadImg != "") {
      // 실시간으로 jsx를 생성
      return (
        <>
          <div>
            <img src={uploadImg} alt="미리보기" />
            <button
              onClick={() => {
                handleClickRemove(null);
              }}
            >
              지우기
            </button>
            <button
              onClick={() => {
                handleClickUpload();
              }}
            >
              업로드
            </button>
          </div>
        </>
      );
    }
  };

  // 사용자가 파일을 선택하면 실행한다. (프론트 담당)
  const handleChangePreview = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      // 임시 웹브라우저 이미지경로를 전달한다.
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        setUploadImg(reader.result);
      };
    }
  };
  return (
    <div>
      <h3>이미지 미리보기 및 axios 업로드</h3>
      {renderImagePreview()}
      <div>
        {/* 이미지 미리보기 출력 */}
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={e => {
            handleChangePreview(e);
          }}
        />
      </div>
    </div>
  );
};

export default FileIndex;
```

- 4단계의 이해 (미리보기, 내용 포함 전달 axios 연동)

```js
import axios from "axios";
import React, { useState } from "react";
// axios 를 활용해서 미리보기, 이미지 전송
const initImg = "";
const initMemo = "";
const FileIndex = () => {
  // 웹브라우저 임시 이미지 파일주소
  const [uploadImg, setUploadImg] = useState(initImg);
  // 내용 (메모)
  const [memo, setMemo] = useState(initMemo);
  // 이미지 미리보기 제거
  const handleClickRemove = () => {
    setUploadImg("");
  };
  // 이미지 서버 업로드
  const handleClickUpload = async () => {
    // 서버 주소 (1. 백엔드 폴더 참조 협의)
    const sendUrl = "/upload";
    // body 에 저장할 2. key 도 백엔드와 협의
    if (uploadImg) {
      const formData = new FormData();
      // 나중에 실제 파일서버가 만들어지면
      // 3. uploadImg 를 파일로 교체해야 해요. (지금은 문자열)
      formData.append("good", uploadImg);
      // 4. 메모도 같이 보내기
      // formData.append("memo", JSON.stringify(memo));

      // Spring 기반의 백엔드에서는 처리가 다르다.
      // 파일을 전송하는 경우에는 아래처럼 처리한다.
      const data = new Blob([memo], { type: "application/json" });
      formData.append("memo", data);

      // fetch 말고 axios 연동
      try {
        const res = await axios.post(sendUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("전송완료");
        const serverStatus = res.status.toString();
        if (serverStatus.charAt(0) === "2") {
          // 하고 싶은 일을 한다.
          console.log("성공");
        } else {
          // 한번 더 확인(백엔드랑 얘기해서) 해서  하고 싶은 일 한다.
          console.log("실패");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 이미지 미리보기
  const renderImagePreview = () => {
    if (uploadImg != "") {
      // 실시간으로 jsx 를 생성
      return (
        <>
          <div>
            <img src={uploadImg} alt="미리보기" />
            <button
              onClick={() => {
                handleClickRemove();
              }}
            >
              지우기
            </button>
            <button
              onClick={() => {
                handleClickUpload();
              }}
            >
              업로드
            </button>
          </div>
        </>
      );
    }
  };

  // 사용자가 파일을 선택하면 실행한다. (프론트 담당)
  const handleChangePreview = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      // 임시 웹브라우저 이미지경로를 전달
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUploadImg(reader.result);
      };
    }
  };
  // 사용자가 입력한 메모를 업데이트 한다.
  const handleChangeMemo = e => {
    setMemo(e.target.value);
  };

  // form 을 전송합니다. (이미지, 내용...)
  const handleSubmit = e => {
    // console.log(e);

    // 기본 이벤트 막기(form 데이터 전송시 새로고침 )
    e.preventDefault();
    if (uploadImg === "") {
      alert("이미지를 선택하세요.");
      return;
    }
    // 문자열 체크 정규표현식
    if (memo === "") {
      alert("메모를 입력하세요.");
      return;
    }
    handleClickUpload();
  };

  return (
    <div>
      <h3>이미지 미리보기 및 axios 업로드</h3>
      {renderImagePreview()}
      <div>
        <form
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          <p>
            <label htmlFor="uimg">1. 이미지 선택</label>
            <input
              type="file"
              id="uimg"
              onChange={e => {
                handleChangePreview(e);
              }}
            />
          </p>
          <p>
            <label htmlFor="umemo">2. 내용 입력</label>
            <input
              type="text"
              id="umemo"
              value={memo}
              onChange={e => {
                handleChangeMemo(e);
              }}
            />
          </p>
          <p>
            <button type="submit">등록</button>
            {/* <input type="submit" value="등록" /> */}

            <button type="reset">재작성</button>
            {/* <input type="reset" value="재작성" /> */}
          </p>
        </form>
      </div>
    </div>
  );
};

export default FileIndex;
```

- 5단계 여러개의 파일 첨부하여 전송하기

```js
import axios from "axios";
import { now } from "moment/moment";
import React, { useEffect, useState } from "react";
// axios 를 활용해서 미리보기, 이미지 전송
const initImg = [];
const initMemo = "";
const FileIndex = () => {
  // 웹브라우저 임시 이미지 파일주소
  const [uploadImg, setUploadImg] = useState(initImg);
  // 내용 (메모)
  const [memo, setMemo] = useState(initMemo);
  // 이미지 미리보기 제거
  const handleClickRemove = _index => {
    // 내일 배열의 필터링을 써보죠,
    // 파인드인덱스를 써보조,
    console.log(uploadImg);
    const arr = [...uploadImg];
    // arr.map(    (item, index, arr) => { })
    // 조건에 맞는 것(참인것)만 뽑아낸다.
    const nowArr = arr.filter((item, index, arr) => {
      return index !== _index;
    });
    console.log(nowArr);
    setUploadImg(nowArr);
  };
  // 이미지 서버 업로드
  const handleClickUpload = async () => {
    // 서버 주소 (1. 백엔드 폴더 참조 협의)
    const sendUrl = "/upload";
    // body 에 저장할 2. key 도 백엔드와 협의
    if (uploadImg) {
      const formData = new FormData();
      // 나중에 실제 파일서버가 만들어지면
      // 3. uploadImg 를 파일로 교체해야 해요. (지금은 문자열)
      formData.append("good", uploadImg);
      // 4. 메모도 같이 보내기
      // formData.append("memo", JSON.stringify(memo));

      // Spring 기반의 백엔드에서는 처리가 다르다.
      // 파일을 전송하는 경우에는 아래처럼 처리한다.
      const data = new Blob([memo], { type: "application/json" });
      formData.append("memo", data);

      // fetch 말고 axios 연동
      try {
        const res = await axios.post(sendUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("전송완료");
        const serverStatus = res.status.toString();
        if (serverStatus.charAt(0) === "2") {
          // 하고 싶은 일을 한다.
          console.log("성공");
        } else {
          // 한번 더 확인(백엔드랑 얘기해서) 해서  하고 싶은 일 한다.
          console.log("실패");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 이미지 미리보기
  const renderImagePreview = () => {
    if (uploadImg.length > 0) {
      // 실시간으로 jsx 를 생성
      return (
        <>
          {uploadImg.map((item, index) => (
            <div key={index}>
              <img src={item} alt="미리보기" />
              <button
                onClick={() => {
                  handleClickRemove(index);
                }}
              >
                지우기
              </button>
              <button
                onClick={() => {
                  handleClickUpload();
                }}
              >
                업로드
              </button>
            </div>
          ))}
        </>
      );
    }
  };

  // 사용자가 파일을 선택하면 실행한다. (프론트 담당)
  const handleChangePreview = e => {
    // 여러개의 이미지 파일 담은 배열
    // 객체를 배열로 만들기(여러개이지만 객체로 담기기 때문에)
    console.log(e.type);
    console.log(e.target);
    console.log(e.target.files);
    const files = Array.from(e.target.files);
    console.log(files);
    if (files.length != 0) {
      // 파일이 여러개 이므로 useState 를 배열로 초기화 후 업데이트
      const arr = files.map(item => {
        return URL.createObjectURL(item);
      });
      console.log(arr);
      setUploadImg(arr);
    }

    // if (file) {
    //   const reader = new FileReader();
    //   // 임시 웹브라우저 이미지경로를 전달
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     setUploadImg(reader.result);
    //   };
    // }
  };
  // 사용자가 입력한 메모를 업데이트 한다.
  const handleChangeMemo = e => {
    setMemo(e.target.value);
  };

  // form 을 전송합니다. (이미지, 내용...)
  const handleSubmit = e => {
    // console.log(e);
    // 기본 이벤트 막기(form 데이터 전송시 새로고침)
    e.preventDefault();
    if (uploadImg === "") {
      alert("이미지를 선택하세요.");
      return;
    }
    // 문자열체크 정규표현식
    if (memo === "") {
      alert("메모를 입력하세요.");
      return;
    }
    handleClickUpload();
  };

  return (
    <div>
      <h3>이미지 미리보기 및 axios 업로드</h3>
      {renderImagePreview()}
      <div>
        <form
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          <p>
            <label htmlFor="uimg">1. 이미지 선택</label>
            <input
              type="file"
              id="uimg"
              onChange={e => {
                handleChangePreview(e);
              }}
              multiple={true}
            />
          </p>
          <p>
            <label htmlFor="umemo">2. 내용 입력</label>
            <input
              type="text"
              id="umemo"
              value={memo}
              onChange={e => {
                handleChangeMemo(e);
              }}
            />
          </p>
          <p>
            <button type="submit">등록</button>
            {/* <input type="submit" value="등록" /> */}

            <button type="reset">재작성</button>
            {/* <input type="reset" value="재작성" /> */}
          </p>
        </form>
      </div>
    </div>
  );
};

export default FileIndex;
```

## 12. firebase (이미지 기준) 관리
