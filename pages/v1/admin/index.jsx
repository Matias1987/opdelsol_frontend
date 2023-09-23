import ListaCobrosAdmin from "@/components/admin/listaCobrosAdmin";
import ListaEnviosAdmin from "@/components/admin/listaEnviosAdmin";
import ListaGastosAdmin from "@/components/admin/listaGastosAdmin";
import ListaVentasAdmin from "@/components/admin/listaVentasAdmin";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";

export default function dashboard_admin(){
    const [tick, setTick] = useState(0) 
    useEffect(()=>{
        const interval = setInterval(() => {
            setTick(tick+1)
        }, 20000);
        return ()=>{
            console.log("-------------->CLEAR<-------------------- " + JSON.stringify(interval) )
            clearInterval(interval)
        }
    },[tick])
    return <>
    <Row>
        <Col span={12}>
            <ListaVentasAdmin key={tick} />
        </Col>
        {/*<Col span={12}>
            <ListaEnviosAdmin key={tick} />
</Col>*/}
    </Row>
    {/*<Row>
        <Col span={12}>
            <ListaGastosAdmin key={tick} />
        </Col>
        <Col span={12}>
            <ListaCobrosAdmin key={tick} />
        </Col>
</Row>*/}
    </>
}

dashboard_admin.PageLayout = LayoutAdmin;  