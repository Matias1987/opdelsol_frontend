import { Button, Col, DatePicker, Divider, Flex, Modal, Radio, Row, Select, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import { get, post } from "@/src/urls";
import EditarStockIndiv from "../forms/deposito/EditarStockIndiv";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import FacturaSelect2 from "../FacturaSelect2";
import CargaStockIdeal from "../forms/deposito/cargaStockIdeal";

const CodeGrid = (props) => {
    const canvasRef = useRef(null);
    const [dataSource, setDataSource] = useState([])
    const [selectedCode, setSelectedCode] = useState(null)
    const [reload, setReload] = useState(false)
    const [ejes, setEjes] = useState([])
    const [selectedEje, setSelectedEje] = useState("-1")
    const [firstLoad, setFirstLoad] = useState(true)
    const [subgrupo, setSubgrupo] = useState(null)

    const [tipoGrilla, setTipoGrilla] = useState('s')
    const [filtroPeriodo, setFiltroPeriodo] = useState({desde: '',  hasta: '',})
    
    const [factura, setFactura] = useState(null)

    const [total, setTotal] = useState(0)

    const [popupStockIdeal, setPopupStockIdeal] = useState(false)

    var canvas = null
    var ctx = null

    const tilew=48
    const tileh=48
    const [min_esf , setMinEsf] = useState(-9)
    const [max_esf , setMaxEsf] = useState(0)
    const [min_cil , setMinCil] = useState(-4)
    const [max_cil , setMaxCil] = useState(0)
    const [ncols , setNCols] = useState(0)
    let dict = {}
    let cols = {}
    let rows = {} 
    let map = []
    let moving_mouse = false
    let mouse_down = false
    let xoffset=0
    let yoffset=0
    let start_point = {x:0, y:0}

    const _parse = str => ({dia:str.substring(9,11), mes:str.substring(6,8), anio:str.substring(1,5)}) 

    const periodoDia = (val, dateString) => {
        if(val==null)
        {
            //_limpiar_fechas()
            return
        }

        let from = _parse(JSON.stringify(val[0]))
        let to = _parse(JSON.stringify(val[1]))

        
        setFiltroPeriodo(_f=>({..._f,
            desde: `${from.anio}-${from.mes}-${from.dia}`,
            hasta: `${to.anio}-${to.mes}-${to.dia}`,
        
        }))
    
    }

    const load_ejes_if_any = () => {
        post_method(post.obtener_grilla_stock,{idsubgrupo: props.idsubgrupo, idsucursal: globals.obtenerSucursal(), eje: "-1"},(response)=>{
            let t_ejes = {}
            let _ejes = []
            let _min_esf = 9999
            let _max_esf = -99999
            let _min_cil = 99999
            let _max_cil = -99999
            response.data.forEach(c=>{
                
                _max_esf = parseFloat(c.esf)>_max_esf ? parseFloat(c.esf) : _max_esf
                _min_esf = parseFloat(c.esf)<_min_esf ? parseFloat(c.esf) : _min_esf

                _min_cil = parseFloat(c.cil)<_min_cil ? parseFloat(c.cil) : _min_cil
                _max_cil = parseFloat(c.cil)>_max_cil ? parseFloat(c.cil) : _max_cil

                if(c.eje!=null)
                {
                    if(typeof t_ejes[c.eje] === 'undefined'){
                        t_ejes[c.eje] = null
                        _ejes.push({label:c.eje, value: c.eje})
                    }
                }
                
            })

            setMinCil(_min_cil)
            setMaxCil(_max_cil)

            setMinEsf(_min_esf)
            setMaxEsf(_max_esf)

            setNCols((_max_cil - _min_cil) * 4 + 1)

            setEjes(_ejes)
            if(_ejes.length>0)
            {
                setSelectedEje(_ejes[0].value)
            }
            setReload(!reload)
        })

        fetch(get.obtener_detalle_subgrupo + props.idsubgrupo)
        .then(r=>r.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            setSubgrupo(response.data[0])
        })
        .catch(e=>{console.log("error")})
       
    }

    
    const load = () => {

        dict = {}
        cols = {}
        rows = {} 
        map = []
        xoffset=yoffset=0

        if(tipoGrilla=='p' && (filtroPeriodo.desde==''||filtroPeriodo.hasta==''))
        {
            return
        }

        

        post_method((tipoGrilla == 'p' ? post.obtener_ventas_subgrupo : post.obtener_grilla_stock),{
            idsubgrupo: props.idsubgrupo, 
            idsucursal: globals.obtenerSucursal(), 
            eje: selectedEje,
            desde: filtroPeriodo.desde,
            hasta: filtroPeriodo.hasta,
        },
        (response)=>{
            
            let _total=0
            response.data.forEach(d=>_total+=parseInt(d.cantidad))
            setTotal(_total)
            
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

        const defaultCellFillStyle = tipoGrilla=='s' ? '#9BEDEA' : tipoGrilla=='i' ? '#F4E085': tipoGrilla=='p' ? '#D7E4DE' : '#F4BCEA';

        let d=0
        for(let esf=min_esf, i=0;esf<=max_esf;esf+=.25,i++)
        {
            
            for(let cil=min_cil, j=0;cil<=max_cil;cil+=.25, j++)
            {
                
                if(cols[`${cil.toFixed(2)}`]==0 && rows[`${(esf>0?"+":"") + esf.toFixed(2)}`]==0)
                {
                        continue
                }
                ctx.font = `13px Arial`;
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
                    ctx.fillStyle= dict[idx].mouseover ? "#75DBA3" : defaultCellFillStyle
                    ctx.fillStyle = dict[idx].selected ? "#B58EEB" : ctx.fillStyle
                    ctx.fillRect(x ,y ,tilew,tileh)

                    //ctx.fillStyle=(dict[idx].cantidad==0 ? "#20B2AA" : "#EB4C42")
                    //ctx.fillRect(x ,y ,tilew,tileh)
                    //if(dict[idx].cantidad>0)
                    //{
                        ctx.font = dict[idx].cantidad>0 || dict[idx].stock_ideal>0? `12px Arial` : `10px Arial`
                        ctx.fillStyle=dict[idx].cantidad>0 || dict[idx].stock_ideal>0? "black" : "#5BA1E7"
                        
                        switch(tipoGrilla)
                        {
                            case 's': ctx.fillText(dict[idx].cantidad.toString(), x + 6,y + 14); break;
                            case 'p': ctx.fillText(dict[idx].cantidad.toString(), x + 6,y + 14); break;
                            case 'i': ctx.fillText(dict[idx].stock_ideal.toString(), x + 6,y + 14); break;
                            case 'd' :ctx.fillText((parseInt(dict[idx].cantidad) - parseInt(dict[idx].stock_ideal)).toString(), x + 6,y + 14); break;
                        }
                       //ctx.fillStyle="red"
                       //ctx.fillText(dict[idx].esf, x ,y + 32)
                       //ctx.fillText(dict[idx].cil, x ,y + 44)

                    //}
                    
                }
    
                ctx.fillStyle="#F0EAD6"
                ctx.rect(x ,y ,tilew,tileh)
                
    
            
            }
        }
        ctx.stroke();
        ctx.beginPath()
    
    }


    useEffect(()=>{

        if(typeof props.factura!==undefined)
        {
            setFactura(props.factura)
        }

        if(firstLoad)
        {
            setFirstLoad(false)
            load_ejes_if_any()
            return
        }

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

    },[reload, tipoGrilla])

    const onChange = (e)=>{
        setSelectedCode(null)
        setTipoGrilla(e.target.value)
    }

    const stock_mode = _ => <>
            { ejes.length<1 ? <></>:
                <Row>
                    <Col span={24}>
                        Ejes: <Select 
                        value={selectedEje} 
                        options={ejes} 
                        onChange={(v)=>{
                            setSelectedEje(v);  
                            setReload(!reload)}} 
                        style={{width:"200px"}}/>
                        <Divider />
                    </Col>
                </Row>
            }
            {
                selectedCode!=null ? <>
            
                <Row>
                    <Col span={24}>
                        <EditarStockIndiv buttonText={"Editar Cantidad"} factura={factura}  callback={()=>{
                            setReload(!reload )
                            props?.callback?.()
                        }} idcodigo={selectedCode.idcodigo} idsucursal={globals.obtenerSucursal()} />
                    </Col>
                </Row>
                
                </>:<></>
            }
            <Row>
                <Col span={24}>
                    <Divider />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <FacturaSelect2 
                    factura={factura}
                    callback={(__factura)=>{
                        setFactura(__factura)
                        }} />
                </Col>
            </Row>
      
    </>

    const ideal_mode = _ => <>
        {
                selectedCode!=null ? <>
                <Row>
                    <Col span={24}>
                        <Button onClick={()=>{setPopupStockIdeal(true)}}>Editar Cantidad</Button>
                    </Col>
                </Row>
                <Modal footer={null} open={popupStockIdeal} onCancel={()=>{setPopupStockIdeal(false)}} >
                    <CargaStockIdeal idcodigo={selectedCode.idcodigo} callback={()=>{setPopupStockIdeal(false); setReload(!reload)}}  />
                </Modal>                
                </>:<></>
            }
    </>

    const dif_mode = _ => <>

    </>

    const periodo_mode = _ => <>
        <Row>
            <Col span={24}>
                Consumo Por Periodo
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            <DatePicker.RangePicker size="large"  onChange={periodoDia}/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button disabled={filtroPeriodo.desde==''&&filtroPeriodo.hasta==''} block onClick={()=>{setReload(!reload)}}>Aplicar</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
    </>

    return <>
    <Row>
        <Col span={24}>
            <h3>Grilla de C&oacute;digos</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Flex vertical gap="middle">
                <Radio.Group onChange={onChange} defaultValue="s" value={tipoGrilla}>
                    <Radio.Button value="s">Actual</Radio.Button>
                    <Radio.Button value="i">Ideal</Radio.Button>
                    <Radio.Button value="d">Dif.</Radio.Button>
                    <Radio.Button value="p">Uso Periodo</Radio.Button>
                </Radio.Group>
            </Flex>
        </Col>
    </Row>
    <Row>
        <Col span={16}>
            <canvas ref={canvasRef} width={props.width} height={props.height} style={{border:"1px solid #536872"}}/>
        </Col>
        <Col span={8}>
            <Row>
                <Col span={24}>
                    Subgrupo: {subgrupo==null ? props.idsubgrupo : <><Tag color="geekblue">{subgrupo.nombre_largo}</Tag></>}
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
                        Cantidad: <b>{tipoGrilla == 's' || tipoGrilla == 'p' ?  selectedCode.cantidad : tipoGrilla == 'i' ? selectedCode.stock_ideal : (parseInt(selectedCode.cantidad) - parseInt(selectedCode.stock_ideal))}</b>  
                    </Col>
                </Row>
                
                </>:<></>
            }
        {
            tipoGrilla=="s" ? stock_mode() : tipoGrilla == "i" ? ideal_mode() : tipoGrilla=="p" ? periodo_mode() : dif_mode()
        }
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            Cantidad total:&nbsp;{total}
        </Col>
    </Row>
        
    </>

}

export default CodeGrid