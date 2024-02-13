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
