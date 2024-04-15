import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import {Row, Col, Table} from "antd";
import { useEffect, useState } from "react";

const CantidadesSucursales = (props) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [filtros, setFiltros] = useState({idsucursal:props.idsucursal})
    const [update, setUpdate] = useState(false)
    const columns = [
        {dataIndex:"sucursal", title:"Sucursal"},
        {dataIndex:"codigo", title:"Codigo"},
        {dataIndex:"cantidad", title:"Cantidad"},
    ]
    useEffect(()=>{

        alert(JSON.stringify(filtros))

        post_method(post.search.filtro_stock,{...filtros, sucursal: props.idsucursal},(response)=>{
            setDataSource(response.data)
        })

    },[update])
    return <>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
            <FiltroCodigos callback={(_filtros)=>{
                setFiltros(_f=>({..._f,..._filtros}))
                setUpdate(!update)
            }} />
        </Col>
    </Row>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
            <Table columns={columns} dataSource={dataSource} loading={loading} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
    
    </>
}

export default CantidadesSucursales;