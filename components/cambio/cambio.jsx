import { get } from "@/src/urls"
import { Button, Card, Col, Input, Row, Select, Spin } from "antd"
import ModificarCantidadesEdicion from "./modificar_cantidades"
import SelectCodigoVenta from "../forms/ventas/SelectCodigoVenta"
import globals from "@/src/globals"
import { useState } from "react"


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
            precio: 0
        }
    )
   const onChangeCodigo = () => {

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
    return <>
    <Row>
            <Col span={24}  >
                <Card title={<>1 - Indicar Nro. de Sobre</>}>
                <Row>
                    <Col span={24}>
                        <Input prefix="Nro. Venta" />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button>Aplicar</Button>
                    </Col>
                </Row>
                
                </Card>
            </Col>
        </Row>
        <Row>
        
        <Col span={24}>
            <Card title={<>2 - Reemplazar en Sobre</>}>
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
                           
                        <Select style={{width:"200px"}} options={[
                            {value: 'vdir', label: 'Item Venta Directa'},

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
                    <Col span={8}>
                        <Input prefix={"Cantidad"} value={codigo.cantidad}/>
                    </Col>
               
                    <Col span={8}>
                        <Input prefix={"Precio"} value={codigo.precio} />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Input disabled bordered={false} prefix={"SubTotal"} />
                    </Col>
                    <Col span={8}>
                        <Input disabled bordered={false} prefix={"Descuento"} />
                    </Col>
                    <Col span={8}> 
                        <Input disabled bordered={false} prefix={"Total"} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button block danger type="dashed">Aplicar</Button>
                    </Col>
                </Row>
              
            </Card>
        </Col>
    </Row>
   
    <Row>
        <Col span={12}>
            <Card title={<>3 - Restaurar Cantidad de C&oacute;digo a Reemplazar</>} key={codigo.codigo}>
                <ModificarCantidadesEdicion  />
            </Card>
        </Col>
    
        <Col span={12}>
            <Card title={<>4 - Descontar Cantidad de C&oacute;digo Nuevo</>}  key={codigo.codigo}>
                <ModificarCantidadesEdicion fkcodigo={codigo.idcodigo} ccodigo={codigo.codigo}/>
            </Card>
        </Col>
    </Row>

    
    
    
    
    </>
}

export default CambioSobre;