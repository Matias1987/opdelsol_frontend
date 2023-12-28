import { parse_float_string } from "@/src/helpers/string_helper";
import { get } from "@/src/urls";
import { CloseCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Row, Statistic } from "antd";
import InformeCaja from "../informes/caja/InformeCaja";

const { useEffect, useState } = require("react")

const ResumenOperacionesRow = (props) => {
    const [count, setCount] = useState(0);
    const [idcaja, setIdCaja] = useState(null)
    const [open, setOpen] = useState(false)
   
    const [data, setData] = useState({
        nombre_sucursal:"",
        cant_anulados: 0,
        efectivo: 0,
        tarjeta: 0,
        mutual: 0,
        cheque: 0,
        ctacte: 0,
        anulado: 0,
        cuotas:0,
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
                        total: parse_float_string(response.data[0].monto_total||""),
                        anulado: parse_float_string(response.data[0].anulado||""),
                    })
                }
            })
        }
    }


    useEffect(()=>{
        //setData(d=>({...d,nombre_sucursal:props.nombre_sucursal}))
        if(count==0)
        {
            update()
            setCount(count + 1); 
        }
        const interval = setInterval(() => { 
            update()
            setCount(count + 1); 
            
        }, 5000); 
  
        //Clearing the interval 
        return () => clearInterval(interval); 
    },[count]);

    return <><Row style={{backgroundColor:props.color}} gutter={24} onClick={()=>{setOpen(true)}}>
        <Col  span={3}>
        <Card bordered={false} style={{backgroundColor:"rgba(0,0,0,0)"}} >
            <Statistic
            
            title="Sucursal"
            value={props.nombre_sucursal.length>7 ? props.nombre_sucursal.substr(0,6) : props.nombre_sucursal}
            precision={0}
            valueStyle={{
                fontWeight: "bold",
                color: '#5F1600',
            }}
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}}>
            <Statistic
            title="Efvo."
            value={data.efectivo}
            precision={0}
            valueStyle={{
                color: '#5F1600',
            }}
            
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}}>
            <Statistic
            title="Tarjetas"
            value={data.tarjeta}
            precision={0}
            valueStyle={{
                color: '#5F1600',
            }}
            
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}}>
            <Statistic
            title="Mutual"
            value={data.mutual}
            precision={0}
            valueStyle={{
                color: '#5F1600',
            }}
            
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}}>
            <Statistic
            title="Cheque"
            value={data.cheque}
            precision={0}
            valueStyle={{
                color: '#5F1600',
            }}
            
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}}>
            <Statistic
            title="Cuotas"
            value={data.cuotas}
            precision={0}
            valueStyle={{
                color: '#5F1600',
            }}
           
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}}>
            <Statistic
            title="Total Efvo."
            value={parseFloat(data.efectivo) + parseFloat(data.cuotas)}
            precision={0}
            valueStyle={{
                color: 'black',
            }}
           
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}}>
            <Statistic
            title="Anulados"
            value={data.anulado}
            precision={0}
            valueStyle={{
                color: '#CA0000',
            }}
           
            suffix=""
            />
        </Card>
        </Col>
        
        
        </Row>

        <Modal open={open} footer={null} onCancel={()=>{setOpen(false)}}>
             <InformeCaja idcaja={idcaja} />
        </Modal>


        {/*<Row gutter={24}>
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
       
        </Row>*/}
  </>
}

export default ResumenOperacionesRow;