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
