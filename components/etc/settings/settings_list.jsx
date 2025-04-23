
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import { Table, Row, Col, Button, Modal, Card, Divider } from "antd"
import { useState, useEffect } from "react"
import AddEditSetting from "./new_settings"
import { post } from "@/src/urls"
import { post_method } from "@/src/helpers/post_helper"
import ImageList from "../imagen/image_list"
import UploadSingle from "../imagen/upload_single"


const SettingList = props => {
    const [dataSource, setDataSource] = useState([])

    const [selection, setSelection] = useState(null)

    const [modalAddOpen, setModalAddOpen] = useState(false)
    const [modalEditOpen, setModalEditOpen] = useState(false)
    const [reloadImages, setReloadImages] = useState(false)
    const [reload, setReload] = useState(false)



    const columns = [
        { dataIndex:"s_key", label:"Key"},
        { dataIndex:"s_value", label:"Value"},
        {
            width:"50px",
            render:(_,obj)=><>
            <Button onClick={_=>{
                onEditClick(obj)
            }}>
                <EditOutlined />
            </Button>
            </>},
    ]

    const onAddClick = _ =>{
        setModalAddOpen(true)
    }

    const onEditClick = obj=>{
        setSelection(obj)
        setModalEditOpen(true)
    }

    const load = () => {
        post_method(post.get_settings,{},(response)=>{
            setDataSource(response.data)
        })
    }

    useEffect(()=>{load()},[reload])

    return <>
        <Row>
            <Col span={24}>
            <span style={{fontSize:"1.2em", fontWeight:"600"}}>Variables <Button onClick={onAddClick} size="small"><PlusOutlined /> Agregar</Button></span>  
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table 
                    size="small"
                    pagination={false}
                    dataSource={dataSource}
                    columns={columns}
                />
            </Col>
        </Row>
        <Divider />
        <Row>
            <Col span={24}>
                <Card title={ <>Im&aacute;genes&nbsp;<UploadSingle tipo='global' fkref={0} callback={_=>{setReloadImages(!reloadImages)}} /></> } size="small">
                    <Row >
                        <Col span={24}>
                            <ImageList 
                            reload={reloadImages}
                            resource_url = {post.obtener_images} 
                            post_params = {{fk_ref: 0, tipo:"global"}} 
                            />
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Modal 
        open={modalAddOpen} 
        onCancel={_=>{setModalAddOpen(false)}} 
        footer={null} 
        title="Add/Edit" 
        destroyOnClose

        >
            <AddEditSetting
            callback={_=>{setReload(!reload); setModalAddOpen(false)}}/>
        </Modal>
        <Modal 
        open={modalEditOpen} 
        onCancel={_=>{setModalEditOpen(false)}} 
        footer={null} 
        title="Add/Edit" 
        destroyOnClose

        >
            <AddEditSetting 
            settingName={selection?.s_key}
            settingValue={selection?.s_value}
            callback={_=>{setReload(!reload); setModalEditOpen(false)}}
            />
        </Modal>
    </>
}

export default SettingList