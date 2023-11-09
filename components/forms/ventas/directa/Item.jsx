import CustomModal from "@/components/CustomModal";
import { Button, Input, InputNumber, Modal, Table } from "antd";
import { useState } from "react";
import { get } from "@/src/urls";
import globals from "@/src/globals";
import SearchStockVentas from "../SearchStockVentas";
import { CloseCircleTwoTone } from "@ant-design/icons";

const VDItem = (props) => {
    const [items, setItems] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

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
        const found = items.find(r=>r.idcodigo == idcodigo)
        if(found){
            alert("Codigo ya cargado")
            return
        }
        //get details
        fetch(get.detalle_stock + globals.obtenerSucursal() + "/" + idcodigo)
        .then(response=>response.json())
        .then((response)=>{
            setItems((items)=>{
                const _items = [
                    ...items,
                    {
                    tipo:"vdir",
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

    const onOK = () => {
        setModalOpen(false)
    }

    const onCancel = () => {
        setModalOpen(false)
    }

    return (<>
    <Button size="small" block type="primary" onClick={()=>{setModalOpen(true)}}>Agregar Producto</Button>
    <Modal title="Agregar Producto" open={modalOpen} onOk={onOK} onCancel={onCancel} destroyOnClose={true}>
        <SearchStockVentas callback={(idcodigo)=>{
                onAddNewCode(idcodigo)
                setModalOpen(false)
            }} />
    </Modal>

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
        {title:"Precio", dataIndex:"precio", render:(_,{precio,codigo})=><Input type="number" defaultValue={precio} onChange={(e)=>{
            setItems(__items=>
                {
                    const _items_ = __items.map((i)=>(i.codigo==codigo ? { ...i,precio:parseFloat(e.target.value), total: parseFloat(e.target.value) * parseFloat(i.cantidad)}:i))
                    props?.callback?.(_items_)
                    return _items_
                }   
                )
        }}/>} ,
        {title:"Total", dataIndex:"total"},
        {title:"", render:(_,{idcodigo})=>(
            <>
                <Button onClick={()=>{OnRemoveRow(idcodigo)}}><CloseCircleTwoTone  /></Button>
            </>
        )}
    ]}

    dataSource={items}

    />

    </>)
}

export default VDItem;