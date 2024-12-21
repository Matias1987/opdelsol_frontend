import { PlusOutlined } from "@ant-design/icons"
import {Row, Col, Table, Button, Modal} from "antd"
import { useEffect, useState } from "react"
import SorteoForm from "./sorteo_form"
import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"

export default ListaSorteos = props => {
    const [dataSource, setDataSource] = useState(null)
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const [reload, setReload] = useEffect(false)
    const columns = [
        {title:"Fecha", dataIndex:"fecha"} ,
        {title:"Comentarios", dataIndex:"comentarios"}
    ]

    const addSorteoCallback = _ => {setReload(!reload)}


    const load = _=>{
        post_method(post.sorteo_get,{},(response)=>{
            alert(JSON.stringify(response))
        })
    }

    useEffect(_=>{
        load()
    },[reload])
    
    

    return <>
    <Row>
        <Col span={24}>
        <Table 
            columns={columns}
            dataSource={dataSource}
            scroll={{y:"300px"}}

            title={_=><>
                Lista de Sorteos 
                <Button onClick={_=>{setPopupAddOpen(true)}} ><PlusOutlined /></Button>
            </>}

        />

        </Col>
    </Row>
    <Modal
        width={"750px"}
        onCancel={_=>{setPopupAddOpen(false)}}
        title={"Agregar Nuevo Sorteo"}
        footer={null}
        destroyOnClose
    >
        <SorteoForm callback={addSorteoCallback} />
    </Modal>

    </>
}