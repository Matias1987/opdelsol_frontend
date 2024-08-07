import { post_method } from "@/src/helpers/post_helper"
import { get } from "@/src/urls"
import { Col, Row, Spin, Table } from "antd"
import { useEffect, useState } from "react"

const ListaPreciosGrupo = (props) => {
    const [loading, setLoading] = useState(false)
    const [subgrupos, setSubgrupos] = useState([])
    const columns = [
        {title:"Producto", dataIndex:"producto"},
        {title:"Precio", dataIndex:"precio"},
    ]
    useEffect(()=>{
       setLoading(false)
       fetch(get.optionsforgrupo + props.idgrupo)
       .then(r=>r.json())
       .then((response)=>{
        setLoading(false)
            setSubgrupos(response.data.map(sg=>({producto:sg.label, precio:0, })))
       })
       .catch(r=>{console.log("error")})
    },[])

    return  loading ? <Spin /> : subgrupos.length<1 ? <></> : <div>
        <Col style={{flex:"100%",   border:"1px solid black", padding:"3px", borderRadius:"6px"}} flex="1 0 50%" >
            <Row>
                <Col span={24}>
                        {props.nombre}
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={subgrupos} pagination={true} loading={loading} />
                </Col>
            </Row>
        </Col>
    </div>
    
}

export default ListaPreciosGrupo;   