import { Button } from "antd";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function PrinterWrapper({ children }) {
    const linkToPrint = () => {
        return (
            <Button>Imprimir</Button>
        )
    }
    const componentRef = useRef();
    return (
        <>
            <ReactToPrint trigger={linkToPrint} content={() => componentRef.current} />
            <hr />
            <br />
            <div ref={componentRef}>
                {children}
            </div>
            <br />
            <hr />
            <ReactToPrint trigger={linkToPrint} content={() => componentRef.current} />
        </>
    );
}