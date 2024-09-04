import FichaProveedor from "@/components/admin/proveedor/fichaProveedor";
import ProveedorForm from "@/components/forms/ProveedorForm";
import { get } from "@/src/urls"
import { EditOutlined } from "@ant-design/icons";

import { Table, Button, Modal } from "antd";
import { useState, useEffect } from "react";

const ListaProveedoresDep = (props) => {
    const [change, setChange] = useState(false)
    const [open, setOpen] = useState(false);

    const [popupFichaOpen, setPopupFichaOpen] = useState(false)
    const [idproveedor, setIdProveedor] = useState(-1)

    const url_for_proveedores = get.lista_proveedores;
    const [tableData, setTableData] = useState([])
    const columns = [
        {title: 'Nro.', dataIndex: 'idproveedor', key: 'idproveedor'},
        {title: 'Nombre', dataIndex: 'nombre', key: 'nombre'},
        /*{title: 'C.U.I.T.', dataIndex: 'cuit', key: 'cuit'},
        {title: 'Acciones', dataIndex: 'idproveedor', key: 'acciones',
            render: (idproveedor)=>{
                    return(<>
                    <Button onClick={()=>{
                        setIdProveedor(idproveedor)
                        setPopupFichaOpen(true)
                        }}>Ficha</Button>
                    </>)
            }
    },*/

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
            <h1>Lista de Proveedores</h1>
            <Button type="primary"  size="small"  onClick={openPopup}>Agregar Proveedor</Button>
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
            <Table 
                columns={columns}
                dataSource={tableData}
            />


            {/** is this temporary? */}
            <Modal footer={null} width={"90%"} open={popupFichaOpen} onCancel={()=>{setPopupFichaOpen(false)}} destroyOnClose>
                <FichaProveedor idproveedor={idproveedor} callback={()=>{}} />
            </Modal>
        </>
    )
}

export default ListaProveedoresDep;