import { post_method } from "@/src/helpers/post_helper"
import { Roulette } from "./roulete"

import { useRef, useState, useEffect } from "react"
import { post } from "@/src/urls"
import { Col, Modal, Row } from "antd"
import DetalleGanador from "../detalle_ganador"

const AnimacionSorteo = props =>{
    const [open, setOpen] = useState(false)
    const [roulette, setRoulette] = useState(new Roulette())
    const canvasRef = useRef(null)
    const [idGanador, setIdGanador] = useState(-1)
    useEffect(()=>{
       // alert("Load..")
        post_method(post.sorteo_get_participantes,{},(response)=>{
            post_method(post.update.sorteo_set_ganador,{},(_response)=>{
                setIdGanador(_response.data.winner_id);
                //alert(JSON.stringify(_response))
                (_=>new Promise(_ => setTimeout(_=>{roulette.init(response.data, _response.data.winner_id)}, 3000)))();



            })
            
            
            
        })
        
        let animationFrameId
        const render = () => {
            if(!roulette.done)
            {
                roulette.update(canvasRef.current)
            }
            else{
                setOpen(true)
            }
            
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()
        return () => {
            window.cancelAnimationFrame(animationFrameId)
          }
    },[roulette.update])

    
    return <div style={{backgroundColor:"#003E8B"}}>
    <canvas  ref={canvasRef} width={"1200px"} height={"800px"} style={{padding: 0,margin: "auto", display: "block",}} />

    <Modal open={open} onCancel={_=>{setOpen(false)}} width={"1200px"} title=" " footer={null} destroyOnClose>
        <DetalleGanador idcliente={idGanador} />
    </Modal>
    
    </div>
}

export default AnimacionSorteo