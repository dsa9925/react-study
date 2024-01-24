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
