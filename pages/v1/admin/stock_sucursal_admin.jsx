
import CantidadesSucursales from "@/components/admin/stock/CantidadesSucursales";
import EditarCodesTree from "@/components/admin/stock/EditarCodesTree";
import VentasTotalesSucursales from "@/components/admin/stock/VentasTotalesSucursales";
import LayoutAdmin from "@/components/layout/layout_admin";
import {Row, Col, Select, Tabs} from "antd";


export default function StockSucursalAdmin(){
    
    const tabsOptions = [
        {
            label:"Cantidades Sucursal",
            key: "1",
            children:  <CantidadesSucursales  />
        },
        
        {
            label:"Totales Ventas (Stock)",
            key: "3",
            children:  <VentasTotalesSucursales  />
        },
        /*{
            label:"Envíos",
            key: "2",
            children:  <MovimientosPeriodoSucursales idsucursal={selectedSucursal}  />
        },*/
        {
            label:"Arból de Códigos",
            key: "4",
            children:  <EditarCodesTree  />
        },
    ]
    
    return <>
        <Row>
            <Col span={24}>

            </Col>
        </Row>
        
        <Row>
            <Col span={24}>
            <Tabs
                
                defaultActiveKey="1"
                type="card"
                size={"large"}
                items={tabsOptions}
            />
            </Col>
        </Row>
        <Row>
            <Col span={24}>

            </Col>
        </Row>
    </>
}



StockSucursalAdmin.PageLayout = LayoutAdmin;  