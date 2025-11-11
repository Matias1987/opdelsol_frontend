import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Button } from "antd";
import { ExportOutlined, FileExcelOutlined } from "@ant-design/icons";

const ExportToExcel = ({ data, columns, fileName, buttonSize, sheetName, buttonType }) => {
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName || "Página 1");

    // Add headers (example)
    worksheet.columns = columns;

    // Add data rows
    data.forEach((row) => {
      worksheet.addRow(row);
    });

    // Generate and save the file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `${fileName}.xlsx`);
  };

  return (
    <Button
      size={buttonSize || "middle"}
      style={{ backgroundColor: "#217346", color:"white" }}
      type={buttonType ? buttonType : "primary"}
      onClick={exportExcel}
    >
      <FileExcelOutlined /> Exportar a Excel
    </Button>
  );
};

export default ExportToExcel;
