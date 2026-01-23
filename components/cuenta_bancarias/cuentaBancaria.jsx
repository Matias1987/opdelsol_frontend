import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";

const CuentaBancaria = ({idcuenta, edicion=false}) => {
    const [btnEnabled, setBtnEnabled] = useState(true);
    const [cuenta, setCuenta] = useState({
        alias: ""
    });

    const load = () =>{
        if(idcuenta)
        {
            //load existing cuenta

        }
    }

    const onChange = (index,value) =>{
        setCuenta(v=>({...v,[index]:value}));
    }

    useEffect(()=>{
        load();
    },[]);

    const onSave =()=>{
        if(cuenta.alias.length<1){
            alert("Nombre no válido");
            return;
        }
        setBtnEnabled(false);
        post_method(post.insert.insert_cuenta_bancaria,cuenta,(response)=>{
            alert("Datos Guardados");
        })
    }

    return <>
    <Row style={{padding:"8px"}} >
        <Col span={24}>
            <Input prefix="Alias: " value={cuenta.alias} onChange={e=>{
                onChange("alias", e.target.value||"");

                }} />
        </Col>
    </Row>
    <Row  style={{padding:"8px"}} >
        <Col span={24}>
            <Button type="primary" block onClick={onSave} disabled={!btnEnabled}>Guardar</Button>
        </Col>
    </Row>
    </>
}

export default CuentaBancaria;