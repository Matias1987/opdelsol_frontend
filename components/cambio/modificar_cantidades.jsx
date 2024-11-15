import {Row, Col, Input, Button, Modal} from "antd"
import { useState } from "react"
import SelectCodigoVenta from "../forms/ventas/SelectCodigoVenta"
import globals from "@/src/globals"
/**
 * 
 * @param fkventa 
 * 
 */
const ModificarCantidadesEdicion = (props) => {
    const [open, setOpen] = useState(false)
    const {fkventa,  fkcodigo, ccodigo} = props
    const [codigo, setCodigo] = useState({
        id_sucursal: 0,
        id_codigo:fkcodigo||-1,
        id_venta: fkventa,
        cantidad: 1,
        codigo: ccodigo
    })
    const onChange = (idx, val) => {
        setCodigo(_c=>({..._c,[idx]:val}))
    }

    const onAplicarClick = () => {
        if(!confirm("Aplicar Cambios?"))
        {
            return
        }

        setOpen(false)


    }
    /**
     * el usuario debe seleccionar el codigo al que desea incremenar o decrementar cantidad
     */
    return <>
    <Button block onClick={()=>{setOpen(true)}} key={codigo.id_codigo}>{codigo.id_codigo<0 ?  <>Seleccionar...</>: <span>{codigo.codigo} {codigo.cantidad} </span> }</Button>  
    <Modal footer={null} open={open} onCancel={()=>{setOpen(false)}} width={"800px"} destroyOnClose>
        <>
            <Row>
                <Col span={24}>
                <SelectCodigoVenta idfamilias={[globals.familiaIDs.CRISTALES]} buttonText={"SELECCIONAR CODIGO..."} callback={(data)=>{
                                setCodigo(_c=>({..._c,
                                    codigo:data.codigo,
                                    id_codigo: data.idcodigo,
                                  
                                }))
                        }} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Input readOnly prefix="Actual" />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                {/** radiobutton for incrementing or decrementing */}
                </Col>
            </Row>
            
            <Row>
                <Col span={24}>
                    <Input prefix="Cantidad a Modificar: " type="number" min={1} step={1} value={codigo.cantidad} onChange={(e)=>{onChange(parseInt(e.target.value))}}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Button danger onClick={onAplicarClick}>Aplicar</Button>
                </Col>
            </Row>
        </>
        </Modal>
    
    </>
}

export default ModificarCantidadesEdicion