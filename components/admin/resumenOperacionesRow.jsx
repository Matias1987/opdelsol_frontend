import { get } from "@/src/urls";
import { CloseCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

const { useEffect, useState } = require("react")

const ResumenOperacionesRow = (props) => {
    const [count, setCount] = useState(0);
    const [idcaja, setIdCaja] = useState(null)
   
    const [data, setData] = useState({
        efectivo: 0,
        tarjeta: 0,
        mutual: 0,
        cheque: 0,
        ctacte: 0,
    })

    const update = () => {
        if(idcaja==null)
        {
            //fetch caja
            fetch(url_caja_sucursal_fecha + props.idsucursal)
            .then(r=>r.json())
            .then((response)=>{
                setIdCaja(response.data[0])
            })

        }
        else{
            //fetch operations data
            fetch(get.admin_totales_sucursal + idcaja)
            .then(r=>r.json())
            .then((response)=>{
                if(response.data.length>0)
                {
                    setData
                    ({
                        efectivo: response.data[0].efectivo,
                        tarjeta: response.data[0].tarjeta,
                        mutual: response.data[0].mutual,
                        cheque: response.data[0].cheque,
                        ctacte: response.data[0].ctacte,
                    })
                }
            })
        }
    }


    useEffect(()=>{
        const interval = setInterval(() => { 
            update()
            setCount(count + 1); 
            
        }, 5000); 
  
        //Clearing the interval 
        return () => clearInterval(interval); 
    },[count]);
    return <><Row gutter={24}>
        <Col  span={4}>
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
        <Col  span={4}>
        <Card bordered={false}>
            <Statistic
            title="Monto Ventas"
            value={data.efectivo}
            precision={0}
            valueStyle={{
                color: '#3f8600',
            }}
            prefix={<DollarCircleOutlined />}
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={4}>
        <Card bordered={false}>
            <Statistic
            title="Tarjetas"
            value={data.tarjeta}
            precision={0}
            valueStyle={{
                color: '#3f8600',
            }}
            prefix={<DollarCircleOutlined />}
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={4}>
        <Card bordered={false}>
            <Statistic
            title="Mutual"
            value={data.mutual}
            precision={0}
            valueStyle={{
                color: '#3f8600',
            }}
            prefix={<DollarCircleOutlined />}
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={4}>
        <Card bordered={false}>
            <Statistic
            title="Cheque"
            value={data.cheque}
            precision={0}
            valueStyle={{
                color: '#3f8600',
            }}
            prefix={<DollarCircleOutlined />}
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={4}>
        <Card bordered={false}>
            <Statistic
            title="Cta. Cte."
            value={data.ctacte}
            precision={0}
            valueStyle={{
                color: '#3f8600',
            }}
            prefix={<DollarCircleOutlined />}
            suffix=""
            />
        </Card>
        </Col>
        </Row>


        <Row gutter={24}>
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
  </>
}

export default ResumenOperacionesRow;