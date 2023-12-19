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
