import { get } from "@/src/urls";

import { Table, Spin, Row, Col } from "antd";
import { useEffect, useState } from "react";
/**
 * 
 * @param idFactura
 * 
 */
const DetalleFactura = (props) => {

    const [dataFactura, setDataFactura] = useState([]);
    const [dataElementos, setDataElementos] = useState([]);
    const [detallesLoading, setDetallesLoading] = useState(true);
    const [elementosLoading, setElementosLoading] = useState(true);

    const fetchUrlDetalles = get.detalle_factura;
    const fetchUrlElementos = get.elementos_factura;

    
    const load = _ => {
        if(typeof props.idFactura === 'undefined'){
            alert("couldn't find id factura")
            return;
        }
        if(props.idFactura == null){
            alert("couldn't find id factura")
            return;
        }
        setElementosLoading(true)
        setDetallesLoading(true)
        //load data factura:
        
        fetch(fetchUrlDetalles + props.idFactura)
        .then(response=>response.json())
        .then((response)=>{
            setDataFactura(
                response.data.map(
                    r=>(
                        {
                            fecha: r.fecha,
                            numero: r.numero,
                            proveedor: r.proveedor,
                            cantidad_total: r.cantidad,
                            monto_total: r.monto,
                            es_remito: r.es_remito,
                        }
                    )
                )
            )
            setDetallesLoading(false)
        });

        fetch(fetchUrlElementos+  props.idFactura)
        .then(response=>response.json())
        .then((response)=>{
            setDataElementos(
                response.data.map(
                    r=>(
                        {
                            codigo: r.codigo,
                            cantidad: r.cantidad,
                            precio: r.costo,
                        }
                    )
                )

            );

            setElementosLoading(false);
        })
    }

    useEffect(()=>{
        if(props.idFactura>0)
        {
            load()
        }
    },[props.idFactura]);

    const detalles = _ =>(
        <>
        <Row>
            <Col span={12}>
                <Row>
                    <Col span={24}>Proveedor: <span style={{fontWeight:"bold", color:"darkblue"}}>{dataFactura[0].proveedor}</span></Col>
                </Row>
                <Row>
                    <Col span={24}>Nro.: <span style={{fontWeight:"bold", color:"darkblue"}}>{dataFactura[0].numero}</span></Col>
                </Row>
                <Row>
                    <Col span={24}>Fecha: <span style={{fontWeight:"bold", color:"darkblue"}}>{dataFactura[0].fecha}</span></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={24}>Cantidad Total: <span style={{fontWeight:"bold", color:"darkblue"}}>{dataFactura[0].cantidad_total}</span></Col>
                </Row>
                <Row>
                    <Col span={24}>Monto Total: <span style={{fontWeight:"bold", color:"darkblue"}}>$ {parseFloat(dataFactura[0].monto_total).toLocaleString("es-AR")}</span></Col>
                </Row>
            </Col>
        </Row>
            
            
        </>
    )

    const elementos = _ =>(
        <>
        <Table
        title={()=><><b>Lista de Productos</b></>}
        size="small"
        pagination={false}
        scroll={{y:"450px"}}
        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
        dataSource={dataElementos}
        loading={elementosLoading}
        columns={[
            {title: 'Código', dataIndex: 'codigo', key: 'codigo'},
            {title: <div style={{textAlign:"right"}}>Cantidad</div>, dataIndex: 'cantidad', key: 'cantidad', render:(_,{cantidad})=><div style={{textAlign:"right"}}>{cantidad}</div>},
            {title: <div style={{textAlign:"right"}}>Precio</div>, dataIndex: 'precio', key: 'precio', render:(_,{precio})=><div style={{textAlign:"right"}}>{precio}</div>},
        ]}
        />
        </>
    )

    return (
        <>
            <Row>
                <Col span={24}>
                    <h3>{detallesLoading ? "..." : +dataFactura[0].es_remito != 1 ? "Detalle Factura" : "Detalle Remito" }</h3>
                </Col>
            </Row>
            <Row style={{backgroundColor:"#E4F6FF", padding:"8px"}}>
                <Col span={24}>
                    {detallesLoading ? <Spin /> :detalles()}
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                {elementosLoading ? <Spin /> : elementos()}
                </Col>
            </Row>
        </>
    )
}

export default DetalleFactura;