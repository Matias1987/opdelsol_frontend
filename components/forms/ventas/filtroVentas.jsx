import globals from "@/src/globals"
import { Button, Col, DatePicker, Input, Modal, Row, Select } from "antd"


import { useState, useEffect } from "react"
import SelectCliente from "./SelectCliente"
import SelectMedico from "./SelectMedico"


const FiltroVentas =(props) => {
    const [filtros,setFiltros] = useState({})
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        setFiltros({})
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


    return <>
    <Button type="link" ghost  size="small"  onClick={showModal}>
        {"Filtros"}
      </Button>
      <Button danger type="link" size="small" onClick={(e)=>{setFiltros(f=>{props?.callback?.({}); return {}}); }}>
        Borrar Filtros
      </Button>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{children:"CERRAR"}}
        
        width={"620px"}
        title={"Filtros"}
        open={open}
        onOk={()=>{ 
          props?.callback?.(filtros)
          setOpen(false)}
        }
        onCancel={handleCancel}
        okText= {"Aplicar"}
        destroyOnClose={true}
      >

      
        <Row style={{padding: "6px"}}>
            <Col span={24}>
                <Input onChange={onIDChange} style={{width:"100%"}} prefix={<span style={{fontWeight:"bold"}}>Nro.: </span>} />
            </Col>
            
        </Row>
        <Row style={{padding:"6px"}}>

            
            <Col span={24}>
                <Select 
                prefix={<span style={{fontWeight:"bold"}}>Estado: </span>}
                style={{width:"100%"}} 
                onChange={(v)=>{onChange("estado",v)}}
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
        <Row style={{padding:"6px"}}>

            <Col span={24}>
                <Select 
                prefix={<span style={{fontWeight:"bold"}}>Tipo: </span>}
                style={{width:"100%"}} 
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
        <Row style={{padding: "6px"}}>
            <Col span={24}>
                Cliente o Destinatario:&nbsp;&nbsp;
                <SelectCliente callback={onSelectCliente} />
            </Col>
        </Row>
        <Row style={{padding: "6px"}}>
            <Col span={24}>
                M&eacute;dico:&nbsp;&nbsp;
                <SelectMedico callback={onSelectMedico} />
            </Col>
        </Row>

        <Row style={{padding: "6px"}}>
            <Col span={2} style={{textAlign:'left'}}>
            Fecha:&nbsp;&nbsp;
            </Col>
            <Col span={22}>
                
                <DatePicker format={"DD/MM/YYYY"} onChange={
                    (d,dstr)=>
                    {
                        const parts  = dstr.split("/")
                        setFiltros(f=>{
                            const _f = {...f,["fecha"]:`${parts[2]}-${parts[1]}-${parts[0]}`}
                            return _f
                        })
                    }
                }  />

            </Col>
        </Row>
        

        {/*<Row style={{padding: ".65em"}}>
            <Col span={24}>
                Destinatario:&nbsp;&nbsp;
                <SelectCliente callback={onSelectDestinatario} />
            </Col>
    </Row>*/}
        </Modal>
        
    </>
}

export default FiltroVentas;