import { get } from "@/src/urls";
import { Button, Col, Row, Table } from "antd";
import { useEffect, useState } from "react";

const VistaPreviaPrecios = ({tipoCategoria, idcategoria,pIncremento, incrementar, onOK, onCancel, nuevoPrecio, redondeo=1, signo=1}) =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    const columns = [
        {title: 'Codigo', dataIndex: 'codigo', key: 'codigo'},
        
        {title: 'Precio Ant.', dataIndex: 'precioA', key: 'precioA'},
        {title: 'Precio Nuevo', dataIndex: 'precioN', key: 'precioN'},
    ]

    useEffect(()=>{
        setLoading(true)
        const idfamilia = (tipoCategoria == "familia" ? idcategoria : "-1");
        const idsubfamilia = (tipoCategoria == "subfamilia" ? idcategoria : "-1");
        const idgrupo = (tipoCategoria == "grupo" ? idcategoria : "-1");
        const idsubgrupo = (tipoCategoria == "subgrupo" ? idcategoria : "-1");
        //alert(get.lista_codigos_categoria + `${idfamilia}/${idsubfamilia}/${idgrupo}/${idsubgrupo}`)
        fetch(get.lista_codigos_categoria + `${idfamilia}/${idsubfamilia}/${idgrupo}/${idsubgrupo}/-1`)
        .then(response=>response.json())
        .then((response)=>{
            setData(
                response.data.map(r=>({
                    codigo: r.codigo,
                    costo: r.costo,
                    precioA: r.precio,
                    precioN: incrementar ?  Math.trunc((r.precio + (r.precio * pIncremento ) * signo) / redondeo) * redondeo : nuevoPrecio,
                    ruta: r.ruta,
                }))
            )
            setLoading(false)
        })
    },[pIncremento,idcategoria, signo, tipoCategoria ])

    return (
        
    <>
    <Row>
        <Col span={24}>
            <b>Vista Previa</b>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table 
            size="small"
            columns={columns}
            dataSource={data} 
            loading={loading}
            scroll={{y:"400px"}}
            />
        </Col>
    </Row>
    <Row>
        <Col span={24} style={{padding:"8px"}}>
            <Button type="primary" block onClick={()=>{onOK && onOK()}}>Aplicar Cambios</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24} style={{padding:"8px"}}>
            <Button danger size="small" block onClick={()=>{onCancel && onCancel()}}>Cancelar</Button>
        </Col>
    </Row>
    
    

    </>)
}

export default VistaPreviaPrecios;