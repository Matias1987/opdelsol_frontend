import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import {Row, Col} from "antd";

const CantidadesSucursales = (props) => {
    return <>
    <Row>
        <Col span={24}>
            <FiltroCodigos callback={()=>{}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
    
    </>
}

export default CantidadesSucursales;