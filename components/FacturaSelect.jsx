import { get } from "@/src/urls"
import { DeleteFilled } from "@ant-design/icons"
import { Button, Col, Row } from "antd"
import { useState } from "react"
import LoadSelect from "./LoadSelect"



const FacturaSelect = (props) =>{ 

    const _reload = typeof props.reload === 'undefined' ? false : props.reload;

    const [idProveedor, setIdProveedor] = useState(-1) 

    return (
        <>
        
        <Row>
            <Col span={24}>
            <LoadSelect 
                prefix="Proveedor: "
                reload={_reload}
                fetchurl = {get.lista_proveedores}
                parsefnt = {
                    (data) => {
                        return [...[{value:0,label:"Todos"}], ...data.map((row)=>(
                            {
                                "value": row.idproveedor,
                                "label": row.nombre
                            }
                        )
                        )]
                    }
                }
                callback = {
                    (id) => {
                        //alert("prov id " + id)
                        setIdProveedor(id)
                    }
                }
            
            />
            </Col>
        </Row>
        
                { idProveedor<0 ? <>...</> :
                    (
                        <>
                       
                        <Row>
                            <Col span={24}>
                                    <LoadSelect 
                                    prefix="Factura: "
                                    key={idProveedor}
                                    reload={_reload}
                                    fetchurl = {get.lista_facturas  + idProveedor}
                                    parsefnt = {
                                        (data)=>{
                                            return data.map((row)=>(
                                                {
                                                    value: row.idfactura,
                                                    label: row.numero
                                                }
                                            ))
                                        }
                                    }
                                    callback = {
                                        (id) => {
                                            props.callback(id)
                                        }
                                    }
                                />
                                </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Button size="small" danger onClick={()=>{setIdProveedor(-1);  props.callback(-1)}}><DeleteFilled /></Button>
                            </Col>
                        </Row>
                        </>
                )
                }
           
   
    
    </>
    
    )}
    
export default FacturaSelect;



    

