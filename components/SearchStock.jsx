import { Button, Table, Search, Input } from "antd";
import { useState } from "react";

const SearchStock = (props) => {
    const id_sucursal = 1; //!!!!TEMPORARY
    const search_url = `http://localhost:3000/api/v1/stock/search/${id_sucursal}/`;
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const onkeyUp =() => {

    }
    const onSearch = (value) => {
        setLoading(true)
        fetch(search_url+value)
        .then((response)=>response.json())
        .then((response)=>{
            /*
            this returns rows results from search
            */
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
        })
        .catch((error)=>{console.error(error)})
    }
    return (
        <>
        <Input.Search onSearch={onSearch}  />
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
                        (_,{idcodigo})=>{
                            return (<Button onClick={()=>{props.callback(idcodigo)}}>Seleccionar</Button>)
                        }
                    
                },
            ]
        }
        />
        </>
    )
}

export default SearchStock;