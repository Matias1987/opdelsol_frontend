import CodeGrid from "@/components/etc/CodeGrid";
import EditarStockIndiv from "@/components/forms/deposito/EditarStockIndiv";
import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Col, Row, Table, Tabs } from "antd";
import { useEffect, useState } from "react";

export default function stock_taller(){
    const [reload, setReload] = useState(false)
    const [data, setData]  = useState([])
    const [filtros, setFiltros] = useState(null)
    const [factura, setFactura] = useState(null)
    
    const columns = [
       
        {title: "Código", dataIndex: "codigo", width:"50%"},
        {title: "Cantidad", dataIndex: "cantidad", render:(_,{cantidad})=><div style={{textAlign:"right"}}>{cantidad}</div>},
        {title: "Acciones", render:(_,obj)=>{ return <>
                <EditarStockIndiv buttonText={"Editar Cantidad"}  callback={()=>{
                    setReload(!reload )
                    
                    }} idcodigo={obj.idcodigo} idsucursal={globals.obtenerSucursal()} 
                />
        </>}}
    ]


    const load = () => {
        if(filtros==null)
        {
            return
        }
        const data = {
            subgrupo: +filtros.idsubgrupo < 0 ? "" : filtros.idsubgrupo,
            grupo: +filtros.idgrupo < 0 ? "" : filtros.idgrupo,
            subfamilia: +filtros.idsubfamilia < 0 ? "" : filtros.idsubfamilia,
            familia: +filtros.idfamilia < 0 ? "" : filtros.idfamilia,
            sucursal: globals.obtenerSucursal(),

            codigo_contenga_a: filtros.codigo,
            grupo_contenga_a: "",
            codigo_igual_a: "",
            precio_mayor_a: "",
            precio_menor_a: "",
            precio_igual_a: "",
            cantidad_igual_a: "",
            cantidad_mayor_a: "",
            cantidad_menor_a: "",
            sexo: "",
            edad: "",
            descripcion: "",
        }


        
        post_method(post.search.filtro_stock,data,(response)=>{
            
            setData(response.data.map(
                (row)=>(
                    {
                        key: row.idcodigo,
                        codigo: row.codigo,
                        ruta: row.ruta,
                        cantidad: row.cantidad,
                        idcodigo: row.idcodigo,
                        precio: row.precio,
                       
                        descripcion: row.descripcion,
               

                    }
                )
            ))
    //setLoading(false)
    setListId(listId+1)
        })
    }

    useEffect(()=>{load()}, [reload])


    const table = _ => <>
    <Table 
                        dataSource={data} 
                        columns={columns} 
                        scroll={{y:"500px"}} 
                        summary={_data=>{
                            var total=0;
                          
                            data.forEach(r=>{
                                total += parseFloat(+r.cantidad);
                                
                            })
                            return <>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell colSpan={1}>
                                        TOTAL:
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell align={'right'}><b>{total}</b></Table.Summary.Cell>
                                    <Table.Summary.Cell align={'right'}></Table.Summary.Cell>
                                    <Table.Summary.Cell align={'right'}></Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        }}
                        
                        />
    </>

    const tabItems = [
        {
            label: "Tabla",
            key: "1",
            children: <Table 
                        dataSource={data} 
                        columns={columns} 
                        scroll={{y:"500px"}} 
                        summary={_data=>{
                            var total=0;
                          
                            data.forEach(r=>{
                                total += parseFloat(+r.cantidad);
                                
                            })
                            return <>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell colSpan={1}>
                                        TOTAL:
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell align={'right'}><b>{total}</b></Table.Summary.Cell>
                                    <Table.Summary.Cell align={'right'}></Table.Summary.Cell>
                                    <Table.Summary.Cell align={'right'}></Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        }}
                        />
        } ,
        {
            label: "Grilla",
            key: "2",
            children: <CodeGrid callback={()=>{setReload(!reload)}} idsubgrupo={(filtros?.idsubgrupo)||"-1"}  width={680} height={480} key={(reload)||"-1"}/>
        }
    ]

    return <>
        <Row>
            <Col span={24}>
                <h3>Editar Stock</h3>
            </Col>
        </Row>
        <Row>
            <Col span={24}> 
                <FiltroCodigos callback={(f)=>{
                    setData([])
                    //setGridVisible(f.idsubgrupo!="-1")
                    setFiltros(f)
                    setReload(!reload)
                }} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Tabs defaultActiveKey="2" type="card" items={tabItems} onChange={()=>{}} />
                {/*<Row>
                    <Col span={gridVisible ? 12 : 24}>
                        {table()}
                    </Col>
                    <Col span={gridVisible ? 12 : 0} key={filtros} style={{border:"1px solid #828282", borderRadius:"10px", padding:"1em"}}>
                        <CodeGrid callback={()=>{setReload(!reload)}} idsubgrupo={(filtros?.idsubgrupo)||"-1"}  width={480} height={480} />
                    </Col>
                </Row>*/}
            </Col>
        </Row>

    </>
}

stock_taller.PageLayout = LayoutLaboratorio;