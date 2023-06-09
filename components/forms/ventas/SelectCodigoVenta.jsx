import CustomModal from "@/components/CustomModal";
import SearchCodigo from "@/components/SearchCodigo";
import SearchStock from "@/components/SearchStock";
import SearchStockVentas from "./SearchStockVentas";
import { useState } from "react";
import { get } from "@/src/urls";
import globals from "@/src/globals";
import { Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

export default function SelectCodigoVenta(props){
    const [dataCodigo, setDataCodigo] = useState(null);
    const query_detalles = get.obtener_stock_detalles_venta + globals.obtenerSucursal() + "/";
    const onCodigoSelected = (id)=>{
        //get details!
        fetch(query_detalles + id)
        .then(response=>response.json())
        .then((response)=>{
            const _data = {
                codigo: response.data[0].codigo,
                descripcion: response.data[0].descripcion,
                precio: response.data[0].precio,
                idcodigo: id,
            };
            setDataCodigo(
                _data
            )

            if(typeof props.callback !== 'undefined'){
                props.callback(_data)
            }
        })
        .catch((error)=>{alert(error)})
    }
    return (
        dataCodigo === null ?
    <>
        <CustomModal 
        openButtonText= { typeof props.buttonText === 'undefined' ? 'Seleccione Codigo' : props.buttonText }
        title="Buscar"
        >
            <SearchStockVentas idfamilias={typeof props.filtros === 'undefined' ? [] : props.filtros} callback={onCodigoSelected} />
        </CustomModal>
        </>
        :
        <>
        <span>Codigo:&nbsp;<b>{dataCodigo.codigo}</b>&nbsp;&nbsp;&nbsp;Desc.:<b>{dataCodigo.descripcion}</b>&nbsp;<Button danger size="small" onClick={()=>{setDataCodigo(null)}}><CloseCircleFilled /></Button></span>
        </>
        )}