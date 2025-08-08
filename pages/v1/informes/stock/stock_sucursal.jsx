import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import SucursalSelect from "@/components/SucursalSelect";
import {Button, Col, Row, Table, Card} from "antd";

import { useState } from "react";

const StockSucursal =(props) =>{
    const columns = []
    const [dataSource, setDataSource] = useState([])
    const [codigo, setCodigo] = useState("")
    const [filtros, setFiltros] = useState(null)
    const procesar_filtros =(data)=>{

          var __filtros = {};
  
          data.filtros.forEach(t=>{
              __filtros[t.tipo] = t.valor
              if(t.tipo=='subgrupo')
              {
                setIdSubgrupo(t.valor)
              }
          })
  
          let _sucursal = globals.obtenerSucursal(); 

          return {
              sucursal: _sucursal,
              codigo_contenga_a: typeof __filtros["codigo_contenga_a"] === 'undefined' ? "" : __filtros["codigo_contenga_a"],
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
              order: "",
              etiquetas: data.tags||"",
          }
      }


   const load = () =>{
        if(!filtros)
        {
        return;
        }
        if((filtros?.filtros||[]).length<1)
        {
        return;
        }
        setLoading(true);
        const data = procesar_filtros(filtros);
        post_method(post.search.filtro_stock, data, (response) => {
        setData(
            response.data.map((row) => ({
            key: row.idcodigo,
            codigo: row.codigo,
            ruta: row.ruta,
            cantidad: row.cantidad,
            idcodigo: row.idcodigo,
            precio: row.precio,
            descripcion: row.descripcion,
            checked: false,
            familia: row.familia,
            subfamilia: row.subfamilia,
            grupo: row.grupo,
            subgrupo: row.subgrupo,
            modo_precio: row.modo_precio,
            idsubgrupo: row.idsubgrupo,
            etiquetas: row.etiquetas,
            activo: row.activo,
            }))
        );
        setLoading(false);
        setListId(listId + 1);
        });
    }
    const callback_filtros = (f) =>{

    }

    const callback_sucursal = s =>{
        setFiltros(_f=>({...f,idsucursal:s}))
    }

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
                <Button onClick={load}>Aplicar</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table 
                columns={columns} 
                dataSource={dataSource}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                
            </Col>
        </Row>
    </Card>
    </>
}

export default StockSucursal;