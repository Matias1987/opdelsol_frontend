import { get } from "@/src/urls"
import { Button, Col, Modal, Row, Spin, Table } from "antd"
import { useEffect, useState } from "react"
import SubGrupoFormV3 from "../forms/deposito/SubgrupoFormV3"
import globals from "@/src/globals"

const GrupoV2 = props => {
    const [loading, setLoading] = useState(false)
    const [popupDetalleOpen, setPopupDetalleOpen] = useState(false)
    const [subgrupos, setSubgrupos] = useState([])
    const [selectedSubgrupoId, setSelectedSubgrupoId] = useState(-1)
    const [mostrarPrecioPar, setMostrarPrecioPar] = useState(false)
    const [reload, setReload] = useState(false)
    const [esAdmin, setEsAdmin] = useState(false)
    const [esUDeposito, setEsUDeposito] = useState(false)
    const columns = [
        {title:"Producto", dataIndex:"producto", render:(_,{producto, idsubgrupo, idfamilia})=><>
            <Button 
            onClick={()=>{
                setSelectedSubgrupoId(idsubgrupo)
                setMostrarPrecioPar(idfamilia == globals.familiaIDs.CRISTALES)
                setPopupDetalleOpen(true)
            }} 
            type="link" 
            size="small"
            style={{color:"#314E2B", fontWeight:"bold"}}
            >
                {producto}
            </Button>
        </>},
        {title:"Precio", dataIndex:"precio", render:(_,{precio, precio_par, idfamilia})=><div style={{textAlign:"right", fontWeight:"bold", color:"#0800AA", fontSize:"1.12em"}}>$&nbsp;{<><>{idfamilia==globals.familiaIDs.CRISTALES ? precio_par : precio}</></>}</div>},
       
    ]

    useEffect(()=>{
        setEsAdmin(globals.esUsuarioAdmin())
        setEsUDeposito(globals.esUsuarioDeposito())
        setLoading(false)
        fetch(get.optionsforgrupo + props.idgrupo)
        .then(r=>r.json())
        .then((response)=>{
            setLoading(false)
                setSubgrupos(response.data.map(sg=>({producto:sg.label, precio_par: sg.precio_par,idfamilia: sg.familia_idfamilia, precio:sg.precio_defecto, idsubgrupo: sg.value, precio_mayorista: sg.precio_defecto_mayorista })))
        })
        .catch(r=>{console.log("error")})
    },[reload])


    return  loading ? <Spin /> : <div style={{width:"300px"}}>

                    <Table 
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    columns={columns} 
                    dataSource={subgrupos} 
                    pagination={false} 
                    loading={loading} 
                    
                    
                    />

    </div>
}

export default GrupoV2