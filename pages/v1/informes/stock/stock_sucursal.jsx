import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import SucursalSelect from "@/components/SucursalSelect";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import {Checkbox, Col, Row, Table, Card, Input} from "antd";

import { useState } from "react";

const StockSucursal = _ =>{
    const columns = [
        {render: (_,obj)=><>{obj.codigo}</>, width:"250px", title:"Código"},
        {render: (_,obj)=><div style={{textAlign:"right"}}>{obj.cantidad}</div>, width:"250px", title:<div style={{textAlign:"right"}}>Cantidad</div>},
    ]
    const [dataSource, setDataSource] = useState([])
    
    const [idsucursal, setIdSucursal] = useState(-1)

    const [total, setTotal] = useState(0)

    const [ocultar0, setOcultar0] = useState(true)

    const [loading, setLoading] = useState(false)

    const procesar_filtros =(data)=>{

          var __filtros = {};
  
          data.forEach(t=>{
              __filtros[t.tipo] = t.valor
          })
  
          return {
              sucursal: idsucursal,
              codigo_contenga_a: typeof __filtros["codigo"] === 'undefined' ? "" : __filtros["codigo"],
              grupo_contenga_a: typeof __filtros["grupo_contenga_a"] === 'undefined' ? "" : __filtros["grupo_contenga_a"],
              codigo_igual_a: typeof __filtros["codigo_igual_a"] === 'undefined' ? "" : __filtros["codigo_igual_a"],
              precio_mayor_a: typeof __filtros["precio_mayor_a"] === 'undefined' ? "" : __filtros["precio_mayor_a"],
              precio_menor_a: typeof __filtros["precio_menor_a"] === 'undefined' ? "" : __filtros["precio_menor_a"],
              precio_igual_a: typeof __filtros["precio_igual_a"] === 'undefined' ? "" : __filtros["precio_igual_a"],
              cantidad_igual_a: typeof __filtros["cantidad_igual_a"] === 'undefined' ? "" : __filtros["cantidad_igual_a"],
              cantidad_mayor_a: typeof __filtros["cantidad_mayor_a"] === 'undefined' ? "" : __filtros["cantidad_mayor_a"],
              cantidad_menor_a: typeof __filtros["cantidad_menor_a"] === 'undefined' ? "" : __filtros["cantidad_menor_a"],
              descripcion: typeof __filtros["detalles"] === 'undefined' ? "" : __filtros["detalles"],
              subgrupo: typeof __filtros["subgrupo"] === 'undefined' ? "" : __filtros["subgrupo"],
              grupo: typeof __filtros["grupo"] === 'undefined' ? "" : __filtros["grupo"],
              subfamilia: typeof __filtros["subfamilia"] === 'undefined' ? "" : __filtros["subfamilia"],
              familia: typeof __filtros["familia"] === 'undefined' ? "" : __filtros["familia"],
              etiquetas: typeof __filtros["etiquetas"] === 'undefined' ? "" : __filtros["etiquetas"],
          }
      }


   const load = (data) =>{
    
    const data1 = procesar_filtros(data);

    setLoading(true);

    post_method(post.search.filtro_stock, data1, (response) => {

    setDataSource(
        response.data.map((row) => ({
        key: row.idcodigo,
        codigo: row.codigo,
        ruta: row.ruta,
        cantidad: row.cantidad,
        idcodigo: row.idcodigo,

        }))
    );
    let _total = 0;
    response.data.forEach(r=>{
        _total+=+r.cantidad
    })
    setTotal(_total)
    setLoading(false);
    });
    }


    const callback_filtros = (f) =>{

        let data =[]
        
        const _check = (o,f1,f2) => +o[f1]!=-1 ? {tipo:f2, valor:o[f1]}:null
        const _check_arr = (o,f1,f2) => +o[f1].length>0 ? {tipo:f2, valor:o[f1]}:null

        const _add = (v,a) => v? [...a,...[v]] : a;

        data = _add(_check(f,"idfamilia", "familia"), data);
        data = _add(_check(f,"idsubfamilia", "subfamilia"), data);
        data = _add(_check(f,"idgrupo", "grupo"), data);
        data = _add(_check(f,"idsubgrupo", "subgrupo"), data);
        data = _add(_check(f,"codigo", "codigo"), data);
        data = _add(_check_arr(f,"etiquetas", "etiquetas"), data);


        load(data)

    }

    const callback_sucursal = s =>{setIdSucursal(s)}

    return <>
    <Card title="Cantidades Totales por Sucursal" size="small">
        <Row>
            <Col span={24}>
                <SucursalSelect callback={callback_sucursal}  />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <FiltroCodigos callback={callback_filtros}  />
            </Col>
        </Row>
       
        <Row>
            <Col span={24}>
                <Table 
                loading={loading}
                size="small"
                pagination={false}
                scroll={{y:"500px"}}
                columns={columns} 
                dataSource={ocultar0 ? dataSource.filter(d=>+d.cantidad>0) : dataSource}
                title={()=><>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", color:"white" }}>
                    <span style={{margin: 0,  color:"white", fontWeight:"600"}}>Listado</span>
                    <div>
                        <Checkbox style={{color:"white"}} checked={ocultar0} onChange={e=>setOcultar0(e.target.checked)}>Ocultar Cantidad 0</Checkbox>
                    </div>
                </div>
                </>}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <Input prefix="Total: " readOnly value={total} style={{fontWeight:"700", color:"blue"}} />
            </Col>
        </Row>
    </Card>
    </>
}

export default StockSucursal;