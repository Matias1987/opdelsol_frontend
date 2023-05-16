import { Button, Table, Search, Input, Row } from "antd";
import { useState } from "react";
import { get } from "@/src/urls";
import globals from "@/src/globals";
import { PlusCircleFilled } from "@ant-design/icons";

const SearchStock = (props) => {
    const id_sucursal = globals.obtenerSucursal();
    const search_url = get.buscar_stock + id_sucursal+ "/";
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)


    const onSearch = (value) => {
        setLoading(true)
        fetch(search_url+value)
        .then((response)=>response.json())
        .then((_response)=>{
            
            var response = typeof props.onParseResponse !== 'undefined' ? props.onParseResponse(_response) : _response;
            /*
            this returns rows results from search
            */
           //controlar con datos existentes
            setDataSource(
                response.data.map(
                    (row) => ({
                        key: row.idcodigo,
                        codigo: row.codigo,
                        descripcion: row.descripcion,
                        idcodigo: row.idcodigo,
                        habilitado: {val: typeof row.habilitado === 'undefined' ? true : row.habilitado, idcodigo: row.idcodigo},/* un codigo puede no estar habilitado */
                        })
                )
            )
            setLoading(false)
        })
        .catch((error)=>{console.error(error)})
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
                        /*{title:"Descripcion", dataIndex: "descripcion",},*/
                        {
                            title:"", 
                            dataIndex: "habilitado",
                            render: 
                                (_,{habilitado})=>{
                                    return (
                                    <>
                                        {
                                            habilitado.val?
                                            <Button onClick={()=>{props.callback(habilitado.idcodigo)}}><PlusCircleFilled /></Button>
                                            :
                                            <span>Ya seleccionado</span>
                                        }
                                        
                                    </>
                                    )
                                }
                        },
                    ]
                }
            />
            </Row>
        </>
    )
}

export default SearchStock;