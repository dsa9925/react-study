import React from "react";
import { ResponsiveLine } from "@nivo/line";

const getData = {
  data: [
    {
      id: "Health",
      color: "hsl(246, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 131,
        },
        {
          x: "helicopter",
          y: 221,
        },
        {
          x: "boat",
          y: 86,
        },
        {
          x: "train",
          y: 184,
        },
        {
          x: "subway",
          y: 231,
        },
        {
          x: "bus",
          y: 90,
        },
        {
          x: "car",
          y: 100,
        },
        {
          x: "moto",
          y: 123,
        },
        {
          x: "bicycle",
          y: 67,
        },
        {
          x: "horse",
          y: 271,
        },
        {
          x: "skateboard",
          y: 6,
        },
        {
          x: "others",
          y: 82,
        },
      ],
    },
  ],
};

const Chart = () => {
  // 자바스크립트 영역
  const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={false}
    />
  );

  return (
    <div>
      Chart
      <div style={{ width: "100%", height: "500px" }}>
        {/* 차트 나오는 자리 */}
        {MyResponsiveLine(getData)}
      </div>
    </div>
  );
};

export default Chart;
