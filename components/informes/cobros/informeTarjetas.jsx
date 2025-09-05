const { default: SucursalSelect } = require("@/components/SucursalSelect")
const { post_method } = require("@/src/helpers/post_helper")
const { post } = require("@/src/urls")
const { Row, DatePicker, Table } = require("antd")
const { useEffect, useState } = require("react")
import esES from "antd/locale/es_ES"
const InformeTarjetas = props => {

    const [data, setData] = useState([])

    const [filtros, setFiltros] = useState({
        fecha_desde: "",
        fecha_hasta: "",
        sucursal: 0,
    })

    const columns = [
        {title:"Tarjeta"},
        {title:<div style={{textAlign:"right"}}>Monto</div>}
    ]

    const load = () => {
        post_method(post.total_tarjetas_periodo, filtros,(response)=>{
            setData(response.data)
        })
    }

    useEffect(() => {
        load()
     }, [])

    return <>
        <Row gutter={16}>
            <Col>
                <DatePicker  locale={esES} format={"DD-MM-YYYY"} prefix="Desde" onChange={(value)=>{onChange("fechaDesde", value.format("DD-MM-YYYY"))}} allowClear />
            </Col>
            <Col>
                <DatePicker locale={esES} format={"DD-MM-YYYY"} prefix="Hasta" onChange={(value)=>{onChange("fechaHasta", value.format("DD-MM-YYYY"))}} allowClear />
            </Col>
            <Col>
                <SucursalSelect callback={s => { }} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table dataSource={data} columns={columns} pagination={false} scroll={{y:"400px"}} />
            </Col>
        </Row>
    </>
}