import { Col, Divider, Row, Table, Tag } from "antd";
import SaldoCtaCte from "./SaldoCtaCte";
import { useEffect, useState } from "react";
import { get } from "@/src/urls";
import VentaDetallePopup from "./VentaDetalle";
import EdicionClientePopup from "./forms/EdicionCliente";
import LlamadasCliente from "./LLamadasCliente";
import Edad from "./Edad";

const DetalleCliente = (props) =>
{
    const [reload, setReload] = useState(false)
    const [data, setData] = useState(null)
    const [ventas, setVentas] = useState([])
    
    const columns = [
        {dataIndex: "idventa", title: "Nro."},
        {dataIndex: "sucursal", title: "Sucursal", render:(_,{sucursal})=>{return <Tag>{sucursal}</Tag>}},
        {dataIndex: "tipo", title: "Tipo", render:(_,{tipo})=>{
            switch(+tipo)
            {
                case 1: return <b>DIRECTA</b>; 
                case 2: return <b>REC STOCK</b>; 
                case 3: return <b>LC STOCK</b>; 
                case 4: return <b>MONOF LAB</b>; 
                case 5: return <b>MULTI LAB</b>; 
                case 6: return <b>LC LAB</b>; 
            }
        }},
        {dataIndex: "fecha", title: "Fecha"},
        {dataIndex: "idventa", title:"", render:(_,{idventa})=>{
            return <><VentaDetallePopup idventa={idventa} /></>
        }}
    ]
    useEffect(()=>{
        fetch(get.cliente_por_id + props.idcliente)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            if(response==null)
            {
                return
            }
            if((response.data||[]).lenth<1)
            {
                return
            }
            let arr=[]
            let now = new Date()
            let _d = now.getDate()
            let _m = now.getMonth() +1 
            let _y = now.getFullYear()
            try {
                arr = response.data[0].fecha_nacimiento_f.split("-")
                _d = arr[0]
                _m = arr[1]
                _y = arr[2]
            } catch (error) {
                console.log("error trying to extract birthdate parts, continuing anyway...")
            }
            
            setData({
                nombre: response.data[0].nombre,
                apellido: response.data[0].apellido,
                dni: response.data[0].dni,
                telefono: response.data[0].telefono1,
                direccion: response.data[0].direccion,
                idcliente: response.data[0].idcliente,
                bloqueado: response.data[0].bloqueado,
                fecha_nacimiento_f: response.data[0].fecha_nacimiento_f,
                dia:_d,
                mes:_m,
                anio:_y,
            })
        })
       // alert(get.cliente_ventas_gral + props.idcliente)
        fetch(get.cliente_ventas_gral + props.idcliente)
        .then(response=>response.json())
        .then((response)=>{
            setVentas(
                response.data.map(
                    r=>({
                        idventa: r.idventa,
                        sucursal: r.sucursal,
                        tipo: r.tipo,
                        fecha: r.fecha_f,

                    })
                )
            )
        })
        
    },[reload])
    return data == null ? <></>:
     <>
     <Divider />
     <Row>
        <Col span={12}>
            <Row>
                <Col span={6}>Apellido y nombre:</Col>
                <Col span={18}><b>{data.apellido + " " + data.nombre}</b></Col>
            </Row>
            <Row>
                <Col span={6}>DNI:</Col>
                <Col span={18}><b>{data.dni}</b></Col>
            </Row>
            <Row>
                <Col span={6}>Tel&eacute;fono:</Col>
                <Col span={18}><b>{data.telefono}</b></Col>
            </Row>
            <Row>
                <Col span={6}>Direcci&oacute;n:</Col>
                <Col span={18}><b>{data.direccion}</b></Col>
            </Row>
        </Col>
        <Col span={12}>
            <Row>
                <Col span={6}>Fecha de Nacimiento</Col>
                <Col span={18}>{data.fecha_nacimiento_f}</Col>
            </Row>
            <Row>
                <Col span={6}>Edad</Col>
                <Col span={18}><Edad dia={data.dia} mes={data.mes} anio={data.anio} /> </Col>
            </Row>
        </Col>
     </Row>
    
    <Row>
        <Col span={24}>
            <EdicionClientePopup callback={()=>{setReload(!reload)}} idcliente={props.idcliente} />
        </Col>
    </Row>
    {
        data.bloqueado==1 ? <><Row><Col span={24}> <Tag color="red">BLOQUEADO</Tag> </Col></Row></>:<></>
    }
    <Row>
        <Col span={"24"}>
            <span style={{color:"blueviolet"}}><SaldoCtaCte idcliente={data.idcliente} /></span>
        </Col>
    </Row>
    <Row>
        <Col span={14}>
            <hr />
            <b>Ventas</b>
            <Table  dataSource={ventas} columns={columns} />
        </Col>
        <Col span={10}>
            <LlamadasCliente idcliente={data.idcliente} />
        </Col>
    </Row>
    </>
}

export default DetalleCliente;