import { get, post } from "@/src/urls"
import { Button, Card, Col, Input, Modal, Row, Select, Spin } from "antd"
import ModificarCantidadesEdicion from "./modificar_cantidades"
import SelectCodigoVenta from "../forms/ventas/SelectCodigoVenta"
import globals from "@/src/globals"
import { useState } from "react"
import InformeVentaMinV2 from "../informes/ventas/InformeVentasMinV2"
import InformeVentaMinV3 from "../informes/ventas/InformeVentasMinV3"
import { InfoOutlined } from "@ant-design/icons"
import { post_method } from "@/src/helpers/post_helper"


/**
 * @param idventa 
 */
const CambioSobre = (props) => {
    
    const [codigo, setCodigo] = useState(
        {
            codigo: "",
            cantidad: 1,
            idcodigo: "",
            idventa: "",
            precio: 0,
            esf:"",
            cil:"",
            add:"",
            cb:"",
            diam:"",
            idsucursal:"",
            tipo:"",
        }
    )

    const [idventa, setIdVenta] = useState(-1)
    const [venta, setVenta] = useState(null)
    const [mp, setMP] = useState([])
    const [loading, setLoading] = useState(false)
    const [popupVentaOpen, setPopupVentaOpen] = useState(false)
   const onChangeCodigo = (idx, val) => {
        setCodigo(__codigo=>({...__codigo,[idx]:val}))
   }
   const onAplicarCambioCodigo = ()=>{
    alert(JSON.stringify(codigo))
    if(codigo.idcodigo=="")
    {
        alert("Código no seleccionado.")
        return
    }
    if(!confirm("<!> Esto reemplazará el código anterior en el sobre por el nuevo. Continuar?"))
    {
        return
    }
    post_method(post.insert.registrar_cambio_venta_item,{...codigo, idsucursal: venta.sucursal_idsucursal},(response)=>{
        alert(JSON.stringify(response))
    })

   }
/*
"tipo"
"lejos_armazon"
"lejos_od"
"lejos_oi"
"cerca_armazon"
"cerca_od"
"cerca_oi"
"armazon"
"od"
"oi"
"vdir"
"insumo"
"lejos_tratamiento"
"tratamiento"
"cerca_tratamiento"

*/
   const load_venta = ()=>{
        setLoading(true)
        fetch(get.venta + idventa)
        .then(r=>r.json())
        .then(response=>{
            setVenta(_=>response.data[0])

            fetch(get.get_venta_mp + idventa)
			.then(_response=>_response.json())
			.then((_response)=>{

				setMP(_response.data)

				var total_haber=0;

				_response.data.forEach(r=>{
					if(r.modo_pago!='ctacte')
					{
						total_haber += parseFloat(r.monto)
					}
				})

                alert(JSON.stringify(response.data))

				setVenta({...response.data[0], total_haber: total_haber, recargo: 0})
                setLoading(false)
			})	
        })
        .catch(e=>console.log(e))
   }

    return <>
    <Row>
            <Col span={24}  >
                <Card title={<>1 - Indicar Nro. de Sobre</>}>
                <Row>
                    <Col span={12}>
                        <Input prefix="Nro. Venta" onChange={(e)=>{ onChangeCodigo("idventa", e.target.value); setIdVenta(parseInt(e.target.value))}} />
                    </Col>
                    <Col span={12}>
                       <Button disabled={venta==null} onClick={()=>{setPopupVentaOpen(true)}}><InfoOutlined /></Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button onClick={()=>{load_venta()}} disabled={loading}>Aplicar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        { null===venta ? "" : `Cliente: ${venta.cliente_nombre}  |  Vendedor: ${venta.usuario_nombre}  |  Sucursal: ${venta.sucursal_nombre}` }
                    </Col>
                </Row>
                
                </Card>
            </Col>
        </Row>
        <Row>
        
        <Col span={24}>
            <Card title={<>2 - C&oacute;digo Nuevo</>}>
                <Row>
                    <Col span={24} style={{padding:"8px"}}>
                        <SelectCodigoVenta idfamilias={[globals.familiaIDs.CRISTALES]} buttonText={"SELECCIONAR CODIGO..."} callback={(data)=>{
                                setCodigo(_c=>({..._c,
                                    codigo:data.codigo,
                                    idcodigo: data.idcodigo,
                                    precio: data.precio,
                                }))
                        }} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                            TIPO: &nbsp;
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                           
                        <Select style={{width:"200px"}} 
                        onChange={(v)=>{onChangeCodigo("tipo",v)}}
                        options={[
                           /* {value: 'vdir', label: 'Item Venta Directa'},*/

                            {value: 'armazon', label: 'Armazon'},
                            {value: 'od', label: 'Ojo Derecho'},
                            {value: 'oi', label: 'Ojo Izquierdo'},
                            {value: 'insumo', label: 'Insumo'},
                            {value: 'tratamiento', label: 'Tratamiento'},
 
                            {value: 'cerca_armazon', label: 'Cerca Armazon'},
                            {value: 'cerca_od', label: 'Cerca Ojo Derecho'},
                            {value: 'cerca_oi', label: 'Cerca Ojo Izquierdo'},
                            {value: 'cerca_tratamiento', label: 'Cerca Tratamiento'},
 

                            {value: 'lejos_armazon', label: 'Lejos Armazon'},
                            {value: 'lejos_od', label: 'Lejos Ojo Derecho'},
                            {value: 'lejos_oi', label: 'Lejos Ojo Izquierdo'},
                            {value: 'lejos_tratamiento', label: 'Lejos Tratamiento'},

                            
                        ]}
                        />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}><Input onChange={(e)=>{onChangeCodigo("esf", e.target.value)}}    prefix="Esf: " /> </Col>
                    <Col span={4}><Input onChange={(e)=>{onChangeCodigo("cil", e.target.value)}}    prefix="Cil: " /></Col>
                    <Col span={4}><Input onChange={(e)=>{onChangeCodigo("eje", e.target.value)}}    prefix="Eje: " /></Col>
                    <Col span={4}><Input onChange={(e)=>{onChangeCodigo("add", e.target.value)}}    prefix="Add: " /></Col>
                    <Col span={4}><Input onChange={(e)=>{onChangeCodigo("cb", e.target.value)}}     prefix="C.B.: " /></Col>
                    <Col span={4}><Input onChange={(e)=>{onChangeCodigo("diam", e.target.value)}}   prefix="Diam.: " /></Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Input prefix="Precio: " onChange={(e)=>{onChangeCodigo("precio", parseFloat(e.target.value))}} value={codigo.precio||"0"} type="number" />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Input prefix={"Cantidad: "} value={codigo.cantidad}/>
                    </Col>
               
                    <Col span={8}>
                        <Input  prefix={"Recargo venta: "} type="number"  disabled={true} value={venta?.recargo} onChange={(e)=>{setVenta(_v=>({..._v,recargo:parseFloat(e.target.value||"0")}))}}/>
                    </Col>
                    <Col span={8}>
                        <Input disabled prefix={"Descuento venta: "} type="number" value={venta?.descuento} onChange={(e)=>{setVenta(_v=>({..._v,descuento:parseFloat(e.target.value||"0")}))}} />
                    </Col>
                </Row>
                {/*<Row>
                    <Col span={8}>
                        <Input disabled bordered={false} prefix={"SubTotal"} />
                    </Col>
                    <Col span={8}>
                        <Input disabled bordered={false} prefix={"Descuento"} />
                    </Col>
                    <Col span={8}> 
                        <Input disabled bordered={false} prefix={"Total"} />
                    </Col>
                </Row>*/}
                <Row>
                    <Col span={24}>
                        <Button block danger type="dashed" disabled={codigo.idventa==""} onClick={onAplicarCambioCodigo}>Aplicar</Button>
                    </Col>
                </Row>
              
            </Card>
        </Col>
    </Row>
   { venta==null ? <>Indique Venta...</> :
    <Row>
        <Col span={12}>
            <Card title={<>3 - Restaurar Cantidad de C&oacute;digo a Reemplazar</>} key={codigo.codigo}>
                <ModificarCantidadesEdicion title={"Restaurar Cantidad en " + venta.sucursal_nombre} fksucursal={venta.sucursal_idsucursal} sucursal={venta.sucursal_nombre} />
            </Card>
        </Col>
    
        <Col span={12}>
            <Card title={<>4 - Descontar Cantidad de C&oacute;digo Nuevo</>}  key={codigo.codigo}>
                <ModificarCantidadesEdicion title={"Descontar Cantidad en " + venta.sucursal_nombre} fksucursal={venta.sucursal_idsucursal} sucursal={venta.sucursal_nombre} />
            </Card>
        </Col>
    </Row>
    }
    <Modal 
        width={"800px"} 
        destroyOnClose 
        title="Detalle Venta" 
        onCancel={()=>{setPopupVentaOpen(false)}} 
        open={popupVentaOpen} 
        footer={null}
    >
        <InformeVentaMinV3 idventa={idventa} />
    </Modal>
    
    
    
    
    </>
}

export default CambioSobre;