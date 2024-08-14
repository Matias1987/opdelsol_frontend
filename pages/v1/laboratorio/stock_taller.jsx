import CodeGrid from "@/components/etc/CodeGrid";
import EditarStockIndiv from "@/components/forms/deposito/EditarStockIndiv";
import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Modal, Row, Table, Tabs } from "antd";

import { useEffect, useState } from "react";

export default function stock_taller(){
    const [reload, setReload] = useState(false)
    const [data, setData]  = useState([])
    const [filtros, setFiltros] = useState(null)
    const [factura, setFactura] = useState(null)
    const [popupEditarStockOpen, setPopupEditarStockOpen] = useState(false)
    const [selectedCodigo, setSelectedCodigo] = useState(-1)

    
    const columns = [
       
        {title: "Código", dataIndex: "codigo", width:"50%"},
        {title: "Cantidad", dataIndex: "cantidad", render:(_,{cantidad})=><div style={{textAlign:"right"}}>{cantidad}</div>},
        {title: "Acciones", render:(_,obj)=>{ return <>
                <Button 
                    onClick={()=>
                        {
                            setSelectedCodigo(obj.idcodigo);
                            setPopupEditarStockOpen(true)
                        }}
                >
                    Editar Cantidad
                </Button>
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
            children: <CodeGrid callback={()=>{setReload(!reload)}} idsubgrupo={(filtros?.idsubgrupo)||"-1"}  idsucursal={globals.obtenerSucursal()} width={640} height={480} key={(reload)||"-1"}/>
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
            </Col>
        </Row>
        <Modal 
        destroyOnClose
        onCancel={()=>{setPopupEditarStockOpen(false)}} 
        footer={null} 
        open={popupEditarStockOpen} 
        width={"90%"}>
            <EditarStockIndiv 
                buttonText={"Editar Cantidad"}  
                callback={()=>{
                    setPopupEditarStockOpen(false)
                    setReload(!reload )

                    }} 
                idcodigo={selectedCodigo} 
                idsucursal={globals.obtenerSucursal()} 
                />
        </Modal>

    </>
}

stock_taller.PageLayout = LayoutLaboratorio;