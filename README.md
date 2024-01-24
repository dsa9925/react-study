# 카카오 지도

- 페이지/라우터/컴포넌트 구성

## 1. page / 레이아웃

- /src/pages/map/MapPage.js

```js
// 코드 생략
```

## 2. 기능 컴포넌트

- /src/components/map/MapComponent.js

```js
import React from "react";

const MapComponent = () => {
  return <div>MapComponent</div>;
};

export default MapComponent;
```

## 3. 페이지에 컴포넌트 배치하기

```js
import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import MapComponent from "../../components/map/MapComponent";

const MapPage = () => {
  return (
    <BasicLayout>
      <h1>카카오 지도</h1>
      <MapComponent />
    </BasicLayout>
  );
};

export default MapPage;
```

## 4. 카카오 개발자 등록하기

- [카카오개발자](https://developers.kakao.com/)
- [새로운 애플리케이션 등록](https://velog.io/@tpgus758/React%EC%97%90%EC%84%9C-Kakao-map-API-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [지도가이드](https://apis.map.kakao.com/web/guide/)

## 5. 지도 적용하기

- /public/index.html

```html
<title>리액트 공부</title>
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 키"
></script>
```

## 6. 컴포넌트에 적용하기

- /src/components/kko/MapComonents.js

```js
import React, { useEffect } from "react";

// 웹브라우저에 등록된 kakao 객체를 활용
const { kakao } = window;

const MapComponent = () => {
  // html 완료가 되면 출력
  useEffect(() => {
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  return (
    <div>
      <h1>카카카오지도</h1>
      <div id="map" style={{ width: 500, height: 500 }}></div>
    </div>
  );
};

export default MapComponent;
```

## 7. react-kakao-maps-sdk 활용

- [react-kakao-maps-sdk](https://www.npmjs.com/package/react-kakao-maps-sdk)
- [개발자사이트](https://react-kakao-maps-sdk.jaeseokim.dev/)
- [활용블로그](https://velog.io/@wlwl99/React-Kakao-Map-SDK-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- `npm i react-kakao-maps-sdk`

## 8. react-kakao-maps-sdk 적용하기

-/src/components/kko/MapComponent.js

```js
import React, { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapComponent = () => {
  return (
    <div>
      <h1>카카카오지도</h1>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={4} // 지도의 확대 레벨
      >
        <MapMarker // 마커를 생성합니다
          position={{
            // 마커가 표시될 위치입니다
            lat: 33.450701,
            lng: 126.570667,
          }}
        />
      </Map>
    </div>
  );
};

export default MapComponent;
```
