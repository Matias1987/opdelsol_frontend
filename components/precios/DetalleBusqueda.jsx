import { regex_get_id_if_match } from "@/src/helpers/barcode_helper";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import {Modal, Row, Col} from "antd"
import { useEffect, useState } from "react"
import StockCodigosSucursales from "../forms/deposito/StockCodigoSucursales";
import ImagenesProducto from "../etc/imagen/imagen_producto";
const PopupDetalleBusqueda = (props) => {
    const [detalleCodigo, setDetalleCodigo] = useState(null)
    useEffect(()=>{
        if(props.open)
        {
           // alert(props.busqueda)
            //check if it is a barcode 
            
            const _id = regex_get_id_if_match(props.busqueda);

            if(_id>-1){
                fetch(get.detalle_codigo + _id)
                .then(r=>r.json())
                .then(response=>{
                    if((response.data||[]).length<1)
                    {
                        alert("Codigo no encontrado")
                        props?.callback?.()
                        return
                    }
                    setDetalleCodigo(c=>({
                        codigo: response.data[0].codigo,
                        idcodigo: response.data[0].idcodigo,
                        descripcion: response.data[0].descripcion,
                        precio: response.data[0].precio_codigo,
                    }))
                })
                .catch(e=>{console.log("codigo not found")})
            }
            else{
                post_method(post.codigo_por_codigo,{codigo: props.busqueda},(response)=>{
                   
                    if((response.data||[]).length<1)
                    {
                        alert("Codigo no encontrado")
                        props?.callback?.()
                        return
                    }
    
                    setDetalleCodigo(c=>({
                        codigo: response.data[0].codigo,
                        idcodigo: response.data[0].idcodigo,
                        descripcion: response.data[0].descripcion,
                        precio: response.data[0].precio_codigo,
                    }))
                })
            }
        }
        
    },[props.open])
    return detalleCodigo == null ? <></> : <>
        <Modal width={"60%"} destroyOnClose open={props.open}  onCancel={()=>{props?.callback?.()}} footer={null} title="Resultados">
            <Row style={{padding:".5em"}}>
                <Col span={24}>
                    C&oacute;digo:&nbsp;&nbsp;<b style={{fontSize:"1.3em"}}>{detalleCodigo.codigo}</b>
                </Col>
            </Row>
            <Row style={{padding:".5em"}}>
                <Col span={24}>
                    Descripci&oacute;n:&nbsp;&nbsp;<b style={{fontSize:"1.3em"}}>{detalleCodigo.descripcion}</b>
                </Col>
            </Row>
            <Row style={{padding:".5em"}}>
                <Col span={24}>
                    Precio:&nbsp;&nbsp;<b style={{fontSize:"1.3em"}}>{detalleCodigo.precio}</b>
                </Col>
            </Row>
            <Row style={{padding:".5em"}}>
                <Col span={24}>
                    <ImagenesProducto readonly idproducto={detalleCodigo.idcodigo} key={detalleCodigo.idcodigo} />
                </Col>
            </Row>
            <StockCodigosSucursales idcodigo={detalleCodigo.idcodigo} key={detalleCodigo.idcodigo}/>
        </Modal>
    </>
}


export default PopupDetalleBusqueda