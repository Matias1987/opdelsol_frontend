import { get } from "@/src/urls"
import { CloseOutlined, DeleteFilled } from "@ant-design/icons"
import { Button, Col, Row, Select } from "antd"
import { useEffect, useState } from "react"



const FacturaSelect2 = (props) =>{ 

    
    const [idProveedor, setIdProveedor] = useState(-1) 
    const [proveedores, setProveedores] = useState([])
    const [idFactura, setIdFactura] = useState(-1)
    const [facturas, setFacturas] = useState([])

    useEffect(()=>{
        if(proveedores.length<1)
        {
            load_proveedores()
        }
        
        load_facturas()
    },[idProveedor])

    const load_proveedores = _ => {
        fetch(get.lista_proveedores)
        .then(r=>r.json())
        .then((response)=>{
            setProveedores([...[{value:-1,label:"Seleccione Proveedor"}], ...response.data.map((row)=>(
                {
                    "value": row.idproveedor,
                    "label": row.nombre
                }
            )
            )])
        })
    }

    const load_facturas = _ => {
        fetch(get.lista_facturas  + idProveedor)
        .then(r=>r.json())
        .then((response)=>{
            setFacturas(
                [ ...[{value:-1, label:"Seleccione Factura"}],
                    ...response.data.map((row)=>(
                    {
                        value: row.idfactura,
                        label: row.numero
                    }
                ))
            ]
            
            )
        })
    }

    return (
        <>

        <Row>
            <Col style={{fontSize:".9em", color:"#000435"}} span={24}>
                Proveedor:
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Select options={proveedores} value={idProveedor} onChange={(v)=>{ setIdFactura(-1); setIdProveedor(v);}} style={{width:"100%"}}/>
            </Col>
        </Row>
        
                { idProveedor<0 ? <>...</> :
                    (
                        <>
                        <Row>
                            <Col style={{fontSize:".9em", color:"#000435"}} span={24}>
                                Factura:
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Select options={facturas} value={idFactura} onChange={(v)=>{setIdFactura(v); props.callback(v);}} style={{width:"100%"}} key={idProveedor}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{padding:"1.5em"}}>
                                <Button block size="small" danger onClick={()=>{setIdProveedor(-1); setIdFactura(-1);  props.callback(-1)}}><CloseOutlined /></Button>
                            </Col>
                        </Row>
                        </>
                )
                }
           
   
    
    </>
    
    )}
    
export default FacturaSelect2;



    

