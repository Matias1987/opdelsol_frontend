import { Button, Card, Col, Flex, FloatButton, Input, Modal, Row, Table } from "antd"
import { useEffect, useState } from "react"
import { post_method } from "@/src/helpers/post_helper"
import globals from "@/src/globals"
import { get, post } from "@/src/urls"
import GrupoV2 from "./grupo_v2"
import SubGrupoFormV3 from "../forms/deposito/SubgrupoFormV3"
import CodeExample from "../etc/codeExample"
import { headers } from "@/next.config"

const ListaPreciosV3 = (props) => {
    const [subfamilias, setSubfamilias] = useState([])

    const [selectedSubFamilia, setSelectedSubFamilia] = useState({nombre:"", id:-1})

    const [loading, setLoading] = useState(false)

    const [fix, setFix] = useState(0)

    const [ncols, setNcols] = useState(2)

    const [columns, setColumns] = useState([])

    const [esAdmin, setEsAdmin] = useState(false)

    const [esUDeposito, setEsUDeposito] = useState(false)

    const [popupDetalleOpen, setPopupDetalleOpen] = useState(false)

    const [selectedSubgrupoId, setSelectedSubgrupoId] = useState(-1)

    const [mostrarPrecioPar, setMostrarPrecioPar] = useState(false)

    const [mostrarPrecioCaja, setMostrarPrecioCaja] = useState(false)

    const [filterStr, setFilterStr] = useState("");

    const [reload, setReload] = useState(false)

    useEffect(()=>{
        
        setEsAdmin(globals.esUsuarioAdmin())

        setEsUDeposito(globals.esUsuarioDeposito())

        post_method(post.obtener_subfamilias_de_familias,
            {ids:[globals.familiaIDs.CRISTALES, globals.familiaIDs.LIQUIDOS, globals.familiaIDs.LC], soloVisibleLP:1},
            (resp)=>{
                //alert(JSON.stringify(resp))
                
                setSubfamilias(resp.data.map(sf=>({id:sf.idsubfamilia, nombre: sf.nombre_largo, familia: sf.familia})))

                if(resp.data.length>0)
                {
                    onSubfamiliaClick(resp.data[0].idsubfamilia, resp.data[0].nombre_largo)
                }
            }
        )
    },[])

    const onSubfamiliaClick = (idsf, nombre) => {
        
        setLoading(true)
        setSelectedSubFamilia(_=>({nombre:nombre, id:idsf}))
        
        fetch(get.optionsforsubfamilia + idsf + "/1")
        .then(r=>r.json())
        .then((response)=>{

            const _data_fixed = response.data.filter(_r=>+_r.subgrupo_qtty>0)
            
            setFix(fix+1)
            
            format_colums(_data_fixed)
            
            setLoading(false)
        })
        .catch(e=>{console.log("error")})
    }

    const format_colums = (data) =>{
        let weights = []

        let _columns = []

        const addItem  = (item) => {
            let minIdx=0, min=0
            min = weights[0]
            for( let i=1;i<ncols;i++ ) {
                
                if(min > weights[i])
                {
                    minIdx=i
                    min =  weights[i]
                }
            }
            _columns[minIdx].push(item)
            weights[minIdx]+= parseInt(item.subgrupo_qtty)
        }

        for(let i=0;i<ncols;i++){
            _columns.push([])
            weights.push(0)
        }


        data.forEach(d=>{
            addItem(d)
        })

        //alert(JSON.stringify(_columns))

        setColumns(_columns)
    }

    return <div style={{backgroundColor:"#E8EAF0"}}> 
    <Row >
        <Col span={18}>
        <Card 
        title={selectedSubFamilia.nombre} 
        size="small" 
        
        styles={{ header:{backgroundColor:"#663F4C", color:"white"}}} 
        extra={
            <div>
            <Input
            allowClear
            placeholder="Buscar..."
            style={{width:"300px", backgroundColor:"rgba(255, 255, 255, 1)", padding:"6px", borderRadius:"16px", color:"red", borderColor:"red"}}
            onChange={(e)=>{
                setFilterStr(e.target.value)
            }}
            />
            </div>  
        }
        >
       
            <Row key={fix}>
            {
                columns.map(_col=><Col span={12}>
                    {_col.map(_row=><GrupoV2 
                    filterStr={filterStr}
                    mostrarPrecioPar={mostrarPrecioPar} 
                    mostrarPrecioCaja={mostrarPrecioCaja} 
                    reload={reload} 
                    callback={(id,mostrarPar, mostrarCaja)=>{
                        setSelectedSubgrupoId(id); 
                        setMostrarPrecioPar(mostrarPar); 
                        setMostrarPrecioCaja(mostrarCaja);
                        setPopupDetalleOpen(true) 
                    }} nombre={_row.label} idgrupo={_row.value} />)}</Col>)
            }
            </Row>
            </Card>
        </Col>
        <Col span={6}>
            <Table 
            key={selectedSubFamilia}
            rowClassName={(record, index) => record.id == selectedSubFamilia.id ? 'table-selected-row' : index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            dataSource={subfamilias} 
            columns={
                [
                    {title:"Categorías", dataIndex:"nombre", render:(_,obj)=><Button style={{color: selectedSubFamilia.id==obj.id ? "#536872" : "#03045E", fontWeight:"bold", textAlign:"left", width:"100%", whiteSpace:"normal"}} disabled={loading} type="link" onClick={()=>{onSubfamiliaClick(obj.id,obj.nombre)}}>{obj.familia + ' / ' +obj.nombre}</Button>}
                ] 
                }
                pagination={false} 
                scroll={{y:"600px"}} 
                />
        </Col>
    </Row>
    
    <Modal destroyOnClose open={popupDetalleOpen} onCancel={()=>{setPopupDetalleOpen(false)}} footer={null} title="Detalle " width={"750px"}>
        <div>
            <SubGrupoFormV3 mostrarPrecioMayorista={ esAdmin } mostrarPrecioPar={mostrarPrecioPar} mostrarPrecioCaja={mostrarPrecioCaja} callback={()=>{setPopupDetalleOpen(false); setReload(!reload)}} readOnly={ !(esAdmin || esUDeposito) } idsubgrupo={selectedSubgrupoId} title="Detalle Subgrupo" />
            <CodeExample idsubgrupo={selectedSubgrupoId} />
        </div>
    </Modal>
    </div>
}

export default ListaPreciosV3