import React, { useState } from "react";
import { DatePicker } from "antd";

export default function AntDatepicker() {
  const [date, setDate] = useState(new Date());
  function onChange(date: any, dateString: string) {
    setDate(date);
  }
  return <DatePicker defaultPickerValue="2023/7/25" onChange={onChange} />;
}
