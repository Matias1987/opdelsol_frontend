import {Col, Progress, Row} from "antd";

import { local_base_url } from "@/src/config";
import { useEffect, useState } from "react";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import globals from "@/src/globals";

const FoodLoader = props =>{

    const [date, setDate] = useState(new Date())

    const [data, setData] = useState({
        target:0,
        ventas:0,
        progreso:0,
    })

    useEffect(()=>{
        
        post_method(
            post.obtener_progreso_sucursal_objetivo,
            {
                fksucursal:globals.obtenerSucursal(),
                mes:date.getMonth()+1,
                anio: date.getFullYear()
            },
            (response)=>{

             
                const d = response?.data

                const _ventas = parseFloat(d?.objetivo||"0")
                const _objetivo = parseFloat(d?.ventas||"0") 
                const _progreso = parseFloat(d?.progreso||"0") 

                setData(_=>({
                    target: _objetivo,
                    ventas: _ventas,
                    progreso:  _progreso,
                }))
              
        })
    },[])
//mixBlendMode:"color-burn", background:`url(${"http://localhost:3000/lbg.png"})`
    return <>
    <Row>
        <Col span={24}>
        <b>Objetivo Cena: { data.progreso==100? "100%" : ""}</b>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
           
            <Progress
                type="circle"
                strokeLinecap="butt"
                steps={{ count: 100, gap: 0 }}
                percent={parseInt(data.progreso)}
                strokeWidth={40}
                
                trailColor="white"
                strokeColor="rgba(0,98,98, 0.0)"
                
                style={{color:"white", fontWeight:"bold", background:`url(${"http://localhost:3000/burger.png"})`,
                backgroundRepeat: "no-repeat",}}
                
            />
            
        </Col>
    </Row>
    
        </>
}

export default FoodLoader