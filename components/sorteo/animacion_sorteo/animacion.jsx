import { post_method } from "@/src/helpers/post_helper"
import { Roulette } from "./roulete"

import { useRef, useState, useEffect } from "react"
import { post } from "@/src/urls"

const AnimacionSorteo = props =>{
    const [roulette, setRoulette] = useState(new Roulette())
    const canvasRef = useRef(null)
    useEffect(()=>{
        
        post_method(post.sorteo_get_participantes,{},(response)=>{
            
            (_=>new Promise(_ => setTimeout(_=>{roulette.init(response.data)}, 3000)))()
            
        })
        
        let animationFrameId
        const render = () => {
            if(!roulette.done)
            {
                roulette.update(canvasRef.current)
            }
            
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()
        return () => {
            window.cancelAnimationFrame(animationFrameId)
          }
    },[roulette.update])

    
    return <canvas  ref={canvasRef} width={"1200px"} height={"800px"} />
}

export default AnimacionSorteo