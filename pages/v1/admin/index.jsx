
import CustomStatistic from "@/components/admin/dashboard_components/CustomStatistic";
import TotalesCajasSucursales from "@/components/admin/dashboard_components/totales_caja_sucursales";
import TotalesCobros from "@/components/admin/dashboard_components/totales_cobros";
import ChartTotalesUltimoAnio from "@/components/admin/graficos/totales_ultimo_anio";
import TotalesVentasMeses from "@/components/admin/graficos/totalesVentasMeses";
import ResumenOperacionesRow from "@/components/admin/resumenOperacionesRow";
import LayoutAdmin from "@/components/layout/layout_admin";
import { get } from "@/src/urls";
import { BoxPlotFilled, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Modal, Row } from "antd";
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
    <Row gutter={24}>
        {/*<Col  style={{paddingRight:"32px"}}>
            <TotalesCobros />
        </Col>
        <Col  style={{paddingRight:"32px"}}>
            <TotalesGastos />
        </Col>*/}
    </Row>
    {/*
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
    <Row gutter={[16,16]}>
        <Col>
            <TotalesCobros />
        </Col>
        <Col>
            <TotalesCajasSucursales style="black"/>
        </Col>
    </Row>
    
    
    {/*<Row>
        <Col span={24}>
            <h4>Cantidad de ventas en dep&oacute;sito</h4>
        </Col>
    </Row>
    <Row gutter={[16,16]}>
        <Col>
            <CustomStatistic prefix={<BoxPlotFilled />} style="black" value={10} title="Ventas en Depósito" precision={0} valueStyle={{textAlign:"right"}} />
        </Col>
        <Col>
            <CustomStatistic style="danger" value={5} title="Pedido" precision={0} />
        </Col>
        <Col>
            <CustomStatistic style="danger" value={10} title="Taller" precision={0} />
        </Col>
        <Col>
            <CustomStatistic style="danger" value={2} title="Calibrado" precision={0} />
        </Col>
    </Row>

    <Card  style={{marginTop:"20px", marginBottom:"20px", padding:"10px"}}>
      <Row gutter={[16,16]}>

        <Col style={{width:"1200px"}}><TotalesVentasMeses cantMeses={12} idsucursal={6} /></Col>
        <Col style={{width:"1200px"}}><TotalesVentasMeses cantMeses={12} idsucursal={7} /></Col>
        <Col style={{width:"1200px"}}><TotalesVentasMeses cantMeses={12} idsucursal={8} /></Col>
        <Col style={{width:"1200px"}}><TotalesVentasMeses cantMeses={12} idsucursal={9} /></Col>
        <Col style={{width:"1200px"}}><TotalesVentasMeses cantMeses={12} idsucursal={10} /></Col>
        <Col style={{width:"1200px"}}><TotalesVentasMeses cantMeses={12} idsucursal={11} /></Col>
        <Col style={{width:"1200px"}}><TotalesVentasMeses cantMeses={12} idsucursal={16} /></Col>
      </Row>
      </Card>*/}
    {/*<Row>
        <Col span={24}>
            
            {
                sucursales.map(s=><ResumenOperacionesRow color={(++col%2==0? styles.lightRow:styles.darkRow)} key={s.idsucursal} idsucursal={s.idsucursal} nombre_sucursal={s.nombre} />)
            }
        </Col>
    </Row>*/}

   
    
    
    
    </>
}

dashboard_admin.PageLayout = LayoutAdmin;  