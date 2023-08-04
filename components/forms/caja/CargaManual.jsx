import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"

const { get, post } = require("@/src/urls")
const { Form, Input, Row, Col, Modal, Button, Spin } = require("antd")
const { useEffect, useState } = require("react")

const CargaManual = (props) => {
    const [dataCliente, setData] = useState(null)
    const [open, setOpen] = useState(false);
    const [cargaManual, setCargaManual] = useState({
        monto: 0,
        concepto: 0,
    })

    const onFinish = (values) => {
        /*
        data.caja_idcaja,
        data.usuario_idusuario, 
        data.cliente_idcliente, 
        data.sucursal_idsucursal, 
        data.monto, 
        data.concepto, 
        */
        const data = {
            ...cargaManual,
            caja_idcaja: globals.obtenerCaja(),
            usuario_idusuario: globals.obtenerUID(),
            cliente_idcliente: props.idcliente,
            sucursal_idsucursal: globals.obtenerSucursal()
        }

        post_method(post.insert.carga_manual, data,(response)=>{
            alert("Carga Manual Cargada con ID: " + response.data)
            props?.callback?.()
            setOpen(false)
        })
    }

    const onFinishFailed = (error) => {

    }

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

    const onChange = (value,idx) => {
        setCargaManual(
            {...cargaManual, [idx]:value}
        )
    }

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
            <Col span={24}>
                <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item label={"Monto"}>
                        <Input  onClick={(e)=>{e.target.select()}}  onChange={(e)=>{onChange(e.target.value, "monto")}}/>
                    </Form.Item>
                    <Form.Item label={"Motivo"}>
                        <Input  onClick={(e)=>{e.target.select()}}  onChange={(e)=>{onChange(e.target.value, "concepto")}}/>
                    </Form.Item>
                    <Form.Item>
                        <Button  block type="primary" htmlType="submit">Guardar</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </Modal>
    </>
}

export default CargaManual;