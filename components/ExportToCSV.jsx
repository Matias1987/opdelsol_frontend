import { useState } from "react";

const { DownCircleFilled, ExportOutlined } = require("@ant-design/icons");
const { Button } = require("antd");

/**
 * 
 * @param json json to convert
 * @param columns columns acording to json 
 */
const ExportToCSV = (props) =>{

    const downloadTxtFile = () => {
        if(typeof props.parseFnt === 'undefined')
        {
            return
        }

        const data = props.parseFnt()
        try
        {
            const element = document.createElement("a");
            const file = new Blob([data], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = `${(props?.fileName||"")||"file"}_${(new Date()).getTime()}.csv`;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
        catch(ex){
            console.log(ex.toString())
        }
      }

      return <>
        <Button onClick={downloadTxtFile} style={{backgroundColor:"#F4E086FF"}}><ExportOutlined />CSV</Button>
      </>

}

    export default ExportToCSV;