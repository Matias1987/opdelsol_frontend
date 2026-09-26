// PopupContext.js
import React, { createContext, useContext } from "react";
import { message } from "antd";
import dynamic from "next/dynamic";
const AntdModal = dynamic(() => import("antd/lib/modal"), { ssr: false });

const PopupContext = createContext(null);

export const PopupProvider = ({ children }) => {
  const showConfirm = ({ title, content, onOk, onCancel }) => {
    AntdModal.confirm({
      title,
      content,
      okText: "Aceptar",
      cancelText: "Cancelar",
      onOk,
      onCancel,
    });
  };

  const showAlert = (content, duration = 3) => {
    message.info(content, duration);
  };

  const showSuccess = (content, duration = 3) => {
    message.success(content, duration);
  };

  const showError = (content, duration = 3) => {
    message.error(content, duration);
  };

  return (
    <PopupContext.Provider
      value={{ showConfirm, showAlert, showSuccess, showError }}
    >
      {children}
    </PopupContext.Provider>
  );
};

// Hook for easy access
export const usePopup = () => {
  const ctx = useContext(PopupContext);
  if (!ctx) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return ctx;
};
