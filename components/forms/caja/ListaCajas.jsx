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
        {width:"80px",dataIndex:'idcaja', title: 'ID'},
        {width:"200px",dataIndex:'fecha_f', title: 'Fecha'},
        {width:"200px",dataIndex:'monto_inicial', title: 'Monto'},
        {width:"200px",dataIndex:'estado', title: 'Estado'},
        {width:"100px",dataIndex: 'idcaja', title: 'Acciones', render: (_,{idcaja})=> <Button size="small" type="primary" onClick={()=>{setSelectedCaja(idcaja);setPopupOpen(true)}}>Ver</Button>}
    ]
    
    return (<>
        <h3>Lista de caja diaria</h3>
        <Row>
            <Col span={24}>
                <Table size="small" columns={columns} dataSource={dataSource} scroll={{y:"450px"}} />
            </Col>
        </Row>
        <Modal width={"1300px"} open={popupOpen} onCancel={()=>{setPopupOpen(false)}} footer={null} title="Informe de Caja" destroyOnClose>
            <InformeCajaV3 idcaja={selectedCaja} idsucursal={props.idsucursal} />
        </Modal>
        
    </>)
}
