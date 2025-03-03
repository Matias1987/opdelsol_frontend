import { parse_float_string } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import { CloseCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Row, Spin, Statistic } from "antd";
import InformeCaja from "../informes/caja/InformeCaja";
import ListaCaja from "../forms/caja/ListaCajas";
import { post_method } from "@/src/helpers/post_helper";

const { useEffect, useState } = require("react")

const ResumenOperacionesRow = (props) => {
    const {nombre_sucursal, color} = props
    const [count, setCount] = useState(0);
    const [idcaja, setIdCaja] = useState(null)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState(`Cargando ${ nombre_sucursal}...`)
   
    /*const [data, setData] = useState({
        nombre_sucursal:"",
        cant_anulados: 0,
        efectivo: 0,
        tarjeta: 0,
        mutual: 0,
        cheque: 0,
        ctacte: 0,
        anulado: 0,
        cuotas:0,
    })*/
    const [data, setData] = useState(null)

    const styles = {
        sucursalColor: '#000000', 
        valueColor: '#000000'
    }

    const update = () => {
        if(idcaja==null)
        {

            /*fetch(get.caja + props.idsucursal)
            .then(r=>r.json())
            .then((response)=>{
                setIdCaja(response.data.idcaja)
            })*/
            //alert("jl")
            const d = new Date()

            post_method(post.obtener_caja_sucursal_dia,
                {
                    mes:d.getMonth()+1,
                    anio: d.getFullYear(),
                    dia: d.getDate(),
                    idsucursal: props.idsucursal,
                },
                (response)=>{
                    if(response.data!=null)
                    {
                        setIdCaja(response.data.idcaja)
                        return
                    }
                    //alert("Caja cerrada.")
                    setMessage("No se encontró caja del día.")
                }
                )

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
                        efectivo: parse_float_string( response.data[0].efectivo||"0"),
                        tarjeta: parse_float_string( response.data[0].tarjeta||"0"),
                        mutual: parse_float_string( response.data[0].mutual||"0"),
                        cheque: parse_float_string( response.data[0].cheque||"0"),
                        ctacte: parse_float_string( response.data[0].ctacte||"0"),
                        cuotas: parse_float_string( response.data[0].cuotas||"0"),
                        total: parse_float_string(response.data[0].monto_total||"0"),
                        anulado: parse_float_string(response.data[0].anulado||"0"),
                        mercadopago: parse_float_string(response.data[0].mercadopago||"0"),
                    })
                }
            })
        }
    }


    useEffect(()=>{
        //setData(d=>({...d,nombre_sucursal:props.nombre_sucursal}))
        update()
        const interval = setInterval(() => { 
            //alert("jklkjkl")
            update()
            setCount(count+1)
        }, 5000); 
  
        //Clearing the interval 
        return () => clearInterval(interval); 
    },[count]);

    return <>
    <Row style={{backgroundColor:color, borderRadius:"16px"}} gutter={24} onClick={()=>{setOpen(true)}} key={count}>
        {data===null ?<span style={{padding:"6px", color:"red", fontWeight:"bold"}}> { message} <Spin /></span> : <>
        <Col  span={3}>
        <Card bordered={false} style={{backgroundColor:"rgba(0,0,0,0)"}} size="small">
            <Statistic
            title="Sucursal"
            value={nombre_sucursal.length>7 ? nombre_sucursal.substr(0,6) : nombre_sucursal}
            precision={0}
            valueStyle={{
                fontWeight: "bold",
                color: styles.sucursalColor,
            }}
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}} size="small">
            <Statistic
            title="Efvo."
            value={`$ ${data.efectivo}`}
            precision={0}
            valueStyle={{
                color: styles.valueColor,
                fontWeight:"bold",
            }}
            
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}} size="small">
            <Statistic
            title="Tarjetas"
            value={`$ ${data.tarjeta}`}
            precision={0}
            valueStyle={{
                color: styles.valueColor,
                fontWeight:"bold",
            }}
            
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}} size="small">
            <Statistic
            title="Mutual"
            value={`$ ${data.mutual}`}
            precision={0}
            valueStyle={{
                color: styles.valueColor,
                fontWeight:"bold",
            }}
            
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}} size="small">
            <Statistic
            title="Cheque"
            value={`$ ${data.cheque}`}
            precision={0}
            valueStyle={{
                color: styles.valueColor,
                fontWeight:"bold",
            
            }}
            
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}} size="small">
            <Statistic
            title="Cuotas"
            value={`$ ${data.cuotas}`}
            precision={0}
            valueStyle={{
                color: styles.valueColor,
                fontWeight:"bold",
            }}
           
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}} size="small">
            <Statistic
            title="M.P."
            value={`$ ${data.mercadopago}`}
            precision={0}
            valueStyle={{
                color: styles.valueColor,
                fontWeight:"bold",
            }}
           
            suffix=""
            />
        </Card>
        </Col>
        <Col  span={3}>
        <Card bordered={false}  style={{backgroundColor:"rgba(0,0,0,0)"}} size="small">
            <Statistic
            title="Total Efvo."
            value={`$ ${parseFloat(data.efectivo) + parseFloat(data.cuotas)}`}
            precision={0}
            valueStyle={{
                color: 'black',
                fontWeight:"bold",
            }}
           
            suffix=""
            />
        </Card>
        </Col>
        
        {/*<Col  span={3}>
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
        </Col>*/}
        
        </>}
        </Row>

        <Modal open={open} footer={null} onCancel={()=>{setOpen(false)}}  width={"80%"}>
             {/*<InformeCaja idcaja={idcaja} />*/}
             <ListaCaja idsucursal={ props.idsucursal} />
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