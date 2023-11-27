import GrupoSelect from "@/components/GrupoSelect";
import SubFamiliaSelect from "@/components/SubFamiliaSelect";
import SubGroupSelect from "@/components/SubGroupSelect";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { EyeFilled } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Select, Table } from "antd";
import { useState } from "react";

const ModificarCantidadCategoria = (props) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const [selection, setSelection] = useState({
        tipo: "subgrupo",
        id: -1,
        cantidad: 0,
        idsucursal: globals.obtenerSucursal()
    })
    const [_options, setOptions] = useState(<></>)

    const onAplicar = _ => {
        alert(JSON.stringify({
            url:post.update.modificar_cantidad_categoria,
            params__: selection
        }))
        post_method(post.update.modificar_cantidad_categoria,selection,(response)=>{
            alert("OK")
        })
    }


    const onUpdateList = _ => {
        post_method(
            post.search.filtro_stock,
            {
                subgrupo: selection.tipo == "subgrupo" ? selection.id : "",
                grupo: selection.tipo == "grupo" ? selection.id : "",
                subfamilia: selection.tipo == "subfamilia" ? selection.id : "",
                familia: selection.tipo == "familia" ? selection.id : "",
            },
            (response)=>{
                setData(response.data.map(r=>({
                    codigo: r.codigo,
                    cantidad: r.cantidad
                })))
            }
        )
        fetch(post.search.filtro_stock)
        .then(response=>response.json())
        .then((response)=>{

        })
    }

    const onChange = (v) => {
        
        switch(v)
        {
            case "familia": setOptions(<></>); break;
            case "subfamilia": setOptions(<><SubFamiliaSelect callback={(id)=>{setSelection(s=>({...s,id:id,tipo:"subfamilia"}))}}/></>); break;
            case "grupo": setOptions(<><GrupoSelect callback={(id)=>{setSelection(s=>({...s,id:id,tipo:"grupo"}))}}/></>); break;
            case "subgrupo": setOptions(<><SubGroupSelect callback={(id)=>{setSelection(s=>({...s,id:id,tipo:"subgrupo"}))}}/></>); break;
        }
    }
    const row_style={
        padding:".7em",
    }
    return <>
    <h3>Modificar Cantidad Categor&iacute;a</h3> 
    <Row style={row_style}>
        <Col span={2}>
            <b className="text_1">Categor&iacute;a:</b>
        </Col>
        <Col span={6}>
            <Select 
            
            style={{width:"100%"}} 
            options={[
                {label:"FAMILIA", value:"familia"},
                {label:"SUBFAMILIA", value:"subfamilia"},
                {label:"GRUPO", value:"grupo"},
                {label:"SUBGRUPO", value:"subgrupo"},
                ]} 
            
                onChange={onChange}
            
            />
        </Col>
        <Col span={2}>
        &nbsp;&nbsp;<b  className="text_1">Valor:</b>&nbsp;&nbsp;
        </Col>
        <Col span={12}>
        {_options}
        
        </Col>
        <Col span={2}>
        {/*<Button type="ghost" onClick={()=>{
            
            setOpen(true)
            }}><EyeFilled /></Button>*/}
        
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input  prefix={"Cantidad"} type="number" value={selection.cantidad} onChange={(e)=>{setSelection(s=>({...s,cantidad:parseInt(e.target.value)}))}} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Button onClick={onAplicar} type="primary">Aplicar</Button>
        </Col>
    </Row>
    <Modal open={open} title={"Lista de Stock"} footer={null} onCancel={()=>{setOpen(false)}}>
        <Row>
            <Col span={24}>
                <Table dataSource={data} columns={[
                {dataIndex:"codigo", title:"Codigo"},
                {dataIndex:"cantidad", title:"Cantidad"},
                ]} />
            </Col>
        </Row>
    </Modal>
        
    </>
}

export default ModificarCantidadCategoria;