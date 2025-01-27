import { Button, Col, Flex, Row, Table } from "antd"
import { useEffect, useState } from "react"
import ListaPreciosGrupo from "./grupo"
import { post_method } from "@/src/helpers/post_helper"
import globals from "@/src/globals"
import { get, post } from "@/src/urls"
import ListaPreciosGrupoV3 from "./gupo_v3"

const ListaPreciosV4 = (props) => {
    const [subfamilias, setSubfamilias] = useState([])

    const [grupos, setGrupos] = useState([])

    const [selectedFamilia, setSelectedFamilia] = useState({nombre:"", id:-1})

    const [loading, setLoading] = useState(false)

    const [fix, setFix] = useState(0)

    useEffect(()=>{
        
        post_method(post.obtener_subfamilias_de_familias,
            {ids:[globals.familiaIDs.CRISTALES, globals.familiaIDs.LIQUIDOS, globals.familiaIDs.LC]},
            (resp)=>{
                //alert(JSON.stringify(resp))
                setSubfamilias(resp.data.map(sf=>({id:sf.idsubfamilia, nombre: sf.nombre_largo, familia: sf.familia})))
            }
        )
    },[])

    const onSubfamiliaClick = (idsf, nombre) => {
        
        setLoading(true)
        setSelectedFamilia(_=>({nombre:nombre, id:idsf}))
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

    return <div style={{backgroundColor:"#E8EAF0"}}> 
    <Row>
        <Col span={24}>
            <Row>
                <Col span={24} style={{padding:"1em", fontWeight:"bold", backgroundColor:"#00B8FF", color:"black", borderRadius:"6px", textAlign:"center"}}>
                    {selectedFamilia.nombre}
                </Col>
            </Row>
            <Row key={fix}>
                    <Flex wrap="wrap" vertical align="flex-start" justify="flex-start" gap="small" style={{width:"100%", height:"900px", overflow:"scroll"}}>

                        <div style={{ padding:"8px" , height:"100%"}}>
                            <Table 
                            style={{width:"300px"}}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                            dataSource={subfamilias} 
                            columns={
                                [
                                    {title:"Categorías", dataIndex:"nombre", render:(_,obj)=><Button style={{color:"#00659F", fontWeight:"bold", textAlign:"left", width:"100%", whiteSpace:"normal"}} disabled={loading} type="link" onClick={()=>{onSubfamiliaClick(obj.id,obj.nombre)}}>{obj.familia + ' / ' +obj.nombre}</Button>}
                                ] 
                                }
                            pagination={false} 
                            scroll={{y:"600px"}} 
                        />

                        </div>
                        {
                            grupos.map(g=><ListaPreciosGrupoV3 nombre={g.nombre} idgrupo={g.id} />)
                        }
                    
                </Flex>
            
            </Row>  
        </Col>
       
    </Row>
          
    </div>
}

export default ListaPreciosV4