import { Button, Col, Row, Table } from "antd"
import { useEffect, useState } from "react"
import ListaPreciosGrupo from "./grupo"
import { post_method } from "@/src/helpers/post_helper"
import globals from "@/src/globals"
import { get, post } from "@/src/urls"

const ListaPrecios = (props) => {
    const [subfamilias, setSubfamilias] = useState([])

    const [grupos, setGrupos] = useState([])

    const [selectedFamilia, setSelectedFamilia] = useState(-1)

    const [loading, setLoading] = useState(false)

    const [fix, setFix] = useState(0)

    useEffect(()=>{
        
        post_method(post.obtener_subfamilias_de_familias,
            {ids:[globals.familiaIDs.CRISTALES, globals.familiaIDs.LIQUIDOS, globals.familiaIDs.LC]},
            (resp)=>{
                //alert(JSON.stringify(resp))
                setSubfamilias(resp.data.map(sf=>({id:sf.idsubfamilia, nombre: sf.nombre_largo})))
            }
        )
    },[])

    const onSubfamiliaClick = (idsf) => {
        
        setLoading(true)
        setSelectedFamilia(idsf)
        console.log(get.optionsforsubfamilia + idsf)
        fetch(get.optionsforsubfamilia + idsf)
        .then(r=>r.json())
        .then((response)=>{
            console.log(JSON.stringify(response))
            setFix(fix+1)
            setGrupos(response.data.map(g=>({id:g.value, nombre:g.label})))
            setLoading(false)
        })
        .catch(e=>{console.log("error")})
    }

    return <> 
    <Row>
        <Col span={18}>
            <Row key={fix}>
                {
                    grupos.map(g=><ListaPreciosGrupo nombre={g.nombre} idgrupo={g.id} />)
                }
            
            </Row>  
        </Col>
        <Col span={6}>
            <Table dataSource={subfamilias} columns={
                [
                    {dataIndex:"nombre", render:(_,obj)=><Button disabled={loading} type="link" onClick={()=>{onSubfamiliaClick(obj.id)}}>{obj.nombre}</Button>}
                ] 
                }
                pagination={false} 
                scroll={{y:"600px"}} 
                />
        </Col>
    </Row>
          
    </>
}

export default ListaPrecios