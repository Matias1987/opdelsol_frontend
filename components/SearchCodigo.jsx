import { Button, Table, Search, Input } from "antd";
import { useState } from "react";
import CustomModal from "./CustomModal";
import ModificarCantidadForm from "./forms/deposito/modificarCantidadForm";
const urls = require("../src/urls")

const SearchCodigo = (props) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const onkeyUp =() => {

    }
    const onSearch = (value) => {
        setLoading(true)
        fetch(urls.get.search_codigos + value)
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
                            return (
                                <>
                                    <Button onClick={()=>{props.callback(idcodigo)}}>Seleccionar</Button>
                                    
                                </>
                            )
                        }
                    
                },
            ]
        }
        />
        </>
    )
}

export default SearchCodigo;