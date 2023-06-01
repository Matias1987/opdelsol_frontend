import CustomModal from "@/components/CustomModal";
import { get } from "@/src/urls";
import { CloseCircleOutlined, EditOutlined, FieldTimeOutlined } from "@ant-design/icons";
import AgregarFactura from "./agregar_factura";
import FacturaForm from "@/components/forms/FacturaForm";
import DetalleFactura from "@/components/forms/deposito/DetalleFactura";

const { Table, Button, Modal } = require("antd")
const { useState, useEffect } = require("react")

const ListaFacturas = (props) => {
    const [change, setChange] = useState(false)
    const [open, setOpen] = useState(false);
    const url_for_facturas = get.lista_facturas;
    const [tableData, setTableData] = useState([])
    const columns = [
        {title: 'Nro.', dataIndex: 'numero', key: 'numero'},
        {title: 'Fecha', dataIndex: 'fecha', key: 'fecha'},
        {title: 'Proveedor', dataIndex: 'proveedor', key: 'proveedor'},
        {title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad'},
        {title: 'Monto', dataIndex: 'monto', key: 'monto'},
        {title: 'Acciones', dataIndex: 'idfactura', key: 'acciones',
            render: (idfactura)=>{
                    return(
                    <>
                    <CustomModal openButtonText="Detalles" title="">
                        <DetalleFactura idFactura={idfactura} />
                    </CustomModal>
                    {/*<Button><EditOutlined />&nbsp;Editar</Button>
                    <Button danger><CloseCircleOutlined />&nbsp;Anular</Button>*/}
                    </>
                    )
            }
        }
    ]

useEffect(()=>{
    fetch(url_for_facturas)
    .then(response=>response.json())
    .then((response)=>{

        setTableData(
            response.data.map(r=>
                (
                    {
                        idfactura: r.idfactura,
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
            <h1>Lista de Facturas</h1>
            <Button type="primary"  size="small"  onClick={openPopup}>Agregar Factura</Button>
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
            <Table 
                columns={columns}
                dataSource={tableData}
            />

        </>
    )
}

export default  ListaFacturas;