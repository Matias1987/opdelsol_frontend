import FacturaSelect from "@/components/FacturaSelect";
import { post_method } from "@/src/helpers/post_helper";
import { parse_int_string } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import { Button, Checkbox, Col, Input, Modal, Row, Spin, Tag } from "antd";
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
    const [incrementarCantidad, setIncrementarCantidad] = useState(false)
    const [cantInput, setCantInput] = useState(0)
    const [costo, setCosto] = useState(0)
    
    //const [factura, setFactura] = useState(null)
    const onOpen = () => {
       setCantInput(0)
        setOpen(true)
        setEditarCosto(false)
        setIdFactura(typeof props.idfactura==='undefined' ? -1 : props.idfactura)
        fetch(get.obtener_stock_sucursal + `${props.idsucursal}/${props.idcodigo}`)
        .then(r=>r.json())
        .then((response)=>{
            
            setStock({...response.data[0], cant_ant:response.data[0].cantidad})
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
        let _idfactura = idfactura
        if(props.factura!=null)
        {
            _idfactura=props.factura.idfactura
        }
        post_method(post.update.modificar_cantidad_stock,{
            idfactura: _idfactura,
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

    const actualizar_cantidad = (v, inc) => {
        setStock(
            s=>(
                {...s,"cantidad":(inc ? parseInt( stock.cant_ant ) : 0) +parse_int_string(((v.toString())||"").toString())}))
    }

    return <>
    <Button onClick={onOpen} type="primary" size="small">{props.buttonText}</Button>
        <Modal title={"Editar Cantidad Stock"} open={open} onCancel={onClose} footer={null} width={"60%"} destroyOnClose={true}>
            {stock==null || codigo==null ? <Spin /> : 
            <>
            <Row style={{padding:"1em"}}>
                <Col span={24}>
                    <Input style={{backgroundColor:"lightyellow"}} readOnly prefix="Código: " value={codigo.codigo}/>
                </Col>
            </Row>

            {
                props.factura  == null ? 
                <Row style={{padding:"1em"}}>
                    <Col span={24}>
                        Factura: (Opcional)&nbsp;
                        <FacturaSelect callback={(id)=>{
                            setIdFactura(id)
                        }}/>
                    </Col>
                </Row>
                : 
                <Row style={{padding:"1em"}}>
                    <Col span={24}>
                       <Tag color="geekblue-inverse" style={{fontSize:"1.25em"}} > Factura: {props.factura.nro} </Tag>
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
                    <Input readOnly prefix={<b>Cantidad Actual: </b>} value={stock.cant_ant}  />  
                </Col>
            </Row>
            <Row style={{padding:"1em"}}>
                <Col span={24}>
                    <Input 
                    style={{backgroundColor:"lightblue"}}
                    prefix={<><Checkbox  checked={incrementarCantidad} onChange={()=>{
                        setIncrementarCantidad(!incrementarCantidad)
                        actualizar_cantidad(cantInput,!incrementarCantidad)
                    }}
                    >Sumar
                    </Checkbox><b>Cantidad: </b></>} 
                    value={cantInput} 
                    onChange={(e)=>{
                        //alert(((e.target.value.toString())||"").toString())
                        setCantInput(parse_int_string((e.target.value.toString())||"").toString())
                        actualizar_cantidad(parse_int_string(((e.target.value.toString())||"").toString()), incrementarCantidad)
                    }} />  
                </Col>
            </Row>
            <Row style={{padding:"1em"}}>
                <Col span={24}>
                    <Input readOnly prefix={<b>Nueva Cantidad: </b>} value={stock.cantidad}  />  
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