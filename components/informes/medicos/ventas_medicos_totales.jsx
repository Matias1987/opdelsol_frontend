import PrinterWrapper from "@/components/PrinterWrapper";
import { post_method } from "@/src/helpers/post_helper";
import { parse_int_string } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import VentasMedicos from "./ventas_medicos";
import ExportToCSV from "@/components/ExportToCSV";

const ListaVentasMedicosTotales = (props) => {
    const [dataSource, setDataSource] = useState([])
    
    const [mes, setMes]=useState(1)
    const [anio, setAnio]=useState(1)
    const [nombre, setNombre] = useState("")
    const [idsucursal , setIdSucursal] = useState(-1)
    const [sucursales, setSucursales] = useState([])
    const columns =[ 
        {dataIndex: 'medico', title:'medico'},
        {dataIndex: 'efectivo', title: 'efectivo'},
        {dataIndex: 'tarjeta', title: 'tarjeta'},
        {dataIndex: 'cheque', title: 'cheque'},
        {dataIndex: 'ctacte', title: 'ctacte'},
        {dataIndex: 'mutual', title: 'mutual'},
        {dataIndex: 'idmedico', title: '', render:(_,{idmedico,medico})=>{
            return <><VentasMedicos className="test" nombre_medico={medico} mes={mes} anio={anio} idmedico={idmedico}idsucursal={idsucursal} /></>
        }}
    ]

    useEffect(()=>{
        const d = new Date()
        setMes(d.getMonth()+1)
        setAnio(d.getFullYear())
        /* get sucursales */
        fetch(get.sucursales)
        .then(r=>r.json())
        .then(r=>{
            if(((r||null)?.data||null)!=null)
            {
                setSucursales([...[{label:"-", value:-1}],...r.data.map(s=>({label: s.nombre,value: s.idsucursal,}))])
            }
        })
        .catch(ex=>{console.log(ex)})
    },[])

    const init_totales =()=> {
        
        //alert(post.totales_ventas_medicos)
        post_method(post.totales_ventas_medicos,
        {
            mes: mes,
            anio: anio,
            nombre: nombre,
            idsucursal: idsucursal,
        },
        (response)=>{
            //alert(JSON.stringify(response))
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
            <ExportToCSV 
                parseFnt={()=>{
                    let str = ""
                    str+=`MES:,${mes}, ANIO:,${anio}, ,\r\n`
                    str+=`SUCURSAL:,${idsucursal}, ,, ,\r\n`
                    str+="MEDICO, EFECTIVO, TARJETA,  CHEQUE, CTACTE, MUTUAL\r\n"
                    dataSource.forEach(r=>{
                        str+=`${r.medico},${r.efectivo},${r.tarjeta},${r.cheque},${r.ctacte},${r.mutual}\r\n`
                    })
                    return str
                }}
             />
        </Col>
    </Row>
    <Row>
        <Col span={1}>
            <b>Filtros:</b>
        </Col>
        <Col span={4}>
            <Input type="number" min={1} max={12} value={mes} onChange={(e)=>{setMes(parse_int_string(e.target.value))}} prefix="Mes: " />
        </Col>
        <Col span={4}>
            <Input type="number" min={2023} value={anio}  onChange={(e)=>{setAnio(parse_int_string(e.target.value))}} prefix="Año: " />
        </Col>
        <Col span={4}>
            <Input  value={nombre} onChange={(e)=>{setNombre(e.target.value)}} prefix="Nombre: " />
        </Col>
        <Col span={1} style={{textAlign:"right", paddingTop:".2em"}}>
            Sucursal:
        </Col>
        <Col span={4}>
            <Select style={{width:"200px"}} options={sucursales} placeholder="Seleccione sucursal" onChange={(v)=>{setIdSucursal(v)}}/>
        </Col>
        <Col span={4}>
            <Button onClick={init_totales} type="primary">Aplicar</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <PrinterWrapper>
                <b>Totales ventas M&eacute;dicos periodo {mes}-{anio}</b>
                <Table columns={columns} dataSource={dataSource} pagination={false} />
            </PrinterWrapper>
        </Col>
    </Row>
    
    </>
}

export default ListaVentasMedicosTotales;