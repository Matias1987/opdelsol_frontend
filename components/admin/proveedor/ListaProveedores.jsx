import FichaProveedor from "@/components/admin/proveedor/fichaProveedor";
import ProveedorForm from "@/components/forms/ProveedorForm";
import { get } from "@/src/urls"
import { PlusOutlined } from "@ant-design/icons";

import { Table, Button, Modal, Row, Col, Card, Checkbox, Input } from "antd";
import { useState, useEffect } from "react";
import ListaFacturas from "../factura/listaFacturas";
import globals from "@/src/globals";

const ListaProveedores = (props) => {
    const [change, setChange] = useState(false)
    const [open, setOpen] = useState(false);

    const [popupFichaOpen, setPopupFichaOpen] = useState(false)
    const [idproveedor, setIdProveedor] = useState(-1)

    const url_for_proveedores = get.lista_proveedores;
    const [tableData, setTableData] = useState([])

    const [listaFacturasOpen, setListaFacturasOpen] = useState(false)

    const [searchValue, setSearchValue] = useState("")

    const columns = [
        {render:(_,{idproveedor, checked})=><Checkbox checked={checked} onChange={(e)=>{

            const temp = tableData.map(p=>p.idproveedor==idproveedor ? {...p,checked:!p.checked} : p)

            setTableData(temp)

            props?.onProvSelected?.(temp.filter(p=>p.checked))
        }} />},
        {title: 'Nro.', dataIndex: 'idproveedor', key: 'idproveedor'},
        {title: 'Nombre', dataIndex: 'nombre', key: 'nombre'},
        {title: 'C.U.I.T.', dataIndex: 'cuit', key: 'cuit'},
        {title: 'Acciones', dataIndex: 'idproveedor', key: 'acciones',
            render: (idproveedor)=>{
                    return(!globals.esUsuarioAdminProv() ? <></> : <>
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
                    checked: false,
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

    const header = () => <>
        <Row>
            <Col span={24}>
               <Input placeholder="Buscar por Nombre..." onChange={(e)=>{setSearchValue(e.target.value)}} />
            </Col>
        </Row>
    </>

    return (
        <>
        <Card
        
        size="small"
        title={<>
        Lista de Proveedores&nbsp;&nbsp;&nbsp;<Button type="default" style={{color:"blue"}}  size="small"  onClick={openPopup}><PlusOutlined /> Agregar</Button>
        </>}
        >
            <Row>
                <Col span={24}>
                <Table 
                title={header}
                size="small"
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                columns={columns}
                dataSource={tableData.filter(d=>(searchValue.trim()).length<1 ? true : (d.nombre||"").toUpperCase().includes(searchValue.toUpperCase()) )}
                />
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
            <Modal destroyOnClose title="Listado" width={"800px"} open={listaFacturasOpen} onCancel={()=>{setListaFacturasOpen(false)}} footer={null} >
                <ListaFacturas readOnly={true} />
            </Modal>
        </>
    )
}

export default ListaProveedores;