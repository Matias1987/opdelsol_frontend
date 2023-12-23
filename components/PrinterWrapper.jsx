import { Button, Col, Row } from "antd";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function PrinterWrapper({ children }) {
    const linkToPrint = () => {
        return (
            <Button>Imprimir</Button>
        )
    }
    const page_style = `
        body{
            background-color: white;
            color: black;
            font-size: .90em;
        }
        td, th {
            background-color: white;
            color: black;
            padding: 0;
            font-size: .90em;
            border: 0px solid black;
        }
        table{
            border: 0px solid black;
            padding: 0;
        }
    `
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
        <ReactToPrint  pageStyle={page_style} trigger={linkToPrint} content={() => componentRef.current} />
            
        </>
    );
}