import GastoForm from "@/components/forms/caja/GastoForm";
import LayoutCaja from "@/components/layout/layout_caja";
import { get } from "@/src/urls";
import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";

export default function ListaGastos(){
    const [gastos, setGastos] = useState([])
    const [open, setOpen] = useState(false)


    useEffect(()=>{
        fetch(get.lista_gastos)
        .then(response=>response.json())
        .then((response)=>{
            setGastos(response.data.map(r=>({
                idgasto: r.idgasto,
                concepto: r.concepto,
                monto: r.monto,
            })))
        })
    },[])

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
            <GastoForm />
        </Modal>
        <Table dataSource={gastos} columns={
            [
                {dataIndex: "idgasto", title: "Nro."},
                {dataIndex: "monto", title: "Monto"},
                {dataIndex: "concepto", title: "Concepto"},
            ]
        } />
    </>
}

ListaGastos.PageLayout = LayoutCaja;
