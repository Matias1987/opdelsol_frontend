import {Button, Col, Modal, Row} from "antd"
import SucursalSelect from "./SucursalSelect"
import { useEffect, useState } from "react"
import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import useStorage from "@/useStorage"

const SucursalSelectModal = (props) => {
    const [open, setOpen] = useState(false)
    const [selectedSucursal, setSelectedSucursal] = useState(null)

    useEffect(()=>{
        if(typeof globals.obtenerUID()!== 'undefined')
        {
            if(null==selectedSucursal)
            {
                setOpen(true)
            }
        }
        
    },[])

    const on_sucursal_selected = (id) => {
        globals.establecerSucursal(id)
        setSelectedSucursal(id)
        
    }

    const aplicar = () => {
        post_method(post.user_credentials,
            {
                idusuario: globals.obtenerUID(),
                idsucursal: selectedSucursal,
            },
            (res)=>{
                const {setItem} = useStorage();
                
                setItem("ventas",       res.data[0].ventas)
                setItem("caja1",        res.data[0].caja1)
                setItem("caja2",        res.data[0].caja2)
                setItem("deposito_min", res.data[0].deposito_min)
                setItem("deposito",     res.data[0].deposito)
                setItem("admin1",       res.data[0].admin1)
                setItem("admin2",       res.data[0].admin2)
                setItem("laboratorio",  res.data[0].laboratorio)
                
                setOpen(false)
               
                props?.callback?.(selectedSucursal)
            }
        )
    }

    return <>
        <Modal
            width={"60%"}
            footer={null}
            closable={false}
            open={open}
            maskClosable={false}
            title="Seleccione Sucursal"
        >
            <Row>
                <Col span={24} style={{padding:"1em"}}>
                    <SucursalSelect callback={(id)=>{
                        on_sucursal_selected(id)
                        
                    }} />
                </Col>
                <Col span={24}>
                    <Button disabled={selectedSucursal==null} type="primary" block onClick={()=>{aplicar()}}>Aplicar</Button>
                </Col>
            </Row>
        </Modal>
    </>
}

export default SucursalSelectModal;