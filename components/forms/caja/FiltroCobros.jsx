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
    <Button type="primary" ghost  size="small"  onClick={showModal}>
        {"Filtros"}
      </Button>
      &nbsp;&nbsp;
      <Button danger size="small" onClick={(e)=>{setFiltros(f=>{props?.callback?.({}); return {}}); }}>
        Borrar Filtros
      </Button>
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
            <Col span={24}>
                Nro.:&nbsp;&nbsp;
                <Input onChange={onIDChange} />
            </Col>
            
        </Row>
        <Row style={{padding: ".65em"}}>
            <Col span={24}>
                Cliente:&nbsp;&nbsp;
                <SelectCliente callback={onSelectCliente} />
            </Col>
        </Row>
        {/*
        <Row>
            <Col span={24}>
                Fecha:&nbsp;&nbsp;
            <RangePicker format={"DD/MM/YY"} />
            </Col>
        </Row>
    */}
        </Modal>
    </>
}

export default FiltroCobros;