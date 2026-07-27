import CustomModal from "@/components/CustomModal";
import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Modal, Row } from "antd";
import { useState } from "react";

export default function DashboardDistribuidora() {
    
    return <>
    <Row>
        <Col>
            <div>Bienvenido</div>
        </Col>
    </Row>
    <Divider />
    {/*<Row gutter={[16]}>
        <Col>
            <Button size="large" block onClick={_=>{setModalOpen(true)}}><PlusOutlined /> Nueva Venta</Button>
        </Col>
    </Row>*/}
    <Row>
        <Col>
        </Col>
    </Row>
    <Row>
        <Col>
        </Col>
    </Row>
    <Row>
        <Col>
        </Col>
    </Row>
    
    
    </>
}

DashboardDistribuidora.PageLayout = LayoutDistribuidora;