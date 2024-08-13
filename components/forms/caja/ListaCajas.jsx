import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeCaja from "@/components/informes/caja/InformeCaja";
import InformeCajaV2 from "@/components/informes/caja/InformeCajaV2";
import InformeCajaV3 from "@/components/informes/caja/InformeCajaV3";
import LayoutCaja from "@/components/layout/layout_caja"
import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Button, Col, Form, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";

export default function ListaCaja(props){
    const [dataSource, setDataSource] = useState([])
    const [selectedCaja, setSelectedCaja] = useState(-1)
    const [popupOpen, setPopupOpen] = useState(false)

    useEffect(()=>{
        fetch(get.lista_caja_sucursal + props.idsucursal /*globals.obtenerSucursal()*/)
        .then(response=>response.json())
        .then((response)=>{
            setDataSource(response.data)
        })
        .catch(err=>{console.log(err)})
    },[])
    
    const columns = [
        {dataIndex:'idcaja', title: 'ID'},
        {dataIndex:'fecha_f', title: 'Fecha'},
        {dataIndex:'monto_inicial', title: 'Monto'},
        {dataIndex:'estado', title: 'Estado'},
        {dataIndex: 'idcaja', title: 'Acciones', render: (_,{idcaja})=>{
            return <>
                <Button onClick={()=>{setSelectedCaja(idcaja);setPopupOpen(true)}}>Ver</Button>
                
            </>
        }}
    ]
    
    return (<>
        <h3>Lista de caja diaria</h3>
        <Row>
            <Col span={24}>
                <Table columns={columns} dataSource={dataSource} />
            </Col>
        </Row>
        <Modal width={"80%"} open={popupOpen} onCancel={()=>{setPopupOpen(false)}} footer={null} title="Informe de Caja" destroyOnClose>
            <InformeCajaV3 idcaja={selectedCaja} idsucursal={props.idsucursal} />
        </Modal>
        
    </>)
}
