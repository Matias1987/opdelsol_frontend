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

                }
            )))
        })
        .catch(e=>{})
    }

    
    const item_value_html = (v, cstyle) => <span style={{...cstyle, fontWeight:"600"}}>{v}</span>
    const items = [
        {
          key: '1',
          label: 'Cristales',
          children: <>
                    {
                        dataCristales.map(r=><>
                        <Col span={24}>{item_value_html(r.tipo,{color:"blue"})}&nbsp;&nbsp;{item_value_html(r.codigo)}&nbsp;&nbsp;Esf:{item_value_html(r.esf)}&nbsp;&nbsp;Cil:{item_value_html(r.cil)}&nbsp;&nbsp;Eje:{item_value_html(r.eje)}</Col>
                        </>)
                    }
                    </>,
        },
        {
          key: '2',
          label: 'L.C.',
          children: <>
                    {
                        dataLC.map(r=><>
                        <Col span={24}>{item_value_html(r.tipo)}&nbsp;{item_value_html(r.codigo)}&nbsp;Esf:{item_value_html(r.esf)}&nbsp;Cil:{item_value_html(r.cil)}&nbsp;Eje:{item_value_html(r.eje)}</Col>
                        </>)
                    }
          </>,
        },
      ];

    useEffect(()=>{load()},[])

    return dataCristales.length<1 && dataLC.length<1 ? <>&nbsp;Sin datos</> : <Tabs defaultActiveKey="1" items={items} size="small" tabPosition="left" /> 
}

export default UltimaGraduacion