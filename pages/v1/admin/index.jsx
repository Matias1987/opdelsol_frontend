
import ResumenOperacionesRow from "@/components/admin/resumenOperacionesRow";
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
    <Row>
        <Col span={24}>
            <h2>Totales por Sucursal</h2>
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