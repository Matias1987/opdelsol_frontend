import CustomModal from "@/components/CustomModal";
import ExportToCSV from "@/components/ExportToCSV";
import PrinterWrapper from "@/components/PrinterWrapper";
import CodigosQR from "@/components/forms/deposito/codigosQR";
import CodigosDeBarraEnvio from "@/components/informes/CodigosDeBarra";
import InformeEnvio from "@/components/informes/InformeEnvio";

import { Table, Button, Tag, Row, Col } from "antd";
import { useEffect, useState } from "react";
const urls = require("../../../../src/urls")
const ListaEnvios = (props) => {
    const [data,setData] = useState([])
    const [update, setUpdate] = useState(false)

    const columns = [
        {title: 'Nro.', dataIndex: 'idenvio', key: 'idenvio'},
        {title: 'Fecha', dataIndex: 'fecha', key: 'fecha'},
        {title: 'Sucursal Origen', dataIndex: 'sucursal_origen', key: 'sucursal_idsucursal'},
        {title: 'Sucursal Destino', dataIndex: 'sucursal_idsucursal', key: 'sucursal_idsucursal'},
        {title: 'Cantidad', dataIndex: 'cantidad_total', key: 'cantidad_total'},
        {title: 'Estado', dataIndex: 'estado', render: (_,{estado})=>{
            switch(estado){
                case 'GENERADO': return <Tag color="blue-inverse">Generado</Tag>
                case 'ENVIADO': return <Tag color="volcano">Enviado</Tag>
                case 'INGRESADO': return <Tag color="green-inverse">Ingresado</Tag>
                case 'ANULADO': return <Tag color="red-inverse">Anulado</Tag>
            }
        }},
        {
            title: 'Acciones', dataIndex: 'idenvio', key: 'idenvio',
            render: 
                (_,{idenvio, estado})=>{
                    return (<>
                        <CustomModal openButtonText="Detalle Envio" title="Detalle Envio" onOk={()=>{}}>
                            <PrinterWrapper>
                                <InformeEnvio idenvio={idenvio}/>
                            </PrinterWrapper>
                        </CustomModal>
                         &nbsp;
                        <CustomModal openButtonText="Imprimir Codigos Barra" title="Imprimir Codigos Envio" onOk={()=>{}}>
                            <PrinterWrapper>
                                <CodigosDeBarraEnvio idenvio={idenvio}/>
                            </PrinterWrapper>
                        </CustomModal>
                       {/* <CustomModal openButtonText="Imprimir Codigos QR" title="Imprimir Codigos Envio" onOk={()=>{}}>
                            <CodigosQR idenvio={idenvio}/>
                        </CustomModal>
                         &nbsp;*/}
                        <Button  size="small" disabled={estado!='GENERADO'} danger   onClick={()=>{anular(idenvio)}}>Anular</Button>
                    </>    )                
                }
            
        }
    ]

    const anular = (idvenvio) =>
    {
        if(!confirm("Anular Envio?"))
        {
            return
        }
        fetch(urls.get.anular_envio + idvenvio)
        .then(r=>r.json())
        .then((response)=>{
            setUpdate(!update)
            alert("OK")
        })
    }

    useEffect(()=>{
        fetch(urls.get.lista_envios)
        .then(response=>response.json())
        .then((response)=>{
            //parse
            let _data = response.data.map((e)=>({
                idenvio:e.idenvio,
                sucursal_origen: e.origen,
                sucursal_idsucursal: e.sucursal,
                cantidad_total: e.cantidad_total,
                fecha: e.fecha,
                estado: e.estado,
            }))

            setData(_data);
        })
    },[update])

    return(
        <>
        <Row>
            <Col span={24}>
            <h2 >Env&iacute;os</h2>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <ExportToCSV 
                parseFnt={
                    ()=>{
                        let str = "Nro., Sucursal Origen, Sucursal Destino, Cantidad Total, Fecha, Estado,\r\n"
                        data.forEach(r=>{
                            str+=`${r.idenvio},${r.sucursal_origen},${r.sucursal_idsucursal},${r.cantidad_total},${r.fecha},${r.estado},\r\n`
                        })

                        return str;
                    }
                }
                />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            <Table
            columns={columns}
            dataSource={data}
        />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
        

        
        </>
    )
}

export default ListaEnvios;