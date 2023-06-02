import { Button, Table, Search, Input, Row, Affix } from "antd";
import { useState } from "react";
import { get } from "@/src/urls";
import globals from "@/src/globals";
import { PlusCircleFilled } from "@ant-design/icons";

const SearchStockEnvio = (props) => {
    const id_sucursal = globals.obtenerSucursal();
    const search_url = get.buscar_stock_envios + id_sucursal+ "/";
    const [top,setTop] = useState(10);
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)


    const onSearch = (value) => {
        if(typeof props.idSucursalDestino === 'undefined'){
            alert("Sucursal destino no especificada");
            return
        }
        if(props.idSucursalDestino<0){
            alert("Sucursal destino no especificada");
            return
        }
        setLoading(true)
        
        fetch(search_url + props.idSucursalDestino + "/" +value)
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
                        cantidad: row.cantidad,
                        descripcion: row.descripcion,
                        idcodigo: row.idcodigo,
                        cantidad_destino: row.cantidad_sucursal,
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
            <Affix offsetTop={top}>
                <Input.Search onSearch={onSearch}  />
            </Affix>
        </Row>
        <Row style={{height: "300px", overflowY: "scroll"}}>
            <Table 
                pagination={false}
                loading={loading}
                dataSource={dataSource} 
                columns={
                    [
                        {title:"Codigo", dataIndex: "codigo" },
                        {title:"Loc.", dataIndex: "cantidad", render: (_,{cantidad})=>(<span style={{color:"#00972D"}}>{cantidad}</span>)},
                        {title:"Dest.", dataIndex: "cantidad_destino", render: (_,{cantidad_destino})=>(<span style={{color:"red"}}>{cantidad_destino}</span>)},
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

export default SearchStockEnvio;