import { Col, Divider, Row, Table, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import SubGroupSelect from "../SubGroupSelect";
import { get } from "@/src/urls";
import EditarStockIndiv from "../forms/deposito/EditarStockIndiv";
import globals from "@/src/globals";

const CodeGrid = (props) => {
    const canvasRef = useRef(null);
    const [dataSource, setDataSource] = useState([])
    const [selectedCode, setSelectedCode] = useState(null)
    const [reload, setReload] = useState(false)
    var canvas = null
    var ctx = null

    const tilew=48
    const tileh=48
    const min_esf = -6
    const max_esf = 6
    const min_cil = -4
    const max_cil = 0
    const ncols = (max_cil - min_cil) * 4 +1
    let dict = {}
    let cols = {}
    let rows = {} 
    let map = []
    let moving_mouse = false
    let mouse_down = false
    let xoffset=0
    let yoffset=0
    let start_point = {x:0, y:0}
    let mMouseX=0
    let mMouseY=0

    
    const load = () => {

        dict = {}
        cols = {}
        rows = {} 
        map = []
        xoffset=yoffset=0
        
        fetch(get.obtener_grilla_stock + props.idsubgrupo + "/" + globals.obtenerSucursal())
        .then(r=>r.json())
        .then((response)=>{
           
            setDataSource(response.data.map(d=>({
                ...d,mouseover:false
            })))
            for(let esf=min_esf;esf<=max_esf;esf+=0.25)
            { 
        
                rows[`${(esf>0?"+":"") + esf.toFixed(2)}`] = 0
                for(let cil=min_cil;cil<=max_cil;cil+=0.25){
        
                    let idx = `${(esf>0?"+":"") + esf.toFixed(2)}${cil.toFixed(2)}`
        
                    dict[idx]=null
        
                    cols[`${cil.toFixed(2)}`] = 0
        
                    map.push(idx)
            
                }
            
            }
            
            response.data.forEach(c=>{
                dict[`${c.esf}${c.cil}`] = {...c, mouseover:false, selected:false,}
                cols[`${c.cil}`] = 1
                rows[`${c.esf}`] = 1
                
            })
        
        })

    }

    const draw = () => {
        
        ctx.fillStyle="white"
        ctx.fillRect(0,0, props.width, props.height)
    
        
        ctx.font = `13px Arial`;
        ctx.fillStyle="red"
        ctx.fillText("ESF / CIL",tilew,tileh )
        ctx.font = `11px Arial`;
        ctx.fillStyle="black"

        let d=0
        for(let esf=min_esf, i=0;esf<=max_esf;esf+=.25,i++)
        {
            
            for(let cil=min_cil, j=0;cil<=max_cil;cil+=.25, j++)
            {
                
                if(cols[`${cil.toFixed(2)}`]==0 && rows[`${(esf>0?"+":"") + esf.toFixed(2)}`]==0)
                {
                        continue
                }
            
                ctx.fillStyle="blue"
                if(j==0)
                {
                    ctx.fillText(`  ${esf.toString()}  `, 0 , tileh * (i +1) + (tileh/2) + yoffset);
                }
                if(i==0)
                {
                    ctx.fillText(` ${cil.toString()} `, tilew * (j+1)   + (8 - cil.toString().length)  + xoffset,  (tileh/2) );
                }
    
    
                
                let x = tilew * (j+1) + xoffset
                let y = tileh * (i+1) + yoffset
    
                if(y<tilew/2) continue
    
                if(x<tileh/2) continue
    
                
                let idx = `${(esf>0?"+":"") + esf.toFixed(2)}${cil.toFixed(2)}`
    
                if(dict[idx]!=null)
                {
                    ctx.fillStyle= dict[idx].mouseover ? "#75DBA3" : "#9BEDEA"
                    ctx.fillStyle = dict[idx].selected ? "#B58EEB" : ctx.fillStyle
                    ctx.fillRect(x ,y ,tilew,tileh)

                    //ctx.fillStyle=(dict[idx].cantidad==0 ? "#20B2AA" : "#EB4C42")
                    //ctx.fillRect(x ,y ,tilew,tileh)
                    if(dict[idx].cantidad>0)
                    {
                        ctx.fillStyle="black"
                        ctx.fillText(dict[idx].cantidad.toString(), x + 8,y + 18)
                    }
                    
                }
    
                ctx.fillStyle="#F0EAD6"
                ctx.rect(x ,y ,tilew,tileh)
                
    
            
            }
        }
        ctx.stroke();
        ctx.beginPath()
    
    }


    useEffect(()=>{
        canvas = canvasRef.current;
        ctx = canvas.getContext('2d');

        canvas.addEventListener("click",(e)=>{
            if(!moving_mouse)
            {
        
                var rect = canvas.getBoundingClientRect();
                let mouse_x= (e.clientX - rect.left) 
                let mouse_y= (e.clientY - rect.top)  
        
                for(let i=0;i<map.length;i++){

                    let  __x = ((i % ncols)+1) * tilew + xoffset
                    let __y = (parseInt(i / ncols)+1) * tileh + yoffset

                    let xhover = mouse_x>__x && mouse_x<__x+tilew 
                    let yhover = mouse_y>__y && mouse_y<__y+tileh

                    
                    if(	xhover&& yhover){
                            
                        setSelectedCode(dict[map[i]])
                        for(let j=0;j<map.length;j++){
                            if(dict[map[j]]!=null)
                            {
                                dict[map[j]].selected=false
                            }
                           
                            
                        }
                        if(dict[map[i]]!=null)
                        {
                            dict[map[i]].selected=true
                        }
                        
                    }
        
                }
            }
        })

        canvas.addEventListener("mousedown",(e)=>{
            mouse_down=true
            moving_mouse=false
            start_point.x = e.clientX
            start_point.y = e.clientY
        })

        canvas.addEventListener("mouseup",(e)=>{
            mouse_down=false
        })

        canvas.addEventListener("mousemove",(e)=>{
            if(mouse_down){
                moving_mouse=true
        
                yoffset +=  (e.clientY - start_point.y ) * 1.3
                start_point.y = e.clientY
        
                xoffset += (e.clientX - start_point.x) * 1.3
                start_point.x = e.clientX
            }
            
            

            var rect = canvas.getBoundingClientRect();
                let mouse_x= (e.clientX - rect.left) 
                let mouse_y= (e.clientY - rect.top)  
        
                for(let i=0;i<map.length;i++){

                    let  __x = ((i % ncols)+1) * tilew + xoffset
                    let __y = (parseInt(i / ncols)+1) * tileh + yoffset

                    let xhover = mouse_x>__x && mouse_x<__x+tilew 
                    let yhover = mouse_y>__y && mouse_y<__y+tileh

                    if(dict[map[i]]!=null)
                    {
                        dict[map[i]].mouseover=false

                        if(xhover)
                        {
                            dict[map[i]].mouseover=true
                        }
                        if(yhover)
                        {
                            dict[map[i]].mouseover=true
                        }
                    }
                    
         
        
                }
           
        })

        
        const interval = setInterval(() => { 
            draw()
        }, 60); 

        load()
  
        //Clearing the interval 
        return () => clearInterval(interval); 

    },[reload])



    return <>
    <Row>
        <Col span={24}>
            <h1>Grilla C&oacute;digos</h1>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        </Col>
    </Row>
    <Row>
        <Col span={16}>
            <canvas ref={canvasRef} width={props.width} height={props.height} style={{border:"1px solid #536872"}}/>
        </Col>
        <Col span={8}>
            <Row>
                <Col span={24}>
                    Subgrupo: {props.idsubgrupo}
                    <Divider />
                </Col>
            </Row>
            {
                selectedCode!=null ? <>
                <Row>
                    <Col span={24}>
                        C&oacute;digo Seleccionado: 
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Tag color="blue">{"ESF " +selectedCode.esf}</Tag>  
                        <Tag color="green">{"CIL " +selectedCode.cil}</Tag>  
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <b>{selectedCode.codigo}</b>  
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        Cantidad: <b>{selectedCode.cantidad}</b>  
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <EditarStockIndiv buttonText={"Editar Cantidad"}  callback={()=>{
                            setReload(!reload )
                        }} idcodigo={selectedCode.idcodigo} idsucursal={globals.obtenerSucursal()} />
                    </Col>
                </Row>
                </>:<></>
            }
        </Col>
        {/*<Col span={12}>
            <Table columns={[
                {dataIndex:"codigo", title:"Codigo"},
                {dataIndex:"subgrupo_idsubgrupo", title:"Id Subgrupo"}
            ]}
            dataSource={dataSource}
            />
        </Col>*/}
    </Row>
        
    </>

}

export default CodeGrid