import globals from "@/src/globals";
import { Alert } from "antd";
import { useEffect, useState } from "react";

const Alerts = (props) => {
    
    return <>
        <Alert message={props.message} />
    </>
}

export default Alerts;