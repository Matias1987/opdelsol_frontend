import GastoForm from "@/components/forms/caja/GastoForm";
import LayoutCaja from "@/components/layout/layout_caja";
import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Button, Card, Modal, Table } from "antd";
import { useEffect, useState } from "react";

export default function ListaGastos(){
    const [gastos, setGastos] = useState([])
    const [open, setOpen] = useState(false)
    const [reload, setReload]  = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true);
        
        fetch(get.lista_gastos_sucursal + globals.obtenerSucursal())
        .then(response=>response.json())
        .then((response)=>{
            
            setGastos(response.data.map(r=>({
                idgasto: r.idgasto,
                concepto_gasto: r.concepto_gasto,
                monto: r.monto,
                fecha_f: r.fecha_f,
            })))
          
           setLoading(false)
        })
    },[reload])

    return <>
       
        
        <Modal 
        destroyOnClose
        open={open} 
        footer={null}
        /*onOk={()=>{
            setOpen(false)
        }}*/
        onCancel={()=>{
            setOpen(false)
        }}
        >
            <GastoForm callback={()=>{setReload(!reload); setOpen(false)}}/>
        </Modal>
        <Card title={<>Lista de Gastos <Button type="primary"   size="small"  onClick={()=>{setOpen(true)}}>
        Cargar Gasto
        </Button></>} style={{boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"}}>
        <Table 
        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
        size="small"
        scroll={{y:"450px"}}
        loading={loading}
        dataSource={gastos} 
        columns={
            [
                {width:"100px", dataIndex: "idgasto", title: "Nro."},
                {width:"100px", dataIndex: "fecha_f", title: "Fecha"},
                {width:"100px", dataIndex: "monto", title: "Monto"},
                {width:"100px", dataIndex: "concepto_gasto", title: "Concepto"},
            ]
        } />
        </Card>
    </>
}

ListaGastos.PageLayout = LayoutCaja;
