import React, { useEffect, useState } from "react";
import { Button, Space } from "antd";
import AppstoreOutlined from "@ant-design/icons/AppstoreOutlined";
import BorderOutlined from "@ant-design/icons/BorderOutlined";
import PictureOutlined from "@ant-design/icons/PictureOutlined";

const ThumbnailSizePicker = ({ onSizeChange }) => {
  const [size, setSize] = useState("medium");

  const handleChange = (newSize) => {
    setSize(newSize);
    onSizeChange(newSize);
  };

  useEffect(() => {
    onSizeChange(size);
  });

  return (
    <Space>
      <Button
        size="small"
        type={size === "small" ? "primary" : "default"}
        icon={<BorderOutlined />}
        onClick={() => handleChange("small")}
      ></Button>
      <Button
        size="small"
        type={size === "medium" ? "primary" : "default"}
        icon={<AppstoreOutlined />}
        onClick={() => handleChange("medium")}
      ></Button>
      <Button
        size="small"
        type={size === "large" ? "primary" : "default"}
        icon={<PictureOutlined />}
        onClick={() => handleChange("large")}
      ></Button>
    </Space>
  );
};

export default ThumbnailSizePicker;
