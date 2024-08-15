import CustomModal from "@/components/CustomModal";
import { get } from "@/src/urls";
import FacturaForm from "@/components/forms/FacturaForm";
import DetalleFactura from "@/components/forms/deposito/DetalleFactura";

import { Table, Button, Modal, Row, Col, Select } from "antd"
import { useState, useEffect } from "react"
import { InfoOutlined } from "@ant-design/icons";

const ListaFacturas = (props) => {
    const [change, setChange] = useState(false)
    const [open, setOpen] = useState(false);
    const [proveedores, setProveedores] = useState([])
    const [selectedProveedor, setSelectedProveedor] = useState(-1)
    const [selectedFactura, setSelectedFactura] = useState(-1)
    const [popupDetalleFacturaOpen, setPopupDetalleFacturaOpen] = useState(false)
    const url_for_facturas = get.lista_facturas;
    const [tableData, setTableData] = useState([])
    const columns = [
        {title: 'Nro.', dataIndex: 'numero', key: 'numero'},
        {title: 'Fecha', dataIndex: 'fecha', key: 'fecha'},
        {title: 'Proveedor', dataIndex: 'proveedor', key: 'proveedor'},
        {title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad'},
        {title: 'Monto', dataIndex: 'monto', key: 'monto', render:(_,{monto})=><div style={{textAlign:"right", width:"100%"}}>$&nbsp;{monto}</div>},
        {title: 'Acciones', dataIndex: 'idfactura', key: 'acciones',
            render: (_,{idfactura})=>{
                    return(
                    <>
                        <Button onClick={()=>{setSelectedFactura(idfactura); setPopupDetalleFacturaOpen(true);}}>
                            <InfoOutlined />
                        </Button>
                    </>
                    )
            }
        }
    ]

useEffect(()=>{
    fetch(get.lista_proveedores)
    .then(r=>r.json())
    .then(r=>{
        //alert(JSON.stringify(r))
        setProveedores([...[{value:-1,label:"Todos"}],...r.data.map(r=>({value: r.idproveedor, label: r.nombre}))])
        fetch(url_for_facturas)
        .then(response=>response.json())
        .then((response)=>{
            
            setTableData(
                response.data.map(r=>
                    (
                        {
                            idfactura: r.idfactura,
                            idproveedor: r.proveedor_idproveedor,
                            numero: r.numero,
                            proveedor: r.proveedor,
                            cantidad: r.cantidad,
                            monto: r.monto,
                            fecha: r.fecha_formated, //<---TODO
                        
                        }
                    )
                )
            )

        })
    })
    
},[change])

    const openPopup = ()=>{
        setOpen(true)
    }

    const closePopup = () => {
        setOpen(false)
    }

    const onOk = (d) => {
        setOpen(false)
        setChange(!change)
    }

    return (
        <>
           
            
            <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{children:"CANCELAR"}}
            
            width={"80%"}
            title={"Agregar Factura"}
            open={open}
            onOk={closePopup}
            onCancel={closePopup}
            okText="CERRAR"
        >
            <FacturaForm action="ADD" callback={onOk} />
        </Modal>
        <Row>
            <Col span={24}>
                <h3>Lista de Facturas</h3>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button type="primary"  size="small"  onClick={openPopup}>Agregar Factura</Button>
            </Col>
        </Row>
        <Row>
            <Col span={4} style={{textAlign:"right", paddingTop:".3em"}}>
                Proveedor:
            </Col>
            <Col span={20} >
                <Select options={proveedores} style={{width:"50%"}} onChange={(v)=>setSelectedProveedor(v)}/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table 
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    columns={columns}
                    dataSource={selectedProveedor <0 ? tableData : tableData.filter(f=>f.idproveedor==selectedProveedor)}
                />
            </Col>
        </Row>
        <Modal 
        destroyOnClose
        footer={null}
        width={"80%"}
        open={popupDetalleFacturaOpen} 
        onCancel={()=>{setPopupDetalleFacturaOpen(false)}}
        >
            <DetalleFactura idFactura={selectedFactura} />
        </Modal>
            

        </>
    )
}

export default  ListaFacturas;