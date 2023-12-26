import { parse_float_string } from "@/src/helpers/string_helper";
import { get } from "@/src/urls";
import { CloseCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

const { useEffect, useState } = require("react")

const ResumenOperacionesRow = (props) => {
    const [count, setCount] = useState(0);
    const [idcaja, setIdCaja] = useState(null)
   
    const [data, setData] = useState({
        nombre_sucursal:"",
        cant_anulados: 0,
        efectivo: 0,
        tarjeta: 0,
        mutual: 0,
        cheque: 0,
        ctacte: 0,
    })

    const update = () => {
        if(idcaja==null)
        {
            //setIdCaja(-1)
            //fetch caja
            //alert(get.caja + props.idsucursal)
            fetch(get.caja + props.idsucursal)
            .then(r=>r.json())
            .then((response)=>{
                //alert("set id caja")
                setIdCaja(response.data.idcaja)
            })

        }
        else{
            //fetch operations data
            //alert(get.admin_totales_sucursal + idcaja)
            fetch(get.admin_totales_sucursal + idcaja)
            .then(r=>r.json())
            .then((response)=>{
                if(response.data.length>0)
                {
                    setData
                    ({
                        efectivo: parse_float_string( response.data[0].efectivo||""),
                        tarjeta: parse_float_string( response.data[0].tarjeta||""),
                        mutual: parse_float_string( response.data[0].mutual||""),
                        cheque: parse_float_string( response.data[0].cheque||""),
                        ctacte: parse_float_string( response.data[0].ctacte||""),
                        cuotas: parse_float_string( response.data[0].cuotas||""),
                    })
                }
            })
        }
    }


    useEffect(()=>{
        //setData(d=>({...d,nombre_sucursal:props.nombre_sucursal}))
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
            value={props.nombre_sucursal.length>7 ? props.nombre_sucursal.substr(0,6) : props.nombre_sucursal}
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
            value={data.cant_anulados}
            precision={0}
            valueStyle={{
                color: 'red',
            }}
            
            suffix=""
            />
        </Card>
        </Col>
       
  </Row>
  </>
}

export default ResumenOperacionesRow;