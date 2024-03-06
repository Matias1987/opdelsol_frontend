
import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import EditarSobre from "@/components/taller/EditarSobre";
import { Col, Divider, Row } from "antd";

export default function Index(){
    //260
    return (<>
   
        <Row>
            
            
            <Col span={24}>
                <EditarSobre idventa={260} />
            </Col>
        </Row>
        
        
    </>)
}

Index.PageLayout = LayoutLaboratorio;