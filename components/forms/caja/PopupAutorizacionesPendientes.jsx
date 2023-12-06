import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"
import { Button, Col, Modal, Row, Table } from "antd"
import { useState } from "react"

const PopupAutPendientes = () => {
    const [dataSource, setDataSource] = useState([])
    const [open, setOpen] = useState(false)
    const _bloquear_acceso = (idsesion,token) => {
        const data = {
            estado:"R",
            token: token,
            idsesion: idsesion,
        }
        post_method(post.update.update_perm_request_status,data,(resp)=>{
            update_list()
        })
    }

    const _habilitar_acceso = (idsesion,token) => {
        const data = {
            estado:"A",
            token: token,
            idsesion: idsesion,
        }
        post_method(post.update.update_perm_request_status,data,(resp)=>{
            update_list()
        })
    }

    const update_list = _ => {
        fetch(get.lista_request + globals.obtenerSucursal())
        .then(r=>r.json())
        .then((response)=>{
            if(response?.data == null)
            {
                return
            }
            setDataSource(
                response.data.map(r=>({
                    idsesion: r.idsesion,
                    token: r.token,
                    nombre: r.usuario,
                    estado: r.estado == "R" ? "Rechazado" : r.estado=="P" ? "Pendiente" : "Aceptado",
                }))
            )
        })
    }

    const onOpen = _ => {
        setOpen(true)

        update_list()
        
    }

    const columns = [
        {dataIndex: "idsesion", title:"idsesion"},
        {dataIndex: "nombre", title: "Nombre"},
        {dataIndex: "estado", title: "Estado"},
        {dataIndex: "idsesion", title:"Acciones", render:(_,{idsesion,token})=>(
            <>
                <Button onClick={()=>{_habilitar_acceso(idsesion, token)}}>Habilitar acceso</Button>
                <Button onClick={()=>{_bloquear_acceso(idsesion, token)}}>Bloquear acceso</Button>
            </>
        )}

    ]
    return <>
    <Button onClick={onOpen}>Autorizaciones</Button>
    <Modal open={open} footer={null} onCancel={()=>{setOpen(false)}}>
        <Row>
            <Col span={24}>
                <h4>Autorizaciones Pendientes</h4>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table dataSource={dataSource} columns={columns} />
            </Col>
        </Row>
    </Modal>
    
    </>
}

export default PopupAutPendientes