import CustomModal from "@/components/CustomModal";
import { Button, Input, InputNumber, Modal, Table } from "antd";
import { useState } from "react";
import { get } from "@/src/urls";
import globals from "@/src/globals";
import SearchStockVentas from "../SearchStockVentas";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { parse_float_string, parse_int_string } from "@/src/helpers/string_helper";

const VDItem = (props) => {
    const [items, setItems] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    const onCantidadChange = (value, _idcodigo) => {
        setItems(
            (__items)=>{
                const _items = __items.map(i=>{
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
            setItems((__items)=>{
                const _items = [
                    ...__items,
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
        setItems((__items)=>{
            const _items = __items.filter(r=>r.idcodigo!=id);
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
    <Modal width={"80%"} title="Agregar Producto" open={modalOpen} onOk={onOK} onCancel={onCancel} destroyOnClose={true}>
        <SearchStockVentas 
        idfamilias={[globals.familiaIDs.ARMAZON, globals.familiaIDs.INSUMO, globals.familiaIDs.LC, globals.familiaIDs.LIQUIDOS, globals.familiaIDs.TRATAMIENTO, globals.familiaIDs.CRISTALES]}
        callback={(idcodigo)=>{
                onAddNewCode(idcodigo)
                setModalOpen(false)
            }} />
    </Modal>

    <Table 
    pagination={false}
    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
    
    columns={[
        {title:"Codigo", dataIndex:"codigo"},
        {title:"Desc.", dataIndex:"descripcion"},
        {title:"Cantidad", dataIndex:"cantidad_max", width:"160px", render:(_,{idcodigo,cantidad_max,cantidad})=>(
            <>
                <Input type="number" min={1} max={cantidad_max} value={cantidad} onChange={(e)=>{
                    onCantidadChange(parse_int_string(e.target.value) > cantidad_max ? cantidad_max : parse_int_string(e.target.value) ,idcodigo)
                }} />
            </>
        )},
        {title:"Precio", dataIndex:"precio", width:"160px", render:(_,{precio,codigo})=><Input onWheel={(e)=>{e.target.blur()}} type="number" value={precio} onChange={(e)=>{
            setItems(__items=>
                {
                    const _items_ = __items.map((i)=>(i.codigo==codigo ? { ...i,precio:parse_float_string(e.target.value), total: parse_float_string(e.target.value) * parse_float_string(i.cantidad)}:i))
                    props?.callback?.(_items_)
                    return _items_
                }   
                )
        }}/>} ,
        {title:"Total", dataIndex:"total", width:"160px"},
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