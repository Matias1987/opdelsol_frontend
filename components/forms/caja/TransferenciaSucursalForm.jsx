import LoadSelect from "@/components/LoadSelect"
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"

const { default: SucursalSelect } = require("@/components/SucursalSelect")
const { default: globals } = require("@/src/globals")
const { Row, Col, Button, Input, Modal, Divider } = require("antd")
const { useState } = require("react")

const TransferenciaSucursalForm = (props) => {
    const [open, setOpen] = useState(false)
    const [transferencia, setTransferencia] = useState({
        fkorigen: globals.obtenerSucursal(),
        fkcaja: null,
        fkdestino: null,
        monto: 0,
        comentarios: null,
    })

    const onSubmit = () => {

        globals.obtenerCajaAsync((data)=>{

            if(data==null)
            {
                alert("Caja Cerrada")
                return;
            }

            transferencia.fkcaja=data.idcaja

            //alert(JSON.stringify(transferencia))

            if(!confirm("Confirmar transferencia")){
                return;
            }
        
            post_method(post.insert.transferencia, transferencia,(response)=>{
                //alert(JSON.stringify(response))
                setOpen(false)
                props?.callback?.()
            })

        })


        
    }

    return (<>
    <Button type="link" onClick={(e)=>{setOpen(true)}}>Agregar Transferencia</Button>
    <Modal open={open} onCancel={()=>{setOpen(false)}} footer={null}>
        <h3>Transferencia a Sucursal</h3>
        <Row style={{padding: ".25em"}}>
            <Col>
                Sucursal:&nbsp;&nbsp;
            </Col>
            <Col>
            <LoadSelect
                    parsefnt = {
                        (data) =>(
                            data.map((row)=>(
                                {
                                    "value": row.idsucursal,
                                    "label": row.nombre
                                }
                            ))
                        )
                    }
                    fetchurl={get.sucursales} 
                    callback={(id)=>{setTransferencia(t=>({...t,fkdestino:id}))}   }   
            />
                
            </Col>
        </Row>
        <Row style={{padding: ".25em"}}>
            <Col>
                Monto:&nbsp;&nbsp;
            </Col>
            <Col>
                <Input value={transferencia.monto} onChange={(e)=>{setTransferencia(t=>({...t,monto:e.target.value}))}}/>
            </Col>
        </Row>
        <Row style={{padding: ".25em"}}>
            <Col>
                Comentarios:&nbsp;&nbsp;
            </Col>
            <Col>
                <Input value={transferencia.comentarios} onChange={(e)=>{setTransferencia(t=>({...t,comentarios:e.target.value}))}} />
            </Col>
        </Row>
        <Row style={{padding: ".25em"}}>
            <Col>
            <Divider />
                <Button type="primary" block onClick={onSubmit}>Aceptar</Button>
            </Col>
        </Row>
    </Modal>
    </>)
}

export default TransferenciaSucursalForm