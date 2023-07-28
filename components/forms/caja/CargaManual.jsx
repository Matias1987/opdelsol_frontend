const { get } = require("@/src/urls")
const { Form, Input, Row, Col, Modal, Button, Spin } = require("antd")
const { useEffect, useState } = require("react")

const CargaManual = (props) => {
    const [dataCliente, setData] = useState(null)
    const [open, setOpen] = useState(false);

    const showModal = () => {
    
        setOpen(true);
    
        
      };

    useEffect(()=>{
        fetch(get.cliente_por_id + props.idcliente)
        .then(response=>response.json())
        .then(response=>{
            setData(response.data[0])
        })
    },[])



    const handleCancel = () => {;
        setOpen(false);
      };

    const detalles_cliente =_ => dataCliente === null ? <Spin /> : <>
        <p>Nombre: <b>{dataCliente.nombre}</b> &nbsp;&nbsp;&nbsp;&nbsp; DNI: <b>{dataCliente.dni}</b></p>
        <p>Tel.: <b>{dataCliente.telefono1}</b> &nbsp;&nbsp;&nbsp;&nbsp; Dir.: <b>{dataCliente.direccion}</b></p>
    </>
    return <>
    <Button type="primary" ghost  size="small"  onClick={showModal}>
        {"Carga Manual"}
      </Button>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        
        width={"50%"}
        title={"Carga Manual"}
        open={open}
        onOk={()=>{
          setOpen(false)}}
        onCancel={handleCancel}
        okText= {"Cancelar"}
        destroyOnClose={true}
      >
        <Row>
            {detalles_cliente()}
        </Row>
        <Row>
            <Col>
                <Form>
                    <Form.Item label={"Monto"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Motivo"}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button>Guardar</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </Modal>
    </>
}

export default CargaManual;