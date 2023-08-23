import CustomModal from "@/components/CustomModal";
import FacturaForm from "@/components/forms/FacturaForm";
import StockForm from "@/components/forms/StockForm";
import { Divider } from "antd";
import AgregarCodigo from "./agregar_codigo";
import MyLayout from "@/components/layout/layout";

export default function AgregarStock(){
    return (
        <>
        <h1>Agregar Stock</h1>
        <StockForm  action="ADD" />
        <Divider />
        <h4>Otras Acciones</h4>
        <CustomModal 
        openButtonText="Agregar Factura"
        title="Agregar Factura"
        onOk={()=>{}}
        >
            <FacturaForm action="ADD" />
        </CustomModal>
        &nbsp;&nbsp;
        <CustomModal 
        openButtonText="Agregar Codigo"
        title=""
        onOk={()=>{}}
        >
            <AgregarCodigo />
        </CustomModal>


        
        </>

    )
}

AgregarStock.PageLayout = MyLayout;