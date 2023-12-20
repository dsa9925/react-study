import moment from "moment/moment";
import React, { useState } from "react";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "../../fb/fbconfig";
import { deleteObject } from "firebase/storage";
// 미리보기 이미지 초기값
const initPreview = "";
const Board = () => {
  // 미리보기 이미지
  const [previewImg, setPreviewImg] = useState(initPreview);
  // 선택된 파일(데이터 종류)
  const [selectFile, setSelectFile] = useState(null);

  // 이미지 파일 선택 미리보기
  const handleChangeFile = e => {
    // 파일을 변수에 담아서 코드 를 수월하게 보려고
    const file = e.target.files[0];
    if (file) {
      // 나의 웹브라우저에서 URL 을 임시로 생성
      const tempUrl = URL.createObjectURL(file);
      // 미리보기 state
      setPreviewImg(tempUrl);
      // 파일 보관
      setSelectFile(file);
    }
  };

  // 1. 업로드 기능
  // 그냥 업로드 하는 것에 대한 고민..
  // 1.1. 폴더를 만들고 올리자(나중을 위해서)
  const path = "images/";
  // 1.2. 파일명이 중복된다면 어떻게 하지?
  //  - 파일명을 임의적으로 변경을 하면 어떨까? (추천: 랜덤 - 날짜-글자)
  //  - 시간을 추가한 파일명을 생성을 해서 업로드 하자.
  //  - 시간을 편리하게 활용하는 라이브러리 (momment)
  //  - https://www.npmjs.com/package/moment
  //  - npm i moment

  // 2. 파이어베이스에 업로드된 정보 관리
  const [fbImgUrl, setFbImgUrl] = useState("");

  const upload = () => {
    if (!selectFile) {
      // 이미지 선택하지 않다면 안내창 출력
      alert("이미지를 선택해주세요.");
      return;
    }
    // 중복되지 않는 파일명을 생성한다.
    const tempName = moment().format("YYYYMMDDhhmmss");
    const fileName = `${path}${tempName}_${selectFile.name}`;
    // 실제 업로드는 복잡하므로 함수를 만들어서 파일이름을 전달한다.
    uploadImage(fileName);
  };
  // 실제 이미지 업로드를 실행 함수
  const uploadImage = async _fileName => {
    try {
      //https://firebase.google.com/docs/storage/web/upload-files?hl=ko
      const imageRef = ref(storage, _fileName);
      const fbRes = await uploadBytes(imageRef, selectFile);
      console.log("업로드 성공", fbRes);

      // 백엔드에서 이미지 주소를 주세요. 요청
      // 파이어베이스 이미지 url 을 파악
      const url = await getDownloadURL(fbRes.ref);
      setFbImgUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  // 3. 이미지 목록에서 삭제할 항목 선택하고 삭제하기
  const [imgList, setImgList] = useState([]);
  const [imgUrlList, setImgUrlList] = useState([]);

  const getAll = async () => {
    try {
      const listRef = ref(storage, "images/");
      const res = await listAll(listRef);
      // res.items : firebase 에서 생성함.
      // console.log(res.items);
      res.items.forEach(item => {
        // console.log(item.fullPath);
        // 삭제할 때 사용
        setImgList(prev => [...prev, item.fullPath]);

        // 미리보기 활용(http)
        getDownloadURL(item).then(url => {
          setImgUrlList(prev => [...prev, url]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  // 4. 삭제하기
  const deleteImg = async idx => {
    // 누구를 지울지 파이어베이스의 fullPath 를 알아야 합니다.
    // 다행이도 보관해 둠.
    try {
      const who = imgList[idx];
      const desertRef = ref(storage, who);
      await deleteObject(desertRef);
      console.log("삭제성공");
      // 현재 삭제된 이미지를 목록에서 빼라(화면 갱신하려고)
      const tempList = imgList.filter((item, index) => index != idx);
      setImgList(tempList);
      // 현재 삭제된 이미지를 목록에서 빼라(화면 갱신하려고)
      const tempUrlList = imgUrlList.filter((item, index) => index != idx);
      setImgUrlList(tempUrlList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>파이어베이스 이미지 업로드 / 미리보기 </h2>
      <hr />
      <div>
        <h3>미리보기</h3>
        {/* {previewImg ? <img src={previewImg} alt="미리보기" /> : "없어요"} */}
        {previewImg && <img src={previewImg} alt="미리보기" />}
      </div>
      <hr />
      <div>
        <h3>이미지 업로드 하기</h3>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={e => {
            handleChangeFile(e);
          }}
        />
        <button
          onClick={() => {
            upload();
          }}
        >
          업로드
        </button>
      </div>
      <hr />
      <div>
        <h3>업로드된 이미지 경로 : {fbImgUrl}</h3>
      </div>
      <hr />
      <div>
        <h3>업로드된 이미지 경로를 직접 입력하기</h3>
        <input type="text" value={fbImgUrl} />
      </div>
      <hr />
      <div>
        <h3>업로드된 전체 이미지 목록 가져오기</h3>
        <button
          onClick={() => {
            getAll();
          }}
        >
          전체 목록 보기
        </button>
        <div>
          {/* 삭제할 때 사용 */}
          {imgList.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          {/* 출력할 http 주소 */}
          {imgUrlList.map((item, index) => (
            <div key={index}>
              <img src={item} />
              <button
                onClick={() => {
                  deleteImg(index);
                }}
              >
                삭제하기
              </button>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Board;
