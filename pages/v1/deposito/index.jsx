import { public_urls } from "@/src/urls";
import { BlockOutlined, DollarOutlined, GiftOutlined } from "@ant-design/icons";
import { Button, Divider, Row, Col, Input, Card } from "antd";

export default function Index(){
    return (<>
        
        <Divider />
        <Row>
            <Col span={12} style={{padding:"6px"}}>
                <Card title="Tareas" size="small">
                    <Button type="link">Nuevo Env&iacute;o</Button>
                </Card>
            </Col>
            <Col span={12} style={{padding:"6px"}}>
                <Card title="Listados" size="small">
                    <Button type="link">C&oacute;digos</Button>
                    <Button type="link">Subgrupos</Button>
                    <Button type="link">Grupos</Button>
                    <Button type="link">Subfamilias</Button>
                    <Button type="link">Familias</Button>
                </Card>
            </Col>
        </Row>
        
        
    </>)
}