import FichaProveedor from "@/components/admin/proveedor/fichaProveedor";
import ProveedorForm from "@/components/forms/ProveedorForm";
import { get } from "@/src/urls"
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

import { Table, Button, Modal, Row, Col } from "antd";
import Card from "antd/es/card/Card";
import { useState, useEffect } from "react";

const ListaProveedores = (props) => {
    const [change, setChange] = useState(false)
    const [open, setOpen] = useState(false);

    const [popupFichaOpen, setPopupFichaOpen] = useState(false)
    const [idproveedor, setIdProveedor] = useState(-1)

    const url_for_proveedores = get.lista_proveedores;
    const [tableData, setTableData] = useState([])
    const columns = [
        {title: 'Nro.', dataIndex: 'idproveedor', key: 'idproveedor'},
        {title: 'Nombre', dataIndex: 'nombre', key: 'nombre'},
        {title: 'C.U.I.T.', dataIndex: 'cuit', key: 'cuit'},
        {title: 'Acciones', dataIndex: 'idproveedor', key: 'acciones',
            render: (idproveedor)=>{
                    return(<>
                    <Button onClick={()=>{
                        setIdProveedor(idproveedor)
                        setPopupFichaOpen(true)
                        }}>Ficha</Button>
                    </>)
            }
    },

    ]

useEffect(()=>{
    fetch(url_for_proveedores)
    .then(response=>response.json())
    .then((response)=>{

        setTableData(
            response.data.map((r)=>(
                {
                    idproveedor: r.idproveedor,
                    nombre: r.nombre,
                    cuit: r.cuit,
                }
                )
            )
        )

    })
},[change])

    const openPopup = ()=>{
        setOpen(true)
    }

    const closePopup = () => {
        setOpen(false)
    }

    const onOk = (p) => {
        setOpen(false)
        setChange(!change)
    }

    return (
        <>
        <Card
        bodyStyle={{backgroundColor:"#E7E7E7"}}
        headStyle={{backgroundColor:"#F07427", color:"white"}}
        size="small"
        title={<>
        Lista de Proveedores&nbsp;&nbsp;&nbsp;<Button type="default" style={{color:"blue"}}  size="small"  onClick={openPopup}><PlusOutlined /> Agregar</Button>
        </>}
        >
            <Row>
                <Col span={24}>
                <Table 
                size="small"
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                columns={columns}
                dataSource={tableData}
                />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                </Col>
            </Row>

        </Card>
            
            <Modal
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{children:"CANCELAR"}}
                
                width={"80%"}
                title={"Agregar Proveedor"}
                open={open}
                onOk={closePopup}
                onCancel={closePopup}
                okText="CERRAR"
            >
                <ProveedorForm action="ADD" callback={onOk} 
                    />
            </Modal>
            


            {/** is this temporary? */}
            <Modal closable={false} footer={null} width={"90%"} open={popupFichaOpen} onCancel={()=>{setPopupFichaOpen(false)}} destroyOnClose>
                <FichaProveedor idproveedor={idproveedor} callback={()=>{setPopupFichaOpen(false)}} />
            </Modal>
        </>
    )
}

export default ListaProveedores;