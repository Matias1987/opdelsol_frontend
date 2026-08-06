import MyLayout from "@/components/layout/layout";
import AddStockQuick from "@/components/deposito/addStockQuick";
import { Flex } from "antd";

export default function AgregarStock() {
  return (
    <>
      <Flex justify="center" align="center" style={{  width: "100%" }}>
        <AddStockQuick
          callback={(_) => {
            alert("Datos Agregados");
          }}
        />
      </Flex>
      {/*<h1>Agregar Stock</h1>
        <StockForm  action="ADD" />
        <Divider />
        <h4>Otras Acciones</h4>
        <CustomModal 
        openButtonText="Agregar Factura"
        title="Agregar Factura"
        onOk={()=>{}}
        >
            <FacturaForm action="ADD" />
            <AgregarFacturaV3 callback={()=>{}} />
        </CustomModal>
        &nbsp;&nbsp;
        <CustomModal 
        openButtonText="Agregar Codigo"
        title=""
        onOk={()=>{}}
        >
            <AgregarCodigo />
        </CustomModal>*/}
    </>
  );
}

AgregarStock.PageLayout = MyLayout;
