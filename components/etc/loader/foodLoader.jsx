import {Button, Col, Progress, Row, Input, Card} from "antd";

import { useEffect, useState } from "react";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import globals from "@/src/globals";

import { SaveFilled } from "@ant-design/icons";
/**
 * 
 * @param idsucursal if not provided, the current sucursal id is used
 * @param mes if not provided, the current month is used
 * @param anio if not provided, the current year is used
 * @param hideLoader hides the loader graph
 * @param showTarget shows target ammount
 * @param showVentas shows sales  ammount
 * @param editEnabled allows to change the target value
 * 
 */
const FoodLoader = props =>{
    const {idsucursal, mes, anio, hideLoader, showTarget, showVentas, editEnabled} = props
    const [date, setDate] = useState(new Date())
    const [reload, setReload] = useState(false)
    const [loading, setLoading]  = useState(false)
    const [data, setData] = useState({
        target:0,
        ventas:0,
        progreso:0,
    })

    useEffect(()=>{

        load()
        
    },[reload])


    const load = _ => {
        setLoading(true)
        post_method(
            post.obtener_progreso_sucursal_objetivo,
            {
                fksucursal: idsucursal || globals.obtenerSucursal(),
                mes: mes || date.getMonth()+1,
                anio: anio || date.getFullYear()
            },
            (response)=>{

             
                const d = response?.data

                const _objetivo = parseFloat(d?.objetivo||"0")
                const _ventas = parseFloat(d?.ventas||"0") 
                const _progreso = parseFloat(d?.progreso||"0") 

                setData(_=>({
                    target: _objetivo,
                    ventas: _ventas,
                    progreso:  _progreso,
                }))
                setLoading(false)
              
        })
    }

    const onSave = _ => {
        post_method(post.insert.establecer_objetivo_sucursal,
            {
                idsucursal: idsucursal || globals.obtenerSucursal(),
                monto: data.target,
            },
            (r)=>{
                setReload(!reload)
            }
        )
    }
//mixBlendMode:"color-burn", background:`url(${"http://localhost:3000/lbg.png"})`
    return <>
    
    {
        showTarget  ? <Row>
                            <Col span={24}>
                                <Input 
                                    prefix="Objetivo: " 
                                    type="text" 
                                    value={data.target||"0"} 
                                    readOnly={!editEnabled} 
                                    onChange={e=>{setData(_d=>({..._d,target:parseFloat(e.target.value||"0")}))}}
                                    suffix={editEnabled? <Button disabled={loading} onClick={onSave} type="link" size="small"><SaveFilled size={"small"} /></Button>  :<></>} 
                                />
                            </Col>
                        </Row> : <></>
    }
    { showVentas ?  <Row>
                        <Col span={24}>
                            <Input prefix="Ventas: " type="text" value={data.ventas} readOnly />
                        </Col>
                    </Row>
                :  <></>
    }
    {
        hideLoader ? <></> : <>
                                <Row>
                                    <Col span={24}>
                                    <i style={{color:"darkblue", fontSize:".9em"}}>Progreso: { data.progreso==100? "100%" : ""}</i>
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
    
        </>
}

export default FoodLoader