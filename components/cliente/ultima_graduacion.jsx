import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { Col, Row, Tabs } from "antd"
import { useEffect, useState } from "react"

const UltimaGraduacion = props =>{
    const {idcliente, tipo} = props
    const [dataCristales, setDataCristales] = useState([])
    const [dataLC, setDataLC] = useState([])
    const load = _=>{
        fetch(post.get_ultima_graduacion + idcliente)
        .then(r=>r.json())
        .then(response=>{

            const result = response.data.filter(l=>l.tipo.includes("od") || l.tipo.includes("oi"))

            //alert(JSON.stringify(response));

            setDataCristales(_=>result.filter(_r=>_r.origen=="CR").map(r=>(
                {
                    codigo: r.codigo.replace(/\_/g,' '),
                    esf: r.esf,
                    cil: r.cil,
                    eje: r.eje,
                    cb: r.curva_base,
                    diam: r.diametro,
                    idcodigo: r.stock_codigo_idcodigo,
                    tipo: r.tipo.replace(/\_/g,' '),
                    tipo_venta: r.tipo_venta,

                }
            )));

            //alert(JSON.stringify(response.data.filter(_r=>_r.origen=="LC")));

            setDataLC(_=>result.filter(_r=>_r.origen=="LC").map(r=>(
                {
                    codigo: r.codigo.replace(/\_/g,' '),
                    esf: r.esf,
                    cil: r.cil,
                    eje: r.eje,
                    cb: r.curva_base,
                    diam: r.diametro,
                    idcodigo: r.stock_codigo_idcodigo,
                    tipo: r.tipo.replace(/\_/g,' '),
                    tipo_venta: r.tipo_venta,

                }
            )))
        })
        .catch(e=>{})
    }

    const detalle_tipo = (obj) => {
        switch (+obj.tipo_venta){
            case 2: return <>
                {item_value_html(obj.tipo,{color:"blue"})}&nbsp;&nbsp;
                {item_value_html(obj.codigo)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>Eje:</span>{item_value_html(obj.eje)}
            </>
            case 3: return <>
                {item_value_html(obj.tipo,{color:"blue"})}&nbsp;&nbsp;
                {item_value_html(obj.codigo)}
            </>
            case 4: return <>
                {item_value_html(obj.tipo,{color:"blue"})}&nbsp;&nbsp;
                {item_value_html(obj.codigo)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>Esf:</span>{item_value_html(obj.esf)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>Cil:</span>{item_value_html(obj.cil)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>Eje:</span>{item_value_html(obj.eje)}
            </>
            case 5: return <>
                {item_value_html(obj.tipo,{color:"blue"})}&nbsp;&nbsp;
                {item_value_html(obj.codigo)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>Esf:</span>{item_value_html(obj.esf)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>Cil:</span>{item_value_html(obj.cil)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>Eje:</span>{item_value_html(obj.eje)}
            </>
            case 6: return <>
                {item_value_html(obj.tipo,{color:"blue"})}&nbsp;&nbsp;
                {item_value_html(obj.codigo)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>Esf:</span>{item_value_html(obj.esf)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>Cil:</span>{item_value_html(obj.cil)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>Eje:</span>{item_value_html(obj.eje)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>CB:</span>{item_value_html(obj.cb)}&nbsp;&nbsp;
                <span style={{fontWeight:"600", color:"gray"}}>Diam:</span>{item_value_html(obj.diam)}&nbsp;&nbsp;
            </>
        }
    }

    
    const item_value_html = (v, cstyle) => <span style={{...cstyle, fontWeight:"600"}}>{v}</span>
    
    const items = [
        {
          key: '1',
          label: <span style={{fontWeight:"400",  color:"blue"}}>Cristales</span>,
          children: <>
                    {
                        dataCristales.map(r=><>
                        <Col span={24}>{detalle_tipo(r)}</Col>
                        </>)
                    }
                    </>,
        },
        {
          key: '2',
          label: <span style={{fontWeight:"400",  color:"blue"}}>L.C.</span>,
          children: <>
                    {
                        dataLC.map(r=><>
                        <Col span={24}>{detalle_tipo(r)}</Col>
                        </>)
                    }
          </>,
        },
      ];

    useEffect(()=>{load()},[])

    return dataCristales.length<1 && dataLC.length<1 ? <>&nbsp;Sin datos</> : <Tabs defaultActiveKey="1" items={items} size="small" tabPosition="left"  /> 
}

export default UltimaGraduacion