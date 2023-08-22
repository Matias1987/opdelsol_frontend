import { Button, Col, Input, Modal, Row } from "antd"


const { useState, useEffect } = require("react")
const { default: SelectCliente } = require("./SelectCliente")
const { default: SelectMedico } = require("./SelectMedico")


const FiltroVentas =(props) => {
    const [filtros,setFiltros] = useState({})
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        
        setFiltros({})
    },[])


    const showModal = () => {setOpen(true);}

    const onSelectCliente = (id) => {
        setFiltros(_=>{
            const _f = {...filtros,idcliente:id}
            //props?.callback?.(_f)
            return _f
        })
    }

    const onSelectMedico = (id) => {
        setFiltros(_=>{
            const _f = {...filtros,idmedico:id}
            //props?.callback?.(_f)
            return _f
        })
    }

    const onSelectDestinatario = (id) => {
        setFiltros(_=>{
            const _f = {...filtros,iddestinatario:id}
            //props?.callback?.(_f)
            return _f
        })
    }

    const onIDChange = (e) => {
        setFiltros(_=>{
            const _f = {...filtros,id:e.target.value}
            //props?.callback?.(_f)
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
        <Row style={{padding: ".65em"}}>
            <Col span={24}>
                M&eacute;dico:&nbsp;&nbsp;
                <SelectMedico callback={onSelectMedico} />
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