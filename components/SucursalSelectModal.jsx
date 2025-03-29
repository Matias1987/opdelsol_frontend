import {Button, Col, Modal, Row, Select} from "antd"
import SucursalSelect from "./SucursalSelect"
import { useEffect, useState } from "react"
import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"
import useStorage from "@/useStorage"

const SucursalSelectModal = (props) => {
    const [open, setOpen] = useState(false)
    const [selectedSucursal, setSelectedSucursal] = useState(null)

    const [sucursales, setSucursales] = useState([])

    useEffect(()=>{
        
        fetch(get.sucursales)
        .then(r=>r.json())
        .then(response=>{
            setSucursales(
                [
                    ...[{label:"-", value:"-1"}],
                    ...response.data.map(r=>({
                        label: r.nombre,
                        value: r.idsucursal,
                        idoptica: r.fkoptica,
                        //useTaller: r.set_env_op_taller,
                    }))
                ]
            )

            if(globals.esUsuarioAdmin())
            {
                setSelectedSucursal(-1)
                props.callback(-1)
                return;
            }

            if(response.data.length==1)
            {
                setSelectedSucursal(response.data[0].idsucursal)
                props.callback(response.data[0].idsucursal)
            }
            else{
                if(typeof globals.obtenerUID()!== 'undefined')
                {
                    if(null==selectedSucursal)
                    {
                        setOpen(true)
                    }
                }
            }
        })
    },[])

    const on_sucursal_selected = (id) => {
        const obj = sucursales.find(s=>s.value==id)
        if(typeof obj !== 'undefined')
        {
            globals.establecerOptica(obj.idoptica)
        }
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
            width={"700px"}
            footer={null}
            closable={false}
            open={open}
            maskClosable={false}
            title="Seleccione Sucursal"
        >
            <Row>
                <Col span={24} style={{padding:"1em"}}>
                    <Select onChange={(v)=>{on_sucursal_selected(v)}} options={sucursales} style={{width:"100%"}} />
                </Col>
                <Col span={24}>
                    <Button disabled={selectedSucursal==null || selectedSucursal<0} type="primary" block onClick={()=>{aplicar()}}>Seleccionar</Button>
                </Col>
            </Row>
        </Modal>
    </>
}

export default SucursalSelectModal;