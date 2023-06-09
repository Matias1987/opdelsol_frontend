import { Button, Table, Search, Input, Row } from "antd";
import { useState } from "react";
import { get, post } from "@/src/urls";
import globals from "@/src/globals";
import { CheckCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { post_method } from "@/src/helpers/post_helper";

const SearchStockVentas = (props) => {
    const id_sucursal = globals.obtenerSucursal();
    const search_url = post.obtener_stock_ventas;
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)


    const onSearch = (value) => {
        setLoading(true)

        post_method(search_url, {filtroCod: value, idSucursal: id_sucursal, filtroFamilias: typeof props.filtroFamilias === 'undefined' ? [] : props.filtroFamilias },
        (_response)=>{
            var response = typeof props.onParseResponse !== 'undefined' ? props.onParseResponse(_response) : _response;
            alert(JSON.stringify(response))
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
            <Input.Search onSearch={onSearch}  />
        </Row>
        <Row style={{height: "300px", overflowY: "scroll"}}>
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
            </Row>
        </>
    )
}

export default SearchStockVentas;