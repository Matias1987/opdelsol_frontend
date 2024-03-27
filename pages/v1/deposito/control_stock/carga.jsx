import { Col, Input, Row, Table } from "antd";

export default function CargaStock(){

    const onInputChange = (e)=>{
        
    }

    return <>
        <Row>
            <Col span={24}>
                
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input onChange={onInputChange} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <Table />
            </Col>
            <Col span={12}>
                <Table />
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
        <Row>
            <Col span={24}>

            </Col>
        </Row>
    </>
}