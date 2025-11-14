import { Col, DatePicker, Row, Table } from "antd";
import { useState } from "react";

const InformeVentasFiltros = props =>{
    const [dataSource, setDataSource] = useState([])
    const columns = []

    /**
     * fecha desde - hasta
     * monto mayor a 
     * monto igual a 
     */
    const filtros = _=><>
    <Row>
        
        <Col>
            Periodo
        </Col>
        <Col>
            <DatePicker.RangePicker />
        </Col>
        <Col>
            
        </Col>
    </Row>
        
    </>

    return <>
    <Row>
        <Col>
            {filtros()}
        </Col>
    </Row>
    <Row>
        <Col>
            <Table columns={columns} dataSource={dataSource} />
        </Col>
    </Row>
    
    </>
}

export default InformeVentasFiltros;