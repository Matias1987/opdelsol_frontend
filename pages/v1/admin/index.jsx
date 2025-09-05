
import ChartTotalesUltimoAnio from "@/components/admin/graficos/totales_ultimo_anio";
import ResumenOperacionesRow from "@/components/admin/resumenOperacionesRow";
import TotalesGastos from "@/components/admin/totales/totales_cobros";
import TotalesCobros from "@/components/admin/totales/totales_gastos";
import TotalesVentas from "@/components/admin/totales/totales_ventas";
import TotalesVenta from "@/components/forms/ventas/TotalVenta";
import LayoutAdmin from "@/components/layout/layout_admin";
import { get } from "@/src/urls";
import { Col, Divider, Modal, Row } from "antd";
import { useEffect, useState } from "react";

export default function dashboard_admin(){
    const [sucursales, setSucursales] = useState([])
    const [idcaja, setIdCaja] = useState(-1)
    const [open, setOpen] = useState(false)
    const styles = {
        darkRow:"#F0C2A5",
        lightRow:"#F4DD76",
    }
    var col = 0;
    useEffect(()=>{
        fetch(get.sucursales)
        .then(response=>response.json())
        .then((response)=>{
            setSucursales(
                response.data.map(r=>({
                    nombre:r.nombre,
                    idsucursal:r.idsucursal,
                }))
            )
        })
    },[])
    return <>
    {/*<Row gutter={24}>
        <Col span={12}>
            <TotalesCobros />
        </Col>
        <Col span={12}>
            <TotalesGastos />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <TotalesVentas />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <span style={{fontWeight:"600"}}>Cantidad Ventas Ultimo A&ntilde;o</span>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <ChartTotalesUltimoAnio />
        </Col>
    </Row>*/}
    <Row>
        <Col span={24}>
            <h2>Totales Actuales Por Sucursal</h2>
        </Col>
    </Row>
    <Row>

        <Col span={24}>
            
            {
                sucursales.map(s=><ResumenOperacionesRow color={(++col%2==0? styles.lightRow:styles.darkRow)} key={s.idsucursal} idsucursal={s.idsucursal} nombre_sucursal={s.nombre} />)
            }
        </Col>
    </Row>

   
    
    
    
    </>
}

dashboard_admin.PageLayout = LayoutAdmin;  