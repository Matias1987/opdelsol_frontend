import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";

const Transferencia = (props) => {
    const { idCajaOrigen, idCajaDestino, aFondoFijo, callback } = props;
    const [data, setData] = useState([]);
    const [transferencia, setTransferencia] = useState({
        idCajaOrigen: idCajaOrigen||null,
        idCajaDestino: idCajaDestino||null,
        monto: 0,
        comentarios:"",
    });

    const onSave = () => {
        alert(JSON.stringify(transferencia));
        // Handle save logic here
        /**
         * {
                "id_caja_origen":"1",
                "id_caja_destino":"2",
                "monto":"1000",
                "comentarios":"nothing..."
            }
         */
        const url = aFondoFijo ? post.transferencia_a_ff : post.insert.transferencia;
        post_method(url, transferencia,response=>{
            alert("Datos Guardados");
            callback?.()
        })
    };

    const row_style={
        padding:"6px"
    }

    useEffect(() => {
    // Fetch initial data or perform setup
        load();
    }, []);

    const load = _ =>{
        const url = aFondoFijo ? get.lista_ff : get.lista_cajas;
        //alert(url)
        fetch(url)
        .then(response => response.json())
        .then((response) => {
            //alert(JSON.stringify(response));
            setData(response || []);
        });
    }

    return (
    <>

    <Row style={row_style}>
        <Col span={24}>
            <Select onChange={(value) => setTransferencia({ ...transferencia, idCajaDestino: value })} prefix="Destino:" style={{ width: '100%' }} options={data.map(item => ({ label: item.sucursal, value: item.idcaja }))} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
        Comentarios:
        </Col>
        <Col span={24}>
            <Input.TextArea prefix="Comentarios: " placeholder="Comentarios sobre la transferencia" type="text" value={transferencia.comentarios} onChange={(e) => setTransferencia({ ...transferencia, comentarios: e.target.value })} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input prefix="Monto: " placeholder="Monto a Transferir" type="number" value={transferencia.monto} onChange={(e) => setTransferencia({ ...transferencia, monto: e.target.value })} />
        </Col>
    </Row>
   
    <Row style={row_style}>
        <Col span={24} style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button type="primary" onClick={onSave}>Realizar Transferencia</Button>
        </Col>
    </Row>
    </>
  );
};

export default Transferencia;