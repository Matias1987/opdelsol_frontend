import React from "react";
import { useNetworkStatus } from "../providers/NetworkContext";
import WarningOutlined from "@ant-design/icons/WarningOutlined";

export default function ConnectionBanner() {
  const { isOnline } = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div
      style={{
        backgroundColor: "#ff4d4f",
        color: "#fff",
        textAlign: "center",
        padding: "2px",
        fontWeight:"600",
        fontSize:"14px",
        fontFamily:"Courier New",
      }}
    >
     <WarningOutlined /> Sin Conexi&oacute;n
    </div>
  );
}
