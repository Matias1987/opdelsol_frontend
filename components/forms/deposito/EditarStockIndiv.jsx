import FacturaSelect from "@/components/FacturaSelect";
import { post_method } from "@/src/helpers/post_helper";
import { parse_int_string } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import { Button, Checkbox, Col, Input, Modal, Row, Spin } from "antd";
import { useState } from "react";
/**
 * 
 * @param nrofactura
 * @param idfactura
 * 
 */
const EditarStockIndiv = (props) => {
    const [stock ,setStock] = useState(null)
    const [open, setOpen] = useState(false)
    const [codigo, setCodigo] = useState(null)
    const [idfactura, setIdFactura] = useState(-1)
    const [editarCosto, setEditarCosto] = useState(false)
    const [costo, setCosto] = useState(0)
    const [factura, setFactura] = useState(null)
    const onOpen = () => {

        setOpen(true)
        setEditarCosto(false)
        setIdFactura(typeof props.idfactura==='undefined' ? -1 : props.idfactura)
        fetch(get.obtener_stock_sucursal + `${props.idsucursal}/${props.idcodigo}`)
        .then(r=>r.json())
        .then((response)=>{
            
            setStock(response.data[0])
        })


        fetch(get.detalle_codigo + props.idcodigo)
        .then(r=>r.json())
        .then((response)=>{
            setCodigo({
                idcodigo: response.data[0].idcodigo,
                codigo: response.data[0].codigo,
                //costo: response.data[0].costo,
                
                precio: response.data[0].precio,
                descripcion: response.data[0].descripcion,
            })
        })
        .catch(er=>{console.log(er)})
    }
    const onClose = () => {
        setOpen(false)
    }


    const guardarCambios = () => {
        post_method(post.update.modificar_cantidad_stock,{
            idfactura: idfactura,
            cantidad:stock.cantidad,
            fksucursal:props.idsucursal,
            idcodigo:props.idcodigo,
            costo: editarCosto ? costo : -1,
        },
        (response)=>{
            alert("OK")
            props?.callback?.()
            setOpen(false)
        }
        )
    }

    return <>
    <Button onClick={onOpen} type="primary">{props.buttonText}</Button>
        <Modal title={"Editar Cantidad Stock"} open={open} onCancel={onClose} footer={null} width={"60%"} destroyOnClose={true}>
            {stock==null || codigo==null ? <Spin /> : 
            <>
            <Row style={{padding:"1em"}}>
                <Col span={24}>
                    <Input style={{backgroundColor:"lightyellow"}} readOnly prefix="Código: " value={codigo.codigo}/>
                </Col>
            </Row>

            {
                ( props.idfactura || null ) == null ? 
                <Row style={{padding:"1em"}}>
                    <Col span={24}>
                        Factura:&nbsp;
                        <FacturaSelect callback={(id)=>{
                            setIdFactura(id)
                        }}/>
                    </Col>
                </Row>
                : 
                <Row>
                    <Col span={24}>
                        Factura: 0-000-888
                    </Col>
                </Row>    
        }
            <Row style={{padding:"1em"}}>
                <Col span={3}>
                    <Checkbox onChange={()=>{setEditarCosto(!editarCosto)}} checked={editarCosto}>Costo</Checkbox>
                </Col>
                <Col span={21}>
                    <Input type="number" disabled={!editarCosto} value={costo} onChange={(e)=>{setCosto(parseInt(e.target.value))}}/>
                </Col>
            </Row>
            <Row style={{padding:"1em"}}>
                <Col span={24}>
                    <Input prefix={<b>Cantidad: </b>} value={stock.cantidad} onChange={(e)=>{
                        setStock(
                            s=>(
                                {...s,"cantidad":parse_int_string(((e.target?.value?.toString())||"").toString())}))
                    }} />  
                </Col>
            </Row>
            <Row style={{padding:"1em"}}>
                <Col span={24}>
                    <Button  block type="primary" onClick={guardarCambios}>Guardar Cambios</Button>
                </Col>
            </Row>
            </>
            }
        </Modal>
    </>
}

export default EditarStockIndiv;