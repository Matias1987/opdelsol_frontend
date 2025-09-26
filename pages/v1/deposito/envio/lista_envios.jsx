import CustomModal from "@/components/CustomModal";
import ExportToCSV from "@/components/ExportToCSV";
import PrinterWrapper from "@/components/PrinterWrapper";
import CodigosDeBarraEnvio from "@/components/informes/CodigosDeBarra";
import InformeEnvio from "@/components/informes/InformeEnvio";
import { get } from "@/src/urls";

import { Table, Button, Tag, Row, Col, Card, Input } from "antd";

import { useEffect, useState } from "react";

export default function  ListaEnvios(props){
    const [data,setData] = useState([])
    const [update, setUpdate] = useState(false)
    const [filtro, setFiltro] = useState("")
    const columns = [
        {width:"100px",title: 'Nro.', dataIndex: 'idenvio', key: 'idenvio'},
        {width:"100px",title: 'Fecha', dataIndex: 'fecha', key: 'fecha'},
        {width:"250px",title: 'Sucursal Origen', dataIndex: 'sucursal_origen', key: 'sucursal_idsucursal'},
        {width:"250px",title: 'Sucursal Destino', dataIndex: 'sucursal_idsucursal', key: 'sucursal_idsucursal'},
        {width:"250px",title: 'Cantidad', dataIndex: 'cantidad_total', key: 'cantidad_total'},
        {width:"250px",title: 'Estado', dataIndex: 'estado', render: (_,{estado})=>{
            switch(estado){
                case 'GENERADO': return <Tag color="blue-inverse">Generado</Tag>
                case 'ENVIADO': return <Tag color="volcano">Enviado</Tag>
                case 'INGRESADO': return <Tag color="green-inverse">Ingresado</Tag>
                case 'ANULADO': return <Tag color="red-inverse">Anulado</Tag>
            }
        }},
        {width:"250px",
            title: 'Acciones', dataIndex: 'idenvio', key: 'idenvio',
            render: 
                (_,{idenvio, estado})=>{
                    return (<>
                        <CustomModal openButtonText="Detalle Envio" title="Detalle Envio" onOk={()=>{}}>
                            <PrinterWrapper>
                                <InformeEnvio idenvio={idenvio} exportEnabled/>
                            </PrinterWrapper>
                        </CustomModal>
                         &nbsp;
                        <CustomModal openButtonText="Imprimir Codigos Barra" title="Imprimir Codigos Envio" onOk={()=>{}}>
                            <CodigosDeBarraEnvio idenvio={idenvio}/>
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
        fetch(get.anular_envio + idvenvio)
        .then(r=>r.json())
        .then((response)=>{
            setUpdate(!update)
            alert("OK")
        })
    }

    useEffect(()=>{
        fetch(get.lista_envios)
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
        <Card
            size="small"
            title="Lista de envíos"
            extra={<><Input allowClear prefix={"Nro.: "} value={filtro} onChange={e=>{setFiltro((e.target.value||"").toUpperCase())}} /></>}
            >
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
                size="small"
                scroll={{y:"450px"}}
                columns={columns}
                dataSource={filtro != "" ? data.filter(item => item.idenvio.toString().includes(filtro)) : data}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} 
            />
                </Col>
            </Row>
        </Card>

        
        </>
    )
}

//export default ListaEnvios;