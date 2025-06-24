import CustomModal from "@/components/CustomModal";
import SearchStockVentas from "./SearchStockVentas";
import { useState } from "react";
import { get } from "@/src/urls";
import globals from "@/src/globals";
import { Button } from "antd";
import { CloseCircleFilled, EditOutlined } from "@ant-design/icons";
import DefaultImageProduct from "@/components/etc/imagen/default_image_prod";

/**
 * 
 * @param idfamilias collection of filter ids 
 * @param callback callback
 * @param buttonText
 * @param filtros
 */
export default function SelectCodigoVenta(props){
    const {hideExtOpt} = props;
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
                cantidad: response.data[0].cantidad,
                idcodigo: id,
            };
            setDataCodigo(
                _data
            )

            props?.callback?.(_data)
        })
        .catch((error)=>{alert(error)})
    }

    const on_remove = () => {
        setDataCodigo(null);
        props?.callback?.({codigo:null,precio:0, idcodigo:-1})
    }


    const _codigo_style = {
        fontSize:".85em",
    }

    const _button = _ => <Button danger size="small" type="ghost" style={{color:"red"}} onClick={()=>{on_remove()}}><CloseCircleFilled /></Button>

    return (
        dataCodigo === null ?
        <>
            <CustomModal 
            width="900px"
            openButtonText= { <i> <EditOutlined /> { typeof props.buttonText === 'undefined' ? 'Seleccionar Código' : props.buttonText } </i>}
            title="Buscar"
            >
                <SearchStockVentas idfamilias={typeof props.idfamilias === 'undefined' ? [] : props.idfamilias} callback={onCodigoSelected} hideExtOpt={hideExtOpt||"0"} />
            </CustomModal>
            </>
            :
            <>
            <DefaultImageProduct idproduct={dataCodigo.idcodigo} /> <span style={_codigo_style}>Codigo:&nbsp;<b>{dataCodigo.codigo.length>30 ? dataCodigo.codigo.substring(0,30)+"..." : dataCodigo.codigo}</b>{_button()}</span>
        </>
        )}