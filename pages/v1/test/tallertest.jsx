
import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import EditarSobre from "@/components/taller/EditarSobre";
import { Col, Divider, Row } from "antd";

export default function Index(){
    return (<>
    <Row>
    <Col span={24} style={{padding:"1em"}}>
                <Row>
                    <Col span={24}>
                        <h4>Detalle Venta</h4>
                    </Col>
                </Row>
                <Row style={{padding:"1em"}}>
                    <Col span={4} style={{textAlign:"left"}}>Cliente: </Col>
                    <Col span={4}><b>NOMBRE </b></Col>
               
                    <Col span={4} style={{textAlign:"left"}}>Vendedor: </Col>
                    <Col span={4}><b>VENDEDOR </b></Col>
                </Row>
                <Row style={{padding:"1em"}}>
                    <Col span={8} style={{textAlign:"left"}}>Fecha de Retiro: </Col>
                    <Col span={16}><b>00/00/0000</b> </Col>
                </Row>
            </Col>
    </Row>
        <Row>
            
            
            <Col span={24}>
                <EditarSobre idventa={300} />
            </Col>
        </Row>
        
        
    </>)
}

Index.PageLayout = LayoutLaboratorio;