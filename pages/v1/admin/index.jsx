import ListaCobrosAdmin from "@/components/admin/listaCobrosAdmin";
import ListaEnviosAdmin from "@/components/admin/listaEnviosAdmin";
import ListaGastosAdmin from "@/components/admin/listaGastosAdmin";
import ListaVentasAdmin from "@/components/admin/listaVentasAdmin";
import LayoutAdmin from "@/components/layout/layout_admin";
import { ArrowDownOutlined, ArrowUpOutlined, CloseCircleOutlined, DeliveredProcedureOutlined, DollarCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";

export default function dashboard_admin(){
    const [tick, setTick] = useState(0) 

    return <>
     <Row gutter={16}>
        <Col span={6}>
        <Card bordered={false}>
            <Statistic
            title="Total Nuevas Ventas"
            value={11}
            precision={0}
            valueStyle={{
                color: '#3f8600',
            }}
            prefix={<PlusCircleOutlined />}
            suffix=""
            />
        </Card>
        </Col>
        {/*<Col span={6}>
        <Card bordered={false}>
            <Statistic
            title="Ventas Entregadas"
            value={9}
            precision={0}
            valueStyle={{
                color: '#cf1322',
            }}
            prefix={<DeliveredProcedureOutlined />}
            suffix=""
            />
        </Card>
        </Col>*/}
        <Col span={4}>
        <Card bordered={false}>
            <Statistic
            title="Ventas Anuladas"
            value={9}
            precision={0}
            valueStyle={{
                color: 'red',
            }}
            prefix={<CloseCircleOutlined />}
            suffix=""
            />
        </Card>
        </Col>
        <Col span={4}>
            <Card bordered={false}>
                <Statistic
                title="Total Cobros"
                value={9.3}
                precision={2}
                valueStyle={{
                    color: 'green',
                }}
                prefix={<DollarCircleOutlined />}
                suffix=""
                />
            </Card>
        </Col>
        <Col span={4}>
            <Card bordered={false}>
                <Statistic
                title="Total Gastos"
                value={9.3}
                precision={2}
                valueStyle={{
                    color: 'red',
                }}
                prefix={<DollarCircleOutlined />}
                suffix=""
                />
            </Card>
        </Col>
  </Row>
    <Row>
        <Col span={12}>
            <ListaVentasAdmin key={tick} />
        </Col>
        <Col span={12}>
            <ListaCobrosAdmin key={tick} />
        </Col>
        {/*<Col span={12}>
            <ListaEnviosAdmin key={tick} />
</Col>*/}
    </Row>
    {/*<Row>
        <Col span={12}>
            <ListaGastosAdmin key={tick} />
        </Col>
        
</Row>*/}
    </>
}

dashboard_admin.PageLayout = LayoutAdmin;  