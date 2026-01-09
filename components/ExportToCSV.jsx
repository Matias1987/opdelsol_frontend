import {  ExportOutlined }  from"@ant-design/icons";
import { Button }  from "antd";

/**
 * 
 * @param json json to convert
 * @param columns columns acording to json 
 * @param parseFnt 
 */
const ExportToCSV = ({parseFnt,fileName}) =>{

    const downloadTxtFile = () => {
        if(typeof parseFnt === 'undefined')
        {
            return
        }

        const data = parseFnt()
        try
        {
            const element = document.createElement("a");
            const file = new Blob([data], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = `${(fileName??"")||"file"}_${(new Date()).getTime()}.csv`;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
        catch(ex){
            console.log(ex.toString())
        }
      }

      return <>
        <Button size="small" onClick={downloadTxtFile} style={{backgroundColor:"#F4E086FF"}}><ExportOutlined />CSV</Button>
      </>

}

    export default ExportToCSV;