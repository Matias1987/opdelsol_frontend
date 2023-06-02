import { get } from "@/src/urls";
import { Table } from "antd";
import { useEffect, useState } from "react";

const VistaPreviaPrecios = (props) =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    const columns = [
        {title: 'Codigo', dataIndex: 'codigo', key: 'codigo'},
        {title: 'Costo', dataIndex: 'costo', key: 'costo'},
        {title: 'Precio Ant.', dataIndex: 'precioA', key: 'precioA'},
        {title: 'Precio Nuevo', dataIndex: 'precioN', key: 'precioN'},
        {title: 'mult_ant', dataIndex: 'mult_ant', key: 'mult_ant'},
        {title: 'mult_act', dataIndex: 'mult_act', key: 'mult_act'},
    ]

    useEffect(()=>{
        setLoading(true)
        const idfamilia = (props.tipo == "familia" ? props.idcategoria : "-1");
        const idsubfamilia = (props.tipo == "subfamilia" ? props.idcategoria : "-1");
        const idgrupo = (props.tipo == "grupo" ? props.idcategoria : "-1");
        const idsubgrupo = (props.tipo == "subgrupo" ? props.idcategoria : "-1");
        //alert(get.lista_codigos_categoria + `${idfamilia}/${idsubfamilia}/${idgrupo}/${idsubgrupo}`)
        fetch(get.lista_codigos_categoria + `${idfamilia}/${idsubfamilia}/${idgrupo}/${idsubgrupo}`)
        .then(response=>response.json())
        .then((response)=>{
            setData(
                response.data.map(r=>({
                    codigo: r.codigo,
                    costo: r.costo,
                    precioA: Math.round((r.costo * r.multiplicador)*.01) * 100,
                    precioN: props.incrementar ? Math.round((r.costo * (r.multiplicador * props.multiplicador))*.01) * 100 : Math.round((r.costo * props.multiplicador)*.01) * 100,
                    ruta: r.ruta,
                    mult_ant: r.multiplicador,
                    mult_act:  props.incrementar ?  (r.multiplicador * props.multiplicador) : props.multiplicador
                }))
            )
            setLoading(false)
        })
    },[props.multiplicador,props.idcategoria, props.incrementar, props.tipo ])

    return (
    <>
    <b>Modificar precios: {props.incrementar? <>Incrementar</> : <>Cambiar Multiplicador </>} a {Math.round((props.multiplicador - 1) * 100)} %</b>
    <Table 
    columns={columns}
    dataSource={data} 
    loading={loading}
    />

    </>)
}

export default VistaPreviaPrecios;