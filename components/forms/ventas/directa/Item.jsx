import CustomModal from "@/components/CustomModal";
import { Button, InputNumber, Table } from "antd";
import { useState } from "react";
import { get } from "@/src/urls";
import globals from "@/src/globals";
import SearchStockVentas from "../SearchStockVentas";
import { CloseCircleTwoTone } from "@ant-design/icons";

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
                props?.callback?.(_items)
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
            setItems((items)=>{
                const _items = [
                    ...items,
                    {
                    idcodigo: response.data[0].idcodigo,
                    codigo: response.data[0].codigo,
                    cantidad_max: response.data[0].cantidad,
                    cantidad:1,
                    precio: response.data[0].precio,
                    total: response.data[0].precio,
                    descripcion: response.data[0].descripcion,
                    }
                ];
                props?.callback?.(_items);
                return _items;
            })
        })
    }

    const OnRemoveRow = (id)=>{
        setItems((items)=>{
            const _items = items.filter(r=>r.idcodigo!=id);
            props?.callback?.(_items)
            return _items;
        })
    }

    return (<>
    <CustomModal openButtonText="Agregar" title="">
        <SearchStockVentas callback={(idcodigo)=>{
            onAddNewCode(idcodigo)
        }} />
    </CustomModal>

    <Table columns={[
        {title:"Codigo", dataIndex:"codigo"},
        {title:"Desc.", dataIndex:"descripcion"},
        {title:"Cantidad", dataIndex:"cantidad_max", render:(_,{idcodigo,cantidad_max,cantidad})=>(
            <>
                <InputNumber addonAfter={"/" + cantidad_max} min={1} max={cantidad_max} value={cantidad} onChange={(v)=>{
                    onCantidadChange(v,idcodigo)
                }} />
            </>
        )},
        {title:"Precio", dataIndex:"precio"},
        {title:"Total", dataIndex:"total"},
        {title:"", render:(_,{idcodigo})=>(
            <>
                <Button><CloseCircleTwoTone onClick={()=>{OnRemoveRow(idcodigo)}} /></Button>
            </>
        )}
    ]}

    dataSource={items}

    />

    </>)
}

export default VDItem;