import { CloseCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

const { useEffect, useState } = require("react")

const ResumenOperacionesRow = (props) => {
    const [count, setCount] = useState(0);
    const [totalVentas, setTotalVentas] = useState(0)
    const [cantVentas, setCantVentas] = useState(0)
    const [cant_anulados, setCantAnulados] = useState(0)
    const [monto_tarjeta, setMontoTarjeta]=useState(0)
    const [monto_ctacte, setMontoCtaCte] = useState(0)
    const [monto_efvo, setMontoEfvo] = useState(0)
    const [monto_mutual, setMontoMutual] = useState(0)

    const update = () => {}


    useEffect(()=>{
        const interval = setInterval(() => { 
            update()
            setCount(count + 1); 
            
        }, 5000); 
  
        //Clearing the interval 
        return () => clearInterval(interval); 
    },[count]);
    return <Row gutter={24}>
        <Col  span={6}>
        <Card bordered={false}>
            <Statistic
            title="Sucursal"
            value={props.nombre_sucursal}
            precision={0}
            valueStyle={{
                color: '#3f8600',
            }}
            />
        </Card>
        </Col>
        <Col  span={6}>
        <Card bordered={false}>
            <Statistic
            title="Monto Ventas"
            value={totalVentas}
            precision={0}
            valueStyle={{
                color: '#3f8600',
            }}
            prefix={<DollarCircleOutlined />}
            suffix=""
            />
        </Card>
        </Col>
        {/*<Col span={6}>
        <Card bordered={false}>
            <Statistic
            title="Ventas Entregadas"
            value={9}
            precision={0}
            valueStyle={{
                color: '#cf1322',
            }}
            prefix={<DeliveredProcedureOutlined />}
            suffix=""
            />
        </Card>
        </Col>*/}
        <Col span={4}>
        <Card bordered={false}>
            <Statistic
            title="Ventas Anuladas"
            value={cant_anulados}
            precision={0}
            valueStyle={{
                color: 'red',
            }}
            prefix={<CloseCircleOutlined />}
            suffix=""
            />
        </Card>
        </Col>
        <Col span={4}>
            <Card bordered={false}>
                <Statistic
                title="Total Cobros"
                value={9.3}
                precision={2}
                valueStyle={{
                    color: 'green',
                }}
                prefix={<DollarCircleOutlined />}
                suffix=""
                />
            </Card>
        </Col>
        <Col span={4}>
            <Card bordered={false}>
                <Statistic
                title="Total Gastos"
                value={9.3}
                precision={2}
                valueStyle={{
                    color: 'red',
                }}
                prefix={<DollarCircleOutlined />}
                suffix=""
                />
            </Card>
        </Col>
  </Row>
}

export default ResumenOperacionesRow;