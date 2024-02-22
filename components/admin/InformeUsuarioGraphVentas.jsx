import { Col, Row } from "antd";
import { Chart } from "react-google-charts";
const { post_method } = require("@/src/helpers/post_helper")
const { post } = require("@/src/urls")
const { useState, useEffect } = require("react")

const InformeUsuarioGraphVentas = (props) => {

    const [ventasG , setVentasG] = useState([["dia", "ventas"],[0,0]])
    
    const load=()=>{

        setVentasG([["dia", "ventas"],[0,0]])
       
        post_method(post.gr_ventas_dia_totales,{idusuario: props.idusuario},(response)=>{
            const resp = (response?.data)||[]
            
            if(resp.length<1)
            {
                //alert(JSON.stringify(resp))
                return
            }
            let vg = [["dia", "ventas"]]
            resp.forEach(r=>{
                vg.push([r.fecha, r.cant])
            })
            //console.log(JSON.stringify(vg))
            //alert(JSON.stringify(vg))
            setVentasG(vg)
        })
    }

    useEffect(()=>{
        load()
    },[])

    return <>
    <Row>
        <Col span={24}>
            Ventas &uacute;ltimos 60 d&iacute;as
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Chart
            chartType="Line"
            data={ventasG}
            width="100%"
            height="400px"
            legendToggle
            />
        </Col>
    </Row>
    
    </>

}

export default InformeUsuarioGraphVentas