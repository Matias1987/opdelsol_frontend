import SucursalSelect from "@/components/SucursalSelect";
import ListaSucursales from "@/components/admin/listaSucursales";
import CantidadesSucursales from "@/components/admin/stock/CantidadesSucursales";
import MovimientosPeriodoSucursales from "@/components/admin/stock/MovimientosPeriodoSucursales";
import VentasTotalesSucursales from "@/components/admin/stock/VentasTotalesSucursales";
import LayoutAdmin from "@/components/layout/layout_admin";
import {Row, Col, Select, Tabs} from "antd";
import { useEffect, useState } from "react";
import ListadoControles from "@/components/deposito/control/listado";


export default function StockSucursalAdmin(){
    const [selectedSucursal, setSelectedSucursal] = useState(-1)
    
    const tabsOptions = [
        {
            label:"Cantidades",
            key: "1",
            children:  <CantidadesSucursales idsucursal={selectedSucursal}  />
        },
        
        {
            label:"Totales Ventas",
            key: "3",
            children:  <VentasTotalesSucursales idsucursal={selectedSucursal}  />
        },
        {
            label:"Envíos",
            key: "2",
            children:  <MovimientosPeriodoSucursales idsucursal={selectedSucursal}  />
        },
        {
            label:"Controles de Stock",
            key: "4",
            children:  <ListadoControles idsucursal={selectedSucursal}  />
        },
    ]
    
    return <>
        <Row>
            <Col span={24}>

            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <SucursalSelect callback={(id)=>{ setSelectedSucursal(_id=>id)}} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            <Tabs
                
                defaultActiveKey="1"
                type="card"
                size={"large"}
                items={tabsOptions}
                key={selectedSucursal}
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