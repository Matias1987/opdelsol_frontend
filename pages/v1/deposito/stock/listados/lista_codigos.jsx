import CustomModal from "@/components/CustomModal";
import TagsLote from "@/components/etiquetas/TagsLote";
import DetalleCodigo from "@/components/forms/deposito/DetalleCodigo";
import EditarCodigoGrupo from "@/components/forms/deposito/EditarCodigoGrupo";
import EditarCodigoIndiv from "@/components/forms/deposito/EditarCodigoIndiv";
import EditarSubgrupo from "@/components/forms/deposito/EditarSubgrupo";
import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import MyLayout from "@/components/layout/layout";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Checkbox, Col, Input, Modal, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";

export default function ListaCodigos(){
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [change, setChange] = useState(false)
    const [popupTagsOpen, setPopupTagsOpen] = useState(false)
    const [filtros, setFiltros] = useState({        
        idfamilia:"-1",
        idsubfamilia:"-1",
        idgrupo:"-1",
        idsubgrupo:"-1",
        codigo:"",
        etiquetas:[],
    })

    useEffect(()=>{
        update_list()
    },[change])

    
    const update_list = () => {
        setLoading(true)
        post_method(
            post.obtener_codigos_filtro,
            filtros,
            (response)=>{
               
                setDataSource(
                    response.data.map(row=>({
                        idcodigo: row.idcodigo,
                        etiquetas: row.etiquetas,
                        codigo: row.codigo,
                        descripcion: row.descripcion,
                        modo_precio: row.modo_precio,
                        precio: row.precio_codigo,
                        checked: false,
                        ruta: `${row.familia} / ${row.subfamilia} / ${row.grupo} / `,
                        idsubgrupo: row.subgrupo_idsubgrupo,
                        subgrupo: row.subgrupo,
                        //estado: "ACTIVO"
                    }))
                )

                setLoading(false)
            }
            )
    }

    const callback_filtros = (filtros) => {
        //alert(JSON.stringify(filtros))
        setFiltros(filtros)
        setChange(!change)

    }

    const columns = [
        {title: 'Ruta',dataIndex: 'ruta', render:(_,obj)=><span style={{fontSize:".75em"}}>{obj.ruta}<EditarSubgrupo idsubgrupo={obj.idsubgrupo} buttonText={obj.subgrupo} callback={()=>{setChange(!change)}} /></span>},
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
        {title:"Etiquetas", render:(_,{etiquetas})=>{return<span style={{color:"blue", fontWeight:"bold"}}>{etiquetas}</span>}},
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
                        <CustomModal openButtonText="Detalle">
                            <DetalleCodigo idcodigo={idcodigo} />
                        </CustomModal>
                        &nbsp;&nbsp;&nbsp;
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
            <h3>C&oacute;digos</h3>
            <Row style={{padding:"1em"}}>
                <Col span={24}>
                    <FiltroCodigos callback={callback_filtros}  />
                </Col>
            </Row>
            <Row style={{padding:"1em"}}>
                <Col span={12}>
                    <EditarCodigoGrupo 
                    codigos={ (dataSource.filter(d=>d.checked)).map(c=>({idcodigo: c.idcodigo, codigo: c.codigo}))  }  
                    callback={()=>{setChange(!change);}}
                    />
                </Col>
                <Col span={12}>
                    <Button disabled={(dataSource.filter(d=>d.checked)).length<1} type="primary" onClick={()=>{setPopupTagsOpen(true)}}>Editar Etiquetas</Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={dataSource} loading={loading} />
            <Modal 
                footer={null}
                width={"80%"}
                title="Editar Etiquetas"
                open={popupTagsOpen} 
                destroyOnClose 
                onCancel={()=>{
                    setPopupTagsOpen(false)
                }}
            >
                <TagsLote 
                    
                    codigos={ (dataSource.filter(d=>d.checked)).map(c=>({idcodigo: c.idcodigo, codigo: c.codigo}))  }  
                    callback={()=>{setPopupTagsOpen(false); setChange(!change)}}
                />
            </Modal>
        </>

    )
}

ListaCodigos.PageLayout = MyLayout;