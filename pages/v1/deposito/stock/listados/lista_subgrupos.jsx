import GrupoSelect from "@/components/GrupoSelect";
import EditarSubgrupo from "@/components/forms/deposito/EditarSubgrupo";
import MyLayout from "@/components/layout/layout";
import { get } from "@/src/urls";
import { Button, Checkbox, Col, Row, Table } from "antd";
import { useEffect, useState } from "react";

export default function ListaSubGrupos(){
    const [change, setChange] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [filtrarPorGrupo, setFiltrarPorGrupo] = useState(false)
    const [idgrupo, setIdGrupo] = useState(-1)
    useEffect(()=>{
        fetch(get.lista_subgrupo)
        .then(r=>r.json())
        .then(response=>{
            setDataSource(
            response.data.map(
                (row)=>(
                    {
                        id: row.idsubgrupo,
                        nombre_corto: row.nombre_corto,
                        nombre_largo: row.nombre_largo,
                        multiplicador: row.multiplicador,
                        idsubgrupo: row.idsubgrupo,
                        ruta: row.ruta,
                        precio_defecto: row.precio_defecto,
                        
                    }
                )
            ))
        })
        .catch(e=>{"error"})
    },[change])
    const columns = [
        {title: 'ID',dataIndex: 'id',key: 'id'},
        {title: 'Ruta',dataIndex: 'ruta',key: 'ruta', render:(_,{ruta})=><>
        <i style={{fontSize:".75em", color:"blue"}}>{ruta}</i>
        </>},
        {title: 'Nombre Largo',dataIndex: 'nombre_largo'},
        {title: 'Nombre Corto',dataIndex: 'nombre_corto'},
        {title: 'Precio Defecto',dataIndex: 'precio_defecto'},
        {
            title: 'Acciones',
            render: 
                (_,{idsubgrupo})=>{
                    return<EditarSubgrupo idsubgrupo={idsubgrupo} buttonText="Editar" callback={()=>{setChange(!change)}} />               
                }
            
        }
    ]
    return(
        <>
        <h1>Lista de SubGrupos</h1>
       
        <Row>
            <Col span={24}>
                
            </Col>
        </Row>
        <Row>
            <Col span={6}>
                <Checkbox value={filtrarPorGrupo} onChange={()=>{setFiltrarPorGrupo(!filtrarPorGrupo)}}>Filtrar por Grupo</Checkbox>
            </Col>
            <Col span={18}>
                <GrupoSelect callback={(id)=>{setIdGrupo(id)}} disabled={!filtrarPorGrupo} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table columns={columns} dataSource={dataSource} scroll={{y:"500px"}} pagination={true} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>

            </Col>
        </Row>
        
        </>
    )
}

ListaSubGrupos.PageLayout = MyLayout;