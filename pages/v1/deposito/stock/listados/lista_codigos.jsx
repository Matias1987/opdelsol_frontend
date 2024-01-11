import CustomTable from "@/components/forms/CustomTable";
import EditarCodigoIndiv from "@/components/forms/deposito/EditarCodigoIndiv";
import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import MyLayout from "@/components/layout/layout";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Checkbox, Col, Input, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
export default function ListaCodigos(){
    
    const [dataSource, setDataSource] = useState([])
    const [change, setChange] = useState(false)

    useEffect(()=>{
        update_list()
    },[change])

    
    const update_list = (filtros) => {
        
        post_method(
            post.obtener_codigos_filtro,
            filtros,
            (response)=>{
                setDataSource(
                    response.data.map(row=>({
                        idcodigo: row.idcodigo,
                        codigo: row.codigo,
                        descripcion: row.descripcion,
                        modo_precio: row.modo_precio,
                        precio: row.precio_codigo,
                        checked: false,
                        //estado: "ACTIVO"
                    }))
                )
            }
            )
    }

    const callback_filtros = (filtros) => {
        //alert(JSON.stringify(filtros))
        update_list(filtros)

    }

    const columns = [
        {title: 'Codigo',dataIndex: 'codigo'},
        {title: 'Descripcion',dataIndex: 'descripcion'},
        {title: 'Modo Precio',dataIndex: 'modo_precio', render:(_,{modo_precio})=>{
            switch(modo_precio)
            {
                case 0: return <Tag color="blue">Multiplicador</Tag>
                case 1: return <Tag color="orange">Subgrupo</Tag>
                case 2: return <Tag color="yellow">Propio</Tag>
            }
        }},
        {title: "Precio", dataIndex: "precio"},
        /*{
            title: 'Estado',
            dataIndex: 'estado', 
            
            render: (_,{estado})=>(<span style={{color: (estado=='ACTIVO' ? "green" : "red")}} >{estado}</span>)
        },*/
        {
            title: 'Acciones', dataIndex: 'idcodigo',
            render: 
                (_,{idcodigo})=>{
                    return (
                    <>
                       
                            <EditarCodigoIndiv idcodigo={idcodigo} buttonText="Editar" callback={()=>{setChange(!change)}} />
                    </>    
                    )                
                }
            
        },
        {
            title:<><Checkbox onChange={(e)=>{setDataSource(d=>d.map(r=>({...r,checked:e.target.checked })))}} /></>,dataIndex:'idcodigo',
            render:(_,{idcodigo, checked})=>{
                return <><Checkbox checked={checked} onChange={(v)=>{setDataSource(d=>(
                    d.map(r=>r.idcodigo==idcodigo?{...r,checked:!r.checked}:r)
                ))}}/></>
            }
        }
    ]

    return(
        <>
            <h2>Lista C&oacute;digos</h2>
            <Row>
                <Col span={24}>
                    <FiltroCodigos callback={callback_filtros}  />
                </Col>
            </Row>
            <Table columns={columns} dataSource={dataSource} />
        </>

    )
}

ListaCodigos.PageLayout = MyLayout;