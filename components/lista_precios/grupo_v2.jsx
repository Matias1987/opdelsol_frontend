import { get } from "@/src/urls"
import { Button, Col, Modal, Row, Spin, Table } from "antd"
import { useEffect, useState } from "react"
import SubGrupoFormV3 from "../forms/deposito/SubgrupoFormV3"
import globals from "@/src/globals"

const GrupoV2 = props => {
    const {nombre, callback, reload} = props
    const [loading, setLoading] = useState(false)
    const [subgrupos, setSubgrupos] = useState([])
    const [selectedSubgrupoId, setSelectedSubgrupoId] = useState(-1)

    const columns = [
        {
            title:"Producto",   
            dataIndex:"producto", 
            render:(_,{producto, idsubgrupo, idfamilia})=><>
                <Button 
                onClick={()=>{
                    setSelectedSubgrupoId(idsubgrupo)
                    //setMostrarPrecioPar(idfamilia == globals.familiaIDs.CRISTALES)
                    //setPopupDetalleOpen(true)
                    callback?.(idsubgrupo,idfamilia == globals.familiaIDs.CRISTALES)
                }} 
                type="link" 
                size="small"
                style={{color:"#03045E", fontWeight:"600", whiteSpace:"normal", textAlign:"left"}}
                >
                    {producto.replaceAll("_"," ")/* + " " + idsubgrupo*/}
                </Button>
        </>
        },
        {title:"Precio", dataIndex:"precio", render:(_,{precio, precio_par, idfamilia})=><div style={{textAlign:"right", fontWeight:"bold", color:"#03045E", fontSize:"1.12em"}}>$&nbsp;{<><>{idfamilia==globals.familiaIDs.CRISTALES ? precio_par : precio}</></>}</div>},
       
    ]

    useEffect(()=>{
       
        setLoading(false)
        fetch(get.optionsforgrupo + props.idgrupo)
        .then(r=>r.json())
        .then((response)=>{
            setLoading(false)
                setSubgrupos(response.data.map(sg=>({producto:sg.label, precio_par: sg.precio_par,idfamilia: sg.familia_idfamilia, precio:sg.precio_defecto, idsubgrupo: sg.value, precio_mayorista: sg.precio_defecto_mayorista })))
        })
        .catch(r=>{console.log("error")})
    },[reload])


    return  loading ? <Spin /> :  <Col span={24} style={{padding:"6px"}}>
                        <Table 
                        style={{width:"100%"}}
                        title={_=><div><span>{nombre /*+ props.idgrupo*/}</span></div>}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                        columns={columns} 
                        dataSource={subgrupos} 
                        pagination={false} 
                        loading={loading} 
                        
                        
                        />
                    </Col>

}

export default GrupoV2