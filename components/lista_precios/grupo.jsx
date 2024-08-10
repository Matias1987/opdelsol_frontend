
import { post_method } from "@/src/helpers/post_helper"
import { get } from "@/src/urls"
import { EditFilled, InfoCircleFilled, InfoCircleOutlined, InfoOutlined } from "@ant-design/icons"
import { Button, Col, Modal, Row, Spin, Table } from "antd"
import { useEffect, useState } from "react"
import EditarSubgrupo from "../forms/deposito/EditarSubgrupo"
import SubGrupoFormV3 from "../forms/deposito/SubgrupoFormV3"

const ListaPreciosGrupo = (props) => {
    const [loading, setLoading] = useState(false)
    const [popupDetalleOpen, setPopupDetalleOpen] = useState(false)
    const [subgrupos, setSubgrupos] = useState([])
    const [selectedSubgrupoId, setSelectedSubgrupoId] = useState(-1)
    const columns = [
        {title:"Producto", dataIndex:"producto", render:(_,{producto, idsubgrupo})=><><Button onClick={()=>{
            setSelectedSubgrupoId(idsubgrupo)
            setPopupDetalleOpen(true)
        }} type="link" size="small">{producto}</Button></>},
        {title:"Precio", dataIndex:"precio", render:(_,{precio})=><div style={{textAlign:"right"}}>$&nbsp;{precio}</div>},
     
       
    ]
    useEffect(()=>{
       setLoading(false)
       fetch(get.optionsforgrupo + props.idgrupo)
       .then(r=>r.json())
       .then((response)=>{
        setLoading(false)
            setSubgrupos(response.data.map(sg=>({producto:sg.label, precio:sg.precio_defecto, idsubgrupo: sg.value })))
       })
       .catch(r=>{console.log("error")})
    },[])

    return  loading ? <Spin /> : subgrupos.length<1 ? <></> : <div>
        <Col style={{flex:"100%",   border:"1px solid #BDC5D8", padding:"3px", borderRadius:"4px", margin:"6px"}} flex="1 0 50%" >
            <Row>
                <Col span={24} style={{padding:"1em", fontWeight:"bold", backgroundColor:"#312EB4", color:"white"}}>
                        {props.nombre}
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table 
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    columns={columns} 
                    dataSource={subgrupos} 
                    pagination={true} 
                    loading={loading} 
                    />
                </Col>
            </Row>
        </Col>
        <Modal destroyOnClose open={popupDetalleOpen} onCancel={()=>{setPopupDetalleOpen(false)}} footer={null} title="Detalle " width={"80%"}>
            <SubGrupoFormV3 readOnly={true} idsubgrupo={selectedSubgrupoId} title="Detalle Subgrupo" />
        </Modal>
    </div>
    
}

export default ListaPreciosGrupo;   