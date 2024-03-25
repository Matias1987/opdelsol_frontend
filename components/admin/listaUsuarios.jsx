import { get } from "@/src/urls";
import { Button, Card, Col, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";

const ListaUsuarios = (props) => {
    const [usuarios, setUsuarios] = useState([])
    
    const columns = [
        {title:"Nombre", dataIndex:"nombre"},
        {title:"Permisos",  render:(_,record)=>{
            const permisos = record.permisos || []
            return permisos.map(p=><>
                <Card>
                    {p.sucursal}
                    <Tag>Ventas: {p.ventas}</Tag>
                    <Tag>Caja4: {p.caja1}</Tag>
                    <Tag>Caja2: {p.caja2}</Tag>
                    <Tag>Dep: {p.deposito}</Tag>
                    <Tag>DepMin: {p.deposito_min}</Tag>
                    <Tag>Adm1: {p.admin1}</Tag>
                    <Tag>Adm2: {p.admin2}</Tag>
                    <Tag>Lab: {p.laboratorio}</Tag>
                </Card>
            </>)
        }},
        {title:"Acciones", dataIndex:"idusuario", render:(_,{idusuario})=>{
            return <>
                <Button>Editar</Button>
            </>
            
        }}
    ]

    const load = () => {
        //alert(get.obtener_usuarios_permisos)
        fetch(get.obtener_usuarios_permisos)
        .then(r=>r.json())
        .then(response=>{
            
            
            let resp = response.data||[]

            let data = []
            let temp = {}
            resp.forEach(e => {
                if(typeof temp[e.id.toString()] === 'undefined')
                {
                    temp[e.id.toString()] = e
                    data.push(temp[e.id.toString()])
                }
                else{
                    if(typeof temp[e.id.toString()].permisos === 'undefined' )
                    {
                        temp[e.id.toString()].permisos = []
                    }
                    temp[e.id.toString()].permisos.push(e)
                }
            });

            //alert(JSON.stringify(data))

            setUsuarios(data)

        })
        .catch(e=>{
            console.log("error")
        })
    }
    
    useEffect(()=>{
        load()
    },[])



    return <>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table dataSource={usuarios} columns={columns} />
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
}

export default ListaUsuarios;