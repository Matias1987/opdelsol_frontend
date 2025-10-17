import LayoutAdmin from "@/components/layout/layout_admin";
import { post_method } from "@/src/helpers/post_helper";
import { Col, Input, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";

export default function monto_ventas_mes(){
    const [anio, setAnio] = useState(2025)
    const [mes, setMes] = useState(10)
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {width:"150px", title:"Optica"},
        {width:"150px", title:<div style={{textAlign:"right"}}>Efectivo</div>, render:(_,record)=><div style={{textAlign:"right"}}>{record.monto}</div>},
        {width:"150px", title:<div style={{textAlign:"right"}}>Tarjeta</div>, render:(_,record)=><div style={{textAlign:"right"}}>{record.monto}</div>},
        {width:"150px", title:<div style={{textAlign:"right"}}>Mercado Pago</div>, render:(_,record)=><div style={{textAlign:"right"}}>{record.monto}</div>},
        {width:"150px", title:<div style={{textAlign:"right"}}>Transferencia</div>, render:(_,record)=><div style={{textAlign:"right"}}>{record.monto}</div>},
        {width:"150px", title:<div style={{textAlign:"right"}}>Cheque</div>, render:(_,record)=><div style={{textAlign:"right"}}>{record.monto}</div>},
        {width:"150px", title:<div style={{textAlign:"right"}}>Mutual</div>, render:(_,record)=><div style={{textAlign:"right"}}>{record.monto}</div>},
        {width:"150px", title:"Acciones"},
    ]

    const load = ()=>{
        post_method("", {mes,anio},response=>{
            setDataSource(response.data.map(r=>({

            })))
        })
    }

    useEffect(_=>{
        load();
    },[])

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre"]
    return <>
    <Row>
        <Col span={24}>
            Totales Ventas Mes por Sucursal
        </Col>
    </Row>
    <Row gutter={16}>
        <Col>
            <Select options={meses.map((m, index)=>({value: index, label:m}))} onChange={v=>{setMes(v)}} />
        </Col>
        <Col>
            <Input value={anio} type="number" onChange={(e)=>{setAnio(parseInt(e.target.value||"2025"))}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{y:"600px"}} />
        </Col>
    </Row>
    </>
}

monto_ventas_mes.PageLayout = LayoutAdmin;  