import { Button, Table, Input, Row, Col } from "antd";
import { useState } from "react";
import { get, post } from "@/src/urls";
import globals from "@/src/globals";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { post_method } from "@/src/helpers/post_helper";

/**
 * 
 * @param filtroFamilias 
 * @param onParseResponse parse method
 * 
 */
const SearchStockVentas = (props) => {
    const id_sucursal = globals.obtenerSucursal();
    const search_url = post.obtener_stock_ventas;
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [filtros, setFiltros] = useState({
        mainval: "", esf:"",cil:"",add:""
    })
    const [srchVal, setSrchVal] = useState("")


    const onSearch = (value) => {
        const _srchval = `${value}${filtros.esf == "" ? "" : " ESF"+((parseFloat(filtros.esf)>0 ? "+" : "" ) + filtros.esf)}${filtros.cil == "" ? "" : " CIL" + (parseFloat(filtros.cil)>0 ? "+" : "" ) +filtros.cil}${filtros.add == "" ? "" : " ADD"+filtros.add}`
        setLoading(true)
        //alert(_srchval)
        //console.log(JSON.stringify(props.idfamilias))
        post_method(search_url, {filtroCod: _srchval, idSucursal: id_sucursal, filtroFamilias: typeof props.idfamilias === 'undefined' ? [] : props.idfamilias },
        (_response)=>{
            var response = typeof props.onParseResponse !== 'undefined' ? props.onParseResponse(_response) : _response;
            //alert(JSON.stringify(response))
            setDataSource(
                response.data.map(
                    (row) => ({
                        key: row.idcodigo,
                        codigo: row.codigo,
                        descripcion: row.descripcion,
                        idcodigo: row.idcodigo,
                        })
                )
            )
            setLoading(false)
        }
        )
    }

    const onChange = () => {
        setSrchVal(`${value}${filtros.esf == "" ? "" : " ESF"+filtros.esf}${filtros.cil == "" ? "" : " CIL"+filtros.cil}${filtros.add == "" ? "" : " ADD"+filtros.add}`)
    }

    return (
        <>
        <Row>
            <Col span={24}>
                <Input.Search 

                /*onChange={(e)=>{
                    setFiltros(
                        _f=>({..._f,mainval:e.target.value})
                        )}
                    }*/
                    
                onSearch={onSearch}  />
            </Col>
        </Row>
        <Row>
            <Col span={6}>
                <Input type="number" step={.25} min={-20} max={20} prefix="Esf.:" value={filtros.esf} onChange={(e)=>{setFiltros(_f=>({..._f,esf:e.target.value}))}}/>
            </Col>
            <Col span={6}>
                <Input prefix="Cil.:" step={.25} min={-20} max={20} value={filtros.cil} onChange={(e)=>{setFiltros(_f=>({..._f,cil:e.target.value}))}}/>
            </Col>
            <Col span={6}>
                <Input prefix="Add.:" step={.25} min={-20} max={20} value={filtros.add} onChange={(e)=>{setFiltros(_f=>({..._f,add:e.target.value}))}}/>
            </Col>
            <Col span={6}><Button danger onClick={(e)=>{setFiltros(_f=>({esf:"", cil:"",add:""}))}}><CloseCircleFilled /></Button></Col>
        </Row>
        <Row style={{height: "300px", overflowY: "scroll"}}>
            <Col span={24}>
                <Table 
                    pagination={false}
                    loading={loading}
                    dataSource={dataSource} 
                    columns={
                        [
                            {title:"Codigo", dataIndex: "codigo",},
                            {title:"Descripcion", dataIndex: "descripcion",},
                            {
                                title:"", 
                                dataIndex: "idcodigo",
                                render: 
                                    (_,{idcodigo})=><Button onClick={()=>{props.callback(idcodigo)}}><CheckCircleFilled /></Button>
                            },
                        ]
                    }
                />
            </Col>
            </Row>
        </>
    )
}

export default SearchStockVentas;