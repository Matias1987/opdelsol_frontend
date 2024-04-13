import CategoriaSelect from "@/components/CategoriaSelect";
import {Row, Col, DatePicker, Radio, Table, Button, Input} from "antd";
import { useState } from "react";
const { RangePicker } = DatePicker;
const VentasTotalesSucursales = (props) => {
    const [modo, setModo] = useState("dia")
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {title:"Codigo", dataIndex: "codigo"},
        {title:"Cantidad", dataIndex: "cantidad"},
    ]
    //2024-04-13T14:48:55.591Z
    const _parse = str => ({dia:str.substring(9,11), mes:str.substring(6,8), anio:str.substring(1,5)}) 

    const periodoDia = (val, dateString) => {
        if(val==null)
        {
            return
        }

        let from = _parse(JSON.stringify(val[0]))
        let to = _parse(JSON.stringify(val[1]))

        alert(JSON.stringify(val[0]))
        alert(JSON.stringify(from))
        alert(JSON.stringify(to))
    
    }
    const periodoSemana = (val, dateString) => {
        //ej ["2024-04-01T13:08:12.768Z","2024-04-21T13:08:12.768Z"]
        //alert(JSON.stringify(val))
        if(val==null)
        {
            return
        }

        let from = _parse(JSON.stringify(val[0]))
        let to = _parse(JSON.stringify(val[1]))
        
        alert(JSON.stringify(from))
        alert(JSON.stringify(to))
    
    }
    const periodoMes = (val, dateString) => {
        
        if(val==null)
        {
            return
        }
        
        //alert(JSON.stringify(val))
        //alert(JSON.stringify(val[0]))
        let from = _parse(JSON.stringify(val[0]))
        let to = _parse(JSON.stringify(val[1]))
        alert(JSON.stringify(from))
        alert(JSON.stringify(to))
    }
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
                            <RangePicker size="large" disabled={modo!="dia"} onChange={periodoDia}/>
                        </Col>
                    </Row>
                    <Row style={{padding:".5em"}}>
                        <Col span={24}>
                            <RangePicker size="large" disabled={modo!="semana"} picker="week"  onChange={periodoSemana}/>
                        </Col>
                    </Row>
                    <Row style={{padding:".5em"}}>
                    <Col span={24}>
                            <RangePicker format="MM/YYYY" disabledTime={true} size="large" disabled={modo!="mes"} picker="month"  onChange={periodoMes}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <CategoriaSelect callback={(id)=>{}} />
                        </Col>
                    </Row>
                    <Row style={{padding:".5em"}}>
                        <Col span={24}>
                            <Input prefix={"Código: "} style={{width:"100%", backgroundColor:"lightgray"}} allowClear />
                        </Col>
                    </Row>
                    <Row style={{padding:".5em"}}>
                        <Col span={24}>
                            <Button block type="primary">Aplicar</Button>
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