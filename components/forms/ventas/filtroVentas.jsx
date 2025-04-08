import globals from "@/src/globals"
import { Button, Card, Col, DatePicker, Input, Modal, Row, Select } from "antd"


import { useState, useEffect } from "react"
import SelectCliente from "./SelectCliente"
import SelectMedico from "./SelectMedico"


const FiltroVentas =(props) => {
    const {embedded, estado,} = props
    const [filtros,setFiltros] = useState({
        estado:estado,
        idcliente:-1,
        idmedico:-1,
        iddestinatario:-1,
        id:null,
        tipo:"",    
        fecha:null,
    })
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        //setFiltros({estado: estado||""})
    },[])


    const showModal = () => {
        setFiltros({})
        setOpen(true);
    }

    const onChange = (idx,value) => {
        setFiltros(_ff=>{
            const _f = {..._ff,[idx]:value}
            return _f
        })
    }

    const onSelectCliente = (id) => {
        setFiltros(_=>{
            const _f = {...filtros,idcliente:id}
            return _f
        })
    }

    const onSelectMedico = (id) => {
        setFiltros(_=>{
            const _f = {...filtros,idmedico:id}
            return _f
        })
    }

    const onSelectDestinatario = (id) => {
        setFiltros(_=>{
            const _f = {...filtros,iddestinatario:id}
            return _f
        })
    }

    const onIDChange = (e) => {
        setFiltros(_=>{
            const _f = {...filtros,id:e.target.value}
            return _f
        })
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
      };

    
    const filtros_content = _=> <>
        <Card title="Filtros" size="small" styles={{borderRadius:"16px", body:{backgroundColor:"rgba(209,241,243,0.25)"}}}>
            <Row>
                <Col span={12}>
                    <Row style={{padding: "3px"}}>
                        <Col span={24}>
                            <Input allowClear  size="small" onChange={onIDChange} style={{width:"150px"}} prefix={<span style={{fontWeight:"bold"}}>Nro.: </span>} />
                        </Col>
                        
                    </Row>
                    <Row style={{padding:"3px"}}>
                        <Col span={12}>
                            <Select 
                            disabled={!(typeof estado==='undefined') }
                            size="small"
                            prefix={<span style={{fontWeight:"bold"}}>Estado: </span>}
                            style={{width:"200px"}} 
                            onChange={(v)=>{onChange("estado",v)}}
                            value={filtros.estado}
                            options={[
                                {label:"-", value:""},
                                {label:"INGRESADO", value:"INGRESADO"},
                                {label:"PENDIENTE", value:"PENDIENTE"},
                                {label:"TERMINADO", value:"TERMINADO"},
                                {label:"ENTREGADO", value:"ENTREGADO"},
                                {label:"ANULADO", value:"ANULADO"},
                            ]}
                            />
                        </Col>
                   </Row>
                   <Row style={{padding: "3px"}}>

                        <Col span={12}>
                            <Select 
                            size="small"
                            prefix={<span style={{fontWeight:"bold"}}>Tipo: </span>}
                            style={{width:"200px"}} 
                            onChange={(v)=>{onChange("tipo",v)}}
                            options={[
                                {label:"-", value:""},
                                {label:"Vta. Directa", value:globals.tiposVenta.DIRECTA},
                                {label:"Recta Stock", value:globals.tiposVenta.RECSTOCK},
                                {label:"LC Laboratorio", value:globals.tiposVenta.LCLAB},
                                {label:"LC Stock", value:globals.tiposVenta.LCSTOCK},
                                {label:"Monof Lab", value:globals.tiposVenta.MONOFLAB},
                                {label:"Monof Stock", value:globals.tiposVenta.MONOFLAB},
                            ]}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row style={{padding: "3px"}}>
                        <Col span={24}>
                            <span style={{color:"darkblue"}}><i>Cliente o Destinatario:</i></span>&nbsp;&nbsp;
                            <SelectCliente minVersion callback={onSelectCliente} />
                        </Col>
                    </Row>
                    <Row style={{padding: "3px"}}>
                        <Col span={24}>
                        <span style={{color:"darkblue"}}><i>M&eacute;dico:&nbsp;&nbsp;</i></span>
                            <SelectMedico callback={onSelectMedico} />
                        </Col>
                    </Row>

                    <Row style={{padding: "3px"}}>
                      
                        <Col span={22}>
                        Fecha:&nbsp;&nbsp;
                            <DatePicker 
                            size="small"
                            format={"DD/MM/YYYY"} onChange={
                                (d,dstr)=>
                                {
                                    const parts  = dstr.split("/")
                                    if(typeof parts[0]==='undefined')
                                    {
                                        setFiltros(f=>{
                                            const _f = {...f,["fecha"]:null}
                                            return _f
                                        })
                                        return
                                    }
                                    setFiltros(f=>{
                                        const _f = {...f,["fecha"]:`${parts[2]}-${parts[1]}-${parts[0]}`}
                                        return _f
                                    })
                                }
                            }  />

                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Button 
                            type="primary" 
                            size="small" 
                            onClick={_=>{   
                                if(!embedded)
                                {
                                    setOpen(false)
                                }
                                //alert(JSON.stringify(filtros))
                                props?.callback?.(filtros)
                            }
                            }
                            >Aplicar</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    </>


    return embedded ? filtros_content() :    
    <>
    <Button type="link" ghost  size="small"  onClick={showModal}>
        {"Filtros"}
      </Button>
      <Button danger type="link" size="small" onClick={(e)=>{setFiltros(f=>{props?.callback?.({}); return {}}); }}>
        Borrar Filtros
      </Button>
      <Modal
        footer={null}
        
        
        width={"1000px"}
        title={"Filtros"}
        open={open}
        onCancel={handleCancel}
       
        destroyOnClose={true}
      >

      {filtros_content()}
        
        </Modal>
        
    </>
}

export default FiltroVentas;