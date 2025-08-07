import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import SucursalSelect from "@/components/SucursalSelect";
import {Button, Col, Row, Table, Card} from "antd";

import { useState } from "react";

const StockSucursal =(props) =>{
    const columns = []
    const [dataSource, setDataSource] = useState([])


    const load = ()=>{

    }

    const callback_filtros = (f) =>{}

    const callback_sucursal = s =>{}

    return <>
    <Card title="Cantidades Totales por Sucursal" size="small">
        <Row>
            <Col span={24}>
                <SucursalSelect callback={callback_sucursal} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <FiltroCodigos callback={callback_filtros}  />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button onClick={load}>Aplicar</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table 
                columns={columns} 
                dataSource={dataSource}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                
            </Col>
        </Row>
    </Card>
    </>
}

export default StockSucursal;