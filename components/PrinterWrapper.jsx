import { PrinterFilled } from "@ant-design/icons";
import { Button, Col, FloatButton, Row } from "antd";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function PrinterWrapper({ children }) {
    const linkToPrint = () => {
        return (
            <FloatButton  className="floatbuttonsol" shape="square"   size="small" style={{backgroundColor:"red !important"}}icon={<PrinterFilled />} />
        )
    }
    const page_style = `
        body{
            background-color: white;
            color: black;
            font-size: .96em;
        }
        td, th {
            background-color: white;
            color: black;
            padding: 0;
            margin: 0;
            font-size: .96em;
            border: 0px solid black;
        }
        table{
            margin:0;
            border: 0px solid black;
            padding: 0;
        }
        button{
            width:0;
            height: 0;
            font-size:0em;
            padding:0;
            margin:0;
            border: none;
            display:none;
        }
        
       
        
    `

    const __style = {
        backgroundColor: "white",
        color: "black",
        fontSize: ".96em",
    }


    const componentRef = useRef();
    return (
        <>
        <ReactToPrint pageStyle={page_style} trigger={linkToPrint} content={() => componentRef.current} />
                <hr />
                <br />
                <div ref={componentRef}>
                    {children}
                </div>
                <br />
                <hr />
        {/*<ReactToPrint  pageStyle={page_style} trigger={linkToPrint} content={() => componentRef.current} />*/}
            
        </>
    );
}