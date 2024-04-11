import {Row, Col, DatePicker, Radio, Table, Button} from "antd";
import { useState } from "react";
const { RangePicker } = DatePicker;
const VentasTotalesSucursales = (props) => {
    const [modo, setModo] = useState("dia")
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {title:"Codigo", dataIndex: "codigo"},
        {title:"Cantidad", dataIndex: "cantidad"},
    ]
    return <>
        <Row>
            <Col span={10}>
                    <Row style={{padding:".5em"}}>
                        <Col span={24}>
                        <Radio.Group value={modo} onChange={(e)=>{setModo(e.target.value)}}>
                            <Radio.Button value="dia">D&iacute;a</Radio.Button>
                            <Radio.Button value="semana">Semana</Radio.Button>
                            <Radio.Button value="mes">Mes</Radio.Button>
                        </Radio.Group>
                        </Col>
                    </Row>
                    <Row style={{padding:".5em"}}>
                        <Col span={24}>
                            <RangePicker size="large" disabled={modo!="dia"}/>
                        </Col>
                    </Row>
                    <Row style={{padding:".5em"}}>
                        <Col span={24}>
                            <RangePicker size="large" disabled={modo!="semana"} picker="week" />
                        </Col>
                    </Row>
                    <Row style={{padding:".5em"}}>
                    <Col span={24}>
                            <RangePicker size="large" disabled={modo!="mes"} picker="month" />
                        </Col>
                    </Row>
                    <Row style={{padding:".5em"}}>
                        <Col span={24}>
                            <Button block>Aplicar</Button>
                        </Col>
                    </Row>
            </Col>
            <Col span={14}>
                <Row>
                    <Col span={24}>
                            <Table dataSource={dataSource} columns={columns} />
                    </Col>
                </Row>
            </Col>
        </Row>
  
        
        
    </>
}

export default VentasTotalesSucursales;