import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Select, Table } from "antd";
import { useState } from "react";

const AgregarFacturaV2 = (props) => {
    const [ivaRows, setIvaRows] = useState([])
    const [percepcionRows, setPercepcionRows] = useState([])
    const [retencionRows, setRetencionRows] = useState([])

    const columnsIVA = []
    const columnsPercepcionRows = []
    const columnsRetencionRows = []

    const tablaIVA = () => <Table title={() => <>IVA <Button><PlusCircleFilled /></Button></>} columns={columnsIVA} dataSource={ivaRows} scroll={{y:"300px"}} />
    const tablaPercepcion = () => <Table title={() => <>Percepciones <Button><PlusCircleFilled /></Button></>}  columns={columnsIVA} dataSource={ivaRows} scroll={{y:"300px"}} />
    const tablaRetencion = () => <Table title={() => <>Retenciones <Button><PlusCircleFilled /></Button></>}  columns={columnsIVA} dataSource={ivaRows} scroll={{y:"300px"}} />
    const _rows_style = {padding:"1em"}
    return <>
    <Row style={_rows_style}>
        <Col span={2}>
            Proveedor
        </Col>
        <Col span={20}>
            <Select />
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={24}>
            <Input prefix="Nro.:" />
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={2}>
            Fecha:
        </Col>
        <Col span={10}>
            <DatePicker />
        </Col>
        <Col span={2}>
            Periodo:
        </Col>
        <Col span={10}>
            <DatePicker />
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={2}>
            Tipo de Comprobante:
        </Col>
        <Col span={10}>
            <Select options={[{label:""}]} style={{width:"100px"}} />
        </Col>

       
        <Col span={10}>
            <Input prefix="Punto de Venta" />
        </Col>

    </Row>
    <Row>
       
    </Row>
    <Row style={_rows_style}>
        <Col span={24}>
            {tablaIVA()}
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={12}>
            {tablaPercepcion()}
        </Col>
   
        <Col span={12}>
            {tablaRetencion()}
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={24}>
            <Input prefix="Conceptos no Gravados: " />
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={24}>
            <Input prefix="Impuestos Internos: " />
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={24}>
            <Input prefix="Monto Total: " />
        </Col>
    </Row>
    </>
}

export default AgregarFacturaV2;