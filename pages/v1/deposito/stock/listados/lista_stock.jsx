import CustomModal from "@/components/CustomModal";
import CustomTable from "@/components/forms/CustomTable";
import ModificarCantidadForm from "@/components/forms/deposito/modificarCantidadForm";
import { get } from "@/src/urls";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import { useEffect, useState } from "react";

export default function ListaStock(){
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const idsucursal = "1";//temporary
    //#region ONSEARCH
    const onSearch = (value) => {
        setLoading(true)
        fetch(get.buscar_stock + idsucursal + "/" + value)
        .then((response)=>response.json())
        .then((response)=>{
            /*
            this returns rows results from search
            */
            setData(
                response.data.map(
                    (row) => ({
                        key: row.idcodigo,
                        codigo: row.codigo,
                        ruta: "",
                        //descripcion: row.descripcion,
                        cantidad: "0",
                        idcodigo: row.idcodigo,
                        })
                )
            )
            setLoading(false)
        })
        .catch((error)=>{console.error(error)})
    }
    //#endregion
    
    //THIS IS NEW
    useEffect(()=>{
        setReload(false)
        setLoading(true)
        fetch(get.lista_stock+idsucursal)
        .then(response=>response.json())
        .then((response)=>{
            setData(response.data.map(
                        (row)=>(
                            {
                                key: row.idcodigo,
                                codigo: row.codigo,
                                ruta: row.ruta,
                                cantidad: row.cantidad,
                                idcodigo: row.idcodigo,
                            }
                        )
                    ))
            setLoading(false)
        })
        .catch(err=>{console.error(err)})
    },[reload])

    const columns = [
        {title: 'Codigo',dataIndex: 'codigo',key: 'codigo'},
        {title: 'Ruta',dataIndex: 'ruta',key: 'ruta'},
        {title: 'Cantidad',dataIndex: 'cantidad',key: 'cantidad'},
        {
            title: 'Acciones', dataIndex: 'idstock', key: 'idstock',
            render: 
                (_,{idcodigo})=>{
                    return (<>
                         <CustomModal
                         openButtonText={"Modificar Cantidad"}
                         title={"Modificar Cantidad"}
                         onOk={()=>{
                            setReload(true)
                         }}> 

                         <ModificarCantidadForm                                       
                         idcodigo={idcodigo}
                         idsucursal={idsucursal} 
                         />
                         
                         </CustomModal>
                    </>    )                
                }
        }
    ]
    
    return(
        <>
        <h1>Lista de Stock</h1>
        <Input.Search onSearch={onSearch} />
        <Button onClick={()=>{setReload(true)}}><ReloadOutlined /></Button>
        <Table columns={columns} dataSource={data} loading={loading} ></Table>
        </>
    )
}