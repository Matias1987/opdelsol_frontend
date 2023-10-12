import { Button, Col, DatePicker, Input, Modal, Row } from "antd"
import SelectCliente from "../ventas/SelectCliente";

const { RangePicker } = DatePicker;
const { useState, useEffect } = require("react")

const FiltroCobros =(props) => {
    const [filtros,setFiltros] = useState({})
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        setFiltros({})
    },[])


    const showModal = () => {setOpen(true);}

    const onSelectCliente = (id) => {
        setFiltros(p=>{
            const _f = {...p,idcliente:id}
            //props?.callback?.(_f)
            return _f
        })
    }



    const onIDChange = (e) => {
        setFiltros(p=>{
            const _f = {...p,idcobro:e.target.value}
            //props?.callback?.(_f)
            return _f
        })
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
      };


    return <>
    <Row>
        <Col span={12}>
            <Button block type="primary"   size="small"  onClick={showModal}>
                {"Filtros"}
            </Button>
        </Col>
        <Col span={12}>
            <Button block danger size="small" type="dashed" onClick={(e)=>{setFiltros(f=>{props?.callback?.({}); return {}}); }}>
                Borrar Filtros
            </Button>
        </Col>
    </Row>
    
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{children:"CERRAR"}}
        
        width={"80%"}
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

      
        <Row style={{padding: ".65em"}}>
            <Col span={1} style={{textAlign:'right'}}>
            Nro.:&nbsp;&nbsp;
            </Col>
            <Col span={23}>
                
                <Input onChange={onIDChange} />
            </Col>
            
        </Row>
        <Row style={{padding: ".65em"}}>
            <Col span={1} style={{textAlign:'right'}}>
                Cliente:&nbsp;&nbsp;
            </Col>
            <Col span={23}>
                
                <SelectCliente callback={onSelectCliente} />
            </Col>
        </Row>
        
        <Row style={{padding: ".65em"}}>
            <Col span={1} style={{textAlign:'right'}}>
            Fecha:&nbsp;&nbsp;
            </Col>
            <Col span={23}>
                
                <DatePicker format={"DD/MM/YYYY"} onChange={
                    (d,dstr)=>
                    {
                        //alert(dstr)
                        const parts  = dstr.split("/")

                        setFiltros(f=>{
                            const _f = {...f,["fecha"]:`${parts[2]}-${parts[1]}-${parts[0]}`}

                            //props?.callback?.(_f)
                            return _f
                        })
                    }
                }  />
            </Col>
        </Row>
    
        </Modal>
    </>
}

export default FiltroCobros;