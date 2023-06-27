import CustomModal from "@/components/CustomModal";
import { InputNumber, Table } from "antd";
import { useState } from "react";
import { get } from "@/src/urls";
import globals from "@/src/globals";
import SearchStockVentas from "../SearchStockVentas";

const VDItem = (props) => {
    const [items, setItems] = useState([])

    const onCantidadChange = (value, _idcodigo) => {
        setItems(
            (items)=>{
                const _items = items.map(i=>{
                    if(i.idcodigo == _idcodigo){
                        i.cantidad = value;
                        i.total = i.cantidad * i.precio;
                    }
                    return i;
                })
                //props?.callback(_items)
                return _items;
            }
        )
    }

    const onAddNewCode = (idcodigo) => {
        alert(get.detalle_stock + globals.obtenerSucursal() + "/" + idcodigo)
        //get details
        fetch(get.detalle_stock + globals.obtenerSucursal() + "/" + idcodigo)
        .then(response=>response.json())
        .then((response)=>{
            setItems((items)=>({
                idcodigo: response.data[0].idcodigo,
                codigo: response.data[0].codigo,
                cantidad_max: response.data[0].cantidad,
                cantidad:1,
                precio: response.data[0].precio,
                total: response.data[0].precio,
                descripcion: response.data[0].descripcion,
            }))
        })
    }

    return (<>

    <SearchStockVentas callback={(idcodigo)=>{
        onAddNewCode(idcodigo)
    }} />

    <Table columns={[
        {title:"Codigo", dataIndex:"codigo"},
        {title:"Desc.", dataIndex:"descripcion"},
        {title:"Cantidad", dataIndex:"cantidad_max", render:(_,{idcodigo,cantidad_max,cantidad})=>{
            <>
                <InputNumber min={1} max={cantidad_max} value={cantidad} onChange={(v)=>{
                    onCantidadChange(v,idcodigo)
                }} />
            </>
        }},
        {title:"Precio", dataIndex:"precio"},
        {total:"Total", dataIndex:"total"}
    ]}

    dataSource={items}

    />

    </>)
}

export default VDItem;