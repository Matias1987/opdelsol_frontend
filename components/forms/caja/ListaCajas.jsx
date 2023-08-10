import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeCaja from "@/components/informes/caja/InformeCaja";
import LayoutCaja from "@/components/layout/layout_caja"
import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Button, Form, Input, Table } from "antd";
import { useEffect, useState } from "react";

export default function ListaCaja(){
    const [dataSource, setDataSource] = useState([])

    useEffect(()=>{
        fetch(get.lista_caja_sucursal + globals.obtenerSucursal())
        .then(response=>response.json())
        .then((response)=>{
            setDataSource(response.data)
        })
        .catch(err=>{console.log(err)})
    },[])
    
    const columns = [
        {dataIndex:'idcaja', title: 'ID'},
        {dataIndex:'fecha', title: 'Fecha'},
        {dataIndex:'monto_inicial', title: 'Monto'},
        {dataIndex:'estado', title: 'Estado'},
        {dataIndex: 'idcaja', title: 'Acciones', render: (_,{idcaja})=>{
            return <>
                <CustomModal openButtonText="Imprimir" block>
                    <PrinterWrapper>
                        <InformeCaja idcaja={idcaja} />
                    </PrinterWrapper>
                </CustomModal>
            </>
        }}
    ]
    
    return (<>
        <h3>Lista de caja diaria</h3>
        <Table columns={columns} dataSource={dataSource} />
    </>)
}
