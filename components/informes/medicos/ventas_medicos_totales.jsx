import PrinterWrapper from "@/components/PrinterWrapper";
import { post_method } from "@/src/helpers/post_helper";
import { parse_int_string } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import { Button, Col, Divider, Input, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import VentasMedicos from "./ventas_medicos";
import ExportToCSV from "@/components/ExportToCSV";

const ListaVentasMedicosTotales = (props) => {
    const [dataSource, setDataSource] = useState([])
    
    const [mes, setMes]=useState(1)
    const [anio, setAnio]=useState(1)
    const [nombre, setNombre] = useState("")
    const [idsucursal , setIdSucursal] = useState(-1)
    const [nombreSucursal , setNombreSucursal] = useState(-1)
    const [sucursales, setSucursales] = useState([])
    const columns =[ 
        {width:"200px", dataIndex: 'medico', title:'medico'},
        {width:"200px", dataIndex: 'efectivo', title: 'efectivo', render:(_,obj)=><div style={{textAlign:"right"}}>{parseFloat(obj.efectivo).toLocaleString(2)}</div>},
        {width:"200px", dataIndex: 'tarjeta', title: 'tarjeta', render:(_,obj)=><div style={{textAlign:"right"}}>{parseFloat(obj.tarjeta).toLocaleString(2)}</div>},
        {width:"200px", dataIndex: 'cheque', title: 'cheque', render:(_,obj)=><div style={{textAlign:"right"}}>{parseFloat(obj.cheque).toLocaleString(2)}</div>},
        {width:"200px", dataIndex: 'ctacte', title: 'ctacte', render:(_,obj)=><div style={{textAlign:"right"}}>{parseFloat(obj.ctacte).toLocaleString(2)}</div>},
        {width:"200px", dataIndex: 'mutual', title: 'mutual', render:(_,obj)=><div style={{textAlign:"right"}}>{parseFloat(obj.mutual).toLocaleString(2)}</div>},
        {width:"200px", dataIndex: 'mercadopago', title: 'mercadopago', render:(_,obj)=><div style={{textAlign:"right"}}>{parseFloat(obj.mercadopago).toLocaleString(2)}</div>},
        {width:"200px", dataIndex: 'transferencia', title: 'transferencia', render:(_,obj)=><div style={{textAlign:"right"}}>{parseFloat(obj.transferencia).toLocaleString(2)}</div>},
        {width:"200px", dataIndex: 'idmedico', title: '', render:(_,{idmedico,medico})=>{
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
                        mercadopago: r.mercadopago,
                        transferencia: r.transferencia,
                    }))
                )
            }
        }
        )
    }

    return <>
    <Row>
        <Col span={24}>
            <h3>Ventas por M&eacute;dicos</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <b>Filtros:</b>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input style={{width:"150px"}} type="number" min={1} max={12} value={mes} onChange={(e)=>{setMes(parse_int_string(e.target.value))}} prefix="Mes: " />
        
            <Input style={{width:"150px"}} type="number" min={2023} value={anio}  onChange={(e)=>{setAnio(parse_int_string(e.target.value))}} prefix="Año: " />
        
            <Input  style={{width:"200px"}} value={nombre} onChange={(e)=>{setNombre(e.target.value)}} prefix="Nombre: " />
        </Col>
        
        
    </Row>
    <Row>
        <Col span={4}>
            <Select  prefix={<span style={{fontWeight:"bold", overflow:"hidden"}}>Sucursal:&nbsp;</span>}   style={{width:"230px", overflow:"hidden"}} options={sucursales} placeholder="Seleccione sucursal" onChange={
                (v)=>{setIdSucursal(v)
                let n=""
                sucursales.forEach(s=>{
                  
                    if(s.value==v){n=s.label}
                })
                
                setNombreSucursal(n)
                }
                }/>
       
            <Button onClick={init_totales} type="primary">Aplicar</Button>
        </Col>
    </Row>
    
    <Row>
        <Col span={24}>
        <Divider />
        <b>Totales ventas M&eacute;dicos periodo {mes}-{anio}</b>
        <Table 
        scroll={{y:"450px"}} 
        columns={columns} 
        dataSource={dataSource} 
        pagination={false} 
        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
        />
        </Col>
    </Row>

    <Row>
        <Col span={24}>
            <ExportToCSV 
                fileName={`ventas_medicos_${mes}-${anio}`}
                parseFnt={()=>{
                    let str = ""
                    str+=`MES:,${mes}, ANIO:,${anio}, ,,,\r\n`
                    str+=`SUCURSAL:,${nombreSucursal}, ,, ,,,\r\n`
                    str+="MEDICO, EFECTIVO, TARJETA,  CHEQUE, CTACTE, MUTUAL, MERCADOPAGO,TRANSFERENCIA,\r\n"
                    dataSource.forEach(r=>{
                        str+=`${r.medico},${r.efectivo},${r.tarjeta},${r.cheque},${r.ctacte},${r.mutual},${r.mercadopago},${r.transferencia},\r\n`
                    })
                    return str
                }}
             />
           
        </Col>
    </Row>
    
    </>
}

export default ListaVentasMedicosTotales;