import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import {Row, Col, Table, Input} from "antd";
import { useEffect, useState } from "react";

const CantidadesSucursales = (props) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [filtros, setFiltros] = useState({idsucursal:props.idsucursal})
    const [update, setUpdate] = useState(false)
    const [total, setTotal] = useState(0)
    const columns = [
        {dataIndex:"sucursal", title:"Sucursal"},
        {dataIndex:"codigo", title:"Codigo"},
        {dataIndex:"cantidad", title:"Cantidad"},
    ]
    useEffect(()=>{
        let f = {familia: filtros.familia||'', subfamilia: filtros.subfamilia||'', grupo:filtros.grupo||'', subgrupo:filtros.subgrupo||'', sucursal:props.idsucursal}
        //alert(JSON.stringify(f))

        post_method(post.search.filtro_stock,f,(response)=>{
           // alert(JSON.stringify(response))
            setDataSource(response.data)
            let t = 0
            response.data.forEach(r=>{
                t+=parseInt(r.cantidad)
            })
            setTotal(t)
        })

    },[update])
    return <>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
            <FiltroCodigos callback={(f)=>{
                setFiltros(_f=>({..._f,...{
                    familia:+f.idfamilia<0?'':f.idfamilia,
                    subfamilia:+f.idsubfamilia<0?'':f.idsubfamilia,
                    grupo:+f.idgrupo<0?'':f.idgrupo,
                    subgrupo:+f.idsubgrupo<0?'':f.idsubgrupo,
                }}))
                setUpdate(!update)
            }} />
        </Col>
    </Row>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
            <Table columns={columns} dataSource={dataSource} loading={loading} pagination={true} scroll={{y:"500px"}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input readOnly prefix="Total:  " value={total} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
    
    </>
}

export default CantidadesSucursales;