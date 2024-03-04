import { Button, Table, Input, Row } from "antd";
import { useState } from "react";
import { get, post } from "@/src/urls";
import globals from "@/src/globals";
import { PlusCircleFilled } from "@ant-design/icons";
import { post_method } from "@/src/helpers/post_helper";

const SearchStock = (props) => {
    const id_sucursal = globals.obtenerSucursal();
    const search_url = post.obtener_stock_ventas;
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)


    const onSearch = (value) => {
        setLoading(true)
        post_method(search_url,{filtroCod:value, filtroFamilias:[], idSucursal:globals.obtenerSucursal()},(response)=>{
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
        //fetch(search_url+value)
        //.then((response)=>response.json())
        //.then((_response)=>{
        //    
        //    var response = typeof props.onParseResponse !== 'undefined' ? props.onParseResponse(_response) : _response;
        //    /*
        //    this returns rows results from search
        //    */
        //   //controlar con datos existentes
        //    setDataSource(
        //        response.data.map(
        //            (row) => ({
        //                key: row.idcodigo,
        //                codigo: row.codigo,
        //                descripcion: row.descripcion,
        //                idcodigo: row.idcodigo,
        //                habilitado: {val: typeof row.habilitado === 'undefined' ? true : row.habilitado, idcodigo: row.idcodigo},/* un codigo puede no estar habilitado */
        //                })
        //        )
        //    )
        //    setLoading(false)
        //})
        //.catch((error)=>{console.error(error)})
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