import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Button } from "antd";
import { ExportOutlined, FileExcelOutlined } from "@ant-design/icons";
/**
 * 
 * @param {*} sheets must contain an array of sheet object with the following: sheet_name, header, footer, columns [{header, key, width}], data 
 * @param buttonSize
 * @param fileName
 * 
 *  
 */
const ExportToExcel2 = ({ sheets, buttonSize, fileName, buttonStyle, buttonType, disabled, buttonText }) => {
    /**
     * sheets must have the following structure:
     * sheets: [
     *  {
     *      sheet_name:""
     *      columns: []
     *      data 
     *  }
     * ]
     */
    const default_style = {backgroundColor: "#217346"}
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();

    //alert(JSON.stringify(sheets))
    //console.log(JSON.stringify(sheets))
    //console.log("alsdf")
    sheets.forEach(sheet=>{
        const worksheet = workbook.addWorksheet(sheet.sheet_name, {  headerFooter:{firstHeader: sheet.header, firstFooter: sheet.footer}});
        worksheet.columns = sheet.columns;
        // Add data rows
        sheet.data.forEach((row) => {
        worksheet.addRow(row);
        });

    })

    // Generate and save the file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `${fileName}.xlsx`);
  };

  return (
    <Button
      disabled={disabled}
      size={buttonSize || "middle"}
      style={disabled ? {color:"#bdbdbdff"} : buttonStyle ?? default_style}
      type={buttonType ?? "primary"}
      onClick={exportExcel}
    >
      <FileExcelOutlined /> {buttonText || "Exportar a Excel"}
    </Button>
  );
};

export default ExportToExcel2;
