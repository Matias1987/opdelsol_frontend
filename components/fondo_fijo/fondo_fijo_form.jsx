import { Button, Col, Input, Row, Select } from "antd";
import SucursalSelect from "../SucursalSelect";
import { useState } from "react";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";

const FondoFijoForm = props => {
    const {callback} = props;

    const [ff, setFF] = useState({
        idsucursal: null,
        monto: null
    });

    const setValue = (key, value) => {
        setFF((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const onSubmit = () => {
        console.log("Formulario enviado con los siguientes datos:", ff);
        alert(JSON.stringify(ff));
        post_method(post.insert.fondo_fijo, ff,(response)=>{
            alert("Datos Guardados");
            callback?.();
        })
    };

    return (
    <>

    <Row>
        <Col span={24}>
            <SucursalSelect callback={(idsucursal) => {
                console.log("Sucursal seleccionada:", idsucursal);
                setValue("idsucursal", idsucursal);
            }} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input placeholder="Ingrese Monto" style={{ width: '100%' }} onChange={(e) => setValue("monto", e.target.value)} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button type="primary" style={{ marginTop: '16px' }} onClick={onSubmit}>
                Guardar
            </Button>
        </Col>
    </Row>
    </>
  );
};

export default FondoFijoForm;