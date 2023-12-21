import { post_method } from "@/src/helpers/post_helper";
import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Col, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ListaVentasMedicosTotales = (props) => {
    const [dataSource, setDataSource] = useState([])
    
    const [mes, setMes]=useState(1)
    const [anio, setAnio]=useState(1)
    const columns =[ 
        {dataIndex: 'medico', title:'medico'},
        {dataIndex: 'efectivo', title: 'efectivo'},
        {dataIndex: 'tarjeta', title: 'tarjeta'},
        {dataIndex: 'cheque', title: 'cheque'},
        {dataIndex: 'ctacte', title: 'ctacte'},
        {dataIndex: 'mutual', title: 'mutual'},
        {dataIndes: 'idmedico', title: '', render:(_,{idmedico})=>{
            return <><Button><InfoCircleFilled /></Button></>
        }}
    ]

    useEffect(()=>{
        const d = new Date()
        setMes(d.getMonth()+1)
        setAnio(d.getFullYear())
    })

    const init_totales =()=> {
        post_method("",
        {
            mes: mes,
            anio: anio,
        },
        (response)=>{
            if(response!=null)
            {
                setDataSource(
                    response.data.map(r=>({
                        medico: r.medico,
                        idmedico: r.medico_idmedico,
                        efectivo: r.efectivo,
                        tarjeta: r.tarjeta,
                        cheque: r.cheque,
                        ctacte: r.ctacte,
                        mutual:r.mutual,
                    }))
                )
            }
        }
        )
    }

    return <>
    <Row>
        <Col span={24}>
        </Col>
    </Row>
    <Row>
        <Col span={4}>
            <b>Peri&oacute;do:</b>
        </Col>
        <Col span={4}>
            <Input type="number" min={1} max={12} value={mes} onChange={(e)=>{setMes(e.target.value)}} prefix="Mes: " />
        </Col>
        <Col span={4}>
            <Input type="number" min={2023} value={anio} onChange={(e)=>{setAnio(e.target.value)}} prefix="Año: " />
        </Col>
        <Col span={4}>
            <Button onClick={init_totales}>Aplicar</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table columns={columns} dataSource={dataSource} />
        </Col>
    </Row>
    
    </>
}

export default ListaVentasMedicosTotales;