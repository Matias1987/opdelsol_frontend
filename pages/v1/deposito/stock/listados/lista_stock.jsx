import CustomModal from "@/components/CustomModal";
import CustomTable from "@/components/forms/CustomTable";
import DetalleStock from "@/components/forms/deposito/DetalleStock";
import ModificarCantidadForm from "@/components/forms/deposito/modificarCantidadForm";
import globals from "@/src/globals";
import { get } from "@/src/urls";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import { useEffect, useRef, useState } from "react";

export default function ListaStock(){
    const [popupOpen, setPopupOpen] = useState(false)
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [valueChanged, setValueChanged] = useState(false)
    const searchRef = useRef(null)
    const idsucursal = globals.obtenerSucursal();//temporary
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
                        ruta: row.ruta,
                        //descripcion: row.descripcion,
                        cantidad: row.cantidad,
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
        //setReload(false)+
        searchRef.current.value = ""; 
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
    },[valueChanged])

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
                         openButtonText={"Modificar"}
                         title={""}
                         _open = {popupOpen}
                         onOk={()=>{
                            setPopupOpen(false)
                            setValueChanged(!valueChanged)
                         }}
                         onCancel={()=>{
                            setValueChanged(!valueChanged)
                         }}
                         > 
                         

                         <ModificarCantidadForm                                       
                         idcodigo={idcodigo}
                         idsucursal={idsucursal} 
                        
                         />
                         
                         </CustomModal>
                         &nbsp;
                         <CustomModal
                            openButtonText={"Detalles"}
                            title={"Detalles"}
                            onOk={()=>{}}
                            onCancel={()=>{}}
                         >

                            <DetalleStock idcodigo={idcodigo} />
                            
                         </CustomModal>
                    </>    )                
                }
        }
    ]

    const onReset = ()=>{
        setValueChanged(!valueChanged); 
        searchRef.current.value = ""; 
        console.log(searchRef.current.value)
    }
    
    return(
        <>
        <h1>Lista de Stock</h1>
        <Input.Search onSearch={onSearch} ref={searchRef} />
        <Button onClick={onReset}><ReloadOutlined /></Button>
        <Table columns={columns} dataSource={data} loading={loading} ></Table>
        </>
    )
}