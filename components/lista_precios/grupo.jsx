
import { get } from "@/src/urls"
import { Button, Col, Modal, Row, Spin, Table } from "antd"
import { useEffect, useState } from "react"
import SubGrupoFormV3 from "../forms/deposito/SubgrupoFormV3"
import globals from "@/src/globals"

const ListaPreciosGrupo = (props) => {
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

    return  loading ? <Spin /> : subgrupos.length<1 ? <></> : <div>
        <Col style={{flex:"100%",   border:"1px solid #314E2B", padding:"3px", borderRadius:"4px", margin:"6px"}} flex="1 0 50%" >
            <Row>
                <Col span={24} style={{padding:"1em", fontWeight:"bold", backgroundColor:"#006BD1", color:"white"}}>
                        {props.nombre}
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table 
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    columns={columns} 
                    dataSource={subgrupos} 
                    pagination={false} 
                    loading={loading} 
                    
                    
                    />
                </Col>
            </Row>
        </Col>
        <Modal destroyOnClose open={popupDetalleOpen} onCancel={()=>{setPopupDetalleOpen(false)}} footer={null} title="Detalle " width={"600px"}>
            <SubGrupoFormV3 mostrarPrecioMayorista={ esAdmin } mostrarPrecioPar={mostrarPrecioPar} callback={()=>{setPopupDetalleOpen(false); setReload(!reload)}} readOnly={ !(esAdmin || esUDeposito) } idsubgrupo={selectedSubgrupoId} title="Detalle Subgrupo" />
        </Modal>
        
    </div>
    
}

export default ListaPreciosGrupo;   