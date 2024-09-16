import { Button, Table, Input, Row, Col } from "antd";
import { useState } from "react";
import { post } from "@/src/urls";
import globals from "@/src/globals";
import { CheckCircleFilled, CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import { post_method } from "@/src/helpers/post_helper";
import { regex_get_id_if_match } from "@/src/helpers/barcode_helper";

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
    
    const onSearch = (e) => {
        const id = regex_get_id_if_match(e?.target?.value?.toUpperCase()||"")
          
        var fil = id>0 ? "" : filtros.mainval
        if(id>0)
        {
            setFiltros(f=>({...f,mainval:""}))
        }
        const _srchval = `${fil}${filtros.esf == "" ? "" : " ESF"+filtros.esf}${filtros.cil == "" ? "" : " CIL" + filtros.cil}${filtros.add == "" ? "" : " ADD"+filtros.add}`
        setLoading(true)
        
        const filters= {filtroCod: _srchval, idSucursal: id_sucursal, filtroFamilias: typeof props.idfamilias === 'undefined' ? [] : props.idfamilias, idcodigo: id }
        
        post_method(search_url, filters,
        (_response)=>{
            var response = typeof props.onParseResponse !== 'undefined' ? props.onParseResponse(_response) : _response;

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


    return (
        <>
        <Row>
            <Col span={24}>
                <Input 
                value={filtros.mainval}
                placeholder="Ingrese valor de búsqueda"
                onChange={(e)=>{
                    setFiltros(
                        _f=>({..._f,mainval:e.target.value})
                        )
                    }
                    }

                onKeyUp={(e)=>{
                    if (e.key === 'Enter') {
                        
                        onSearch(e)
                    }
                }}
                    
                />
            </Col>
        </Row>
        <Row>
            <Col span={6}>
                <Input step={.25} min={-20} max={20} prefix="Esf.:" value={filtros.esf} onKeyUp={(e)=>{
                    if (e.key === 'Enter') {
                        onSearch(e)
                    }
                }} onChange={(e)=>{setFiltros(_f=>({..._f,esf:e.target.value}))}}/>
            </Col>
            <Col span={6}>
                <Input prefix="Cil.:" step={.25} min={-20} max={20} value={filtros.cil} onKeyUp={(e)=>{
                    if (e.key === 'Enter') {
                        onSearch(e)
                    }
                }}onChange={(e)=>{setFiltros(_f=>({..._f,cil:e.target.value}))}}/>
            </Col>
            <Col span={6}>
                <Input prefix="Add.:" step={.25} min={-20} max={20} value={filtros.add} onKeyUp={(e)=>{
                    if (e.key === 'Enter') {
                        onSearch(e)
                    }
                }}onChange={(e)=>{setFiltros(_f=>({..._f,add:e.target.value}))}}/>
            </Col>
            <Col span={6}><Button danger onClick={(e)=>{setFiltros(_f=>({esf:"", cil:"",add:""}))}}><CloseCircleFilled /></Button></Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Button type="primary" size="small" onClick={onSearch} block><SearchOutlined /> Buscar</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table 
                    scroll={{y:"300px"}}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
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