import GastoForm from "@/components/forms/caja/GastoForm";
import LayoutCaja from "@/components/layout/layout_caja";
import { get } from "@/src/urls";
import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";

export default function ListaGastos(){
    const [gastos, setGastos] = useState([])
    const [open, setOpen] = useState(false)
    const [reload, setReload]  = useState(true)


    useEffect(()=>{
        fetch(get.lista_gastos)
        .then(response=>response.json())
        .then((response)=>{
            setGastos(response.data.map(r=>({
                idgasto: r.idgasto,
                concepto_gasto: r.concepto_gasto,
                monto: r.monto,
                fecha_f: r.fecha_f,
            })))
        })
    },[reload])

    return <>
        <Button type="primary" ghost  size="small"  onClick={()=>{setOpen(true)}}>
        Cargar Gasto
        </Button>
        <Modal 
        open={open} 
        onOk={()=>{
            setOpen(false)
        }}
        onCancel={()=>{
            setOpen(false)
        }}
        >
            <GastoForm callback={()=>{setReload(!reload); setOpen(false)}}/>
        </Modal>
        <Table dataSource={gastos} columns={
            [
                {dataIndex: "idgasto", title: "Nro."},
                {dataIndex: "fecha_f", title: "Fecha"},
                {dataIndex: "monto", title: "Monto"},
                {dataIndex: "concepto_gasto", title: "Concepto"},
            ]
        } />
    </>
}

ListaGastos.PageLayout = LayoutCaja;
