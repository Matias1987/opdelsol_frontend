import { remote_base_url } from "@/src/config";
import { get } from "@/src/urls";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";

const CodeExample = (props) => {
    const {idsubgrupo, idgrupo} = props;
    const [ejemplo, setEjemplo] = useState("")
    useEffect(()=>{
        alert(remote_base_url + get.ejemplo_codigo + `${idsubgrupo||"0"}/${idgrupo||"0"}`)  
        fetch(remote_base_url + get.ejemplo_codigo + `${idsubgrupo||"0"}/${idgrupo||"0"}`)
        .then(r=>r.json())
        .then(response=>{
            if(response)
            {
               // alert(get.ejemplo_codigo + `${idsubgrupo||"0"}/${idgrupo||"0"}`)
                if(response.data.length>0)
                {
                    setEjemplo(response.data)
                }
            }
           
        })
    },[])
    return <>
        <Row gutter={16}>
            <Col style={{padding:"2px"}}><i>Ej.C&oacute;digo:</i></Col>
            <Col><span style={{fontWeight:"500", fontSize:"1.3em", color:"darkgreen"}}><i>{ejemplo}</i></span></Col>
        </Row>
    </>
}

export default CodeExample;