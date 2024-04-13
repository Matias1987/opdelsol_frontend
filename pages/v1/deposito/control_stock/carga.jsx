import FamiliaSelect from "@/components/FamiliaSelect";
import GrupoSelect from "@/components/GrupoSelect";
import SubFamiliaSelect from "@/components/SubFamiliaSelect";
import SubGroupSelect from "@/components/SubGroupSelect";
import MyLayout from "@/components/layout/layout";
import globals from "@/src/globals";
import { regex_get_id_if_match } from "@/src/helpers/barcode_helper";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Input, Row, Select, Table } from "antd";
import { useState } from "react";

export default function CargaStock(){
    const [codes, setCodes] = useState([])
    const [inputVal, setInputVal] = useState("") 
    const [dict, setDict] = useState({})
    const [categoria, setCategoria] = useState("")
    const [modoControl, setModoControl] = useState(true)
    const [srcControl, setSrcControl] = useState([])
    const [verSoloFaltantes, setVerSoloFaltantes] = useState(false)
    const [comentarios, setComentarios] = useState("")
    const columns = [
        {dataIndex: "codigo", title:"Codigo", render:(_,reg)=>(<>{reg.codigo=="" ? "Pending..." : reg.codigo}</>)},
        {dataIndex:"cantidad_actual", title: "Cantidad Act."},
        {dataIndex:"cantidad", title: "Cantidad"},
        {dataIndex:"mensaje", title: "Msg"}
    ]


    const onKeyDown = (e)=>{
        if(e.keyCode===13)
        {
            const _id = regex_get_id_if_match(inputVal);
            if(_id>-1)
            {
                setInputVal("")
                if(typeof dict[_id.toString()] === 'undefined')
                {
                    compare_quantities(_id,1)
                    setDict(__d=>({...__d,
                        [_id.toString()]:
                        {
                            id:_id,
                            codigo:"",
                            cantidad:1,
                            cantidad_actual: 0,
                            mensaje: "",
                        }
                    }))
                    setCodes(__codes => ([...__codes,{id:_id,codigo:"",cantidad:1, mensaje: "Pendiente..."}]))

                    fetch(get.detalle_stock + `${globals.obtenerSucursal()}/${_id}`)
                    .then(r=>r.json())
                    .then((response)=>{
                       // alert(JSON.stringify(response))
                        if(response==null)
                        {
                            return
                        }
                        if(typeof response.data.length === 'undefined')
                        {
                            //alert("Codigo not found!")
                            
                            setCodes(_c=>{
                                return _c.map(_c1=>(_c1.id==response.data.idcodigo ? {..._c1,codigo: _c1.id, mensaje: "Codigo no encontrado<!> "} : {..._c1}))
                            })
                            fetch(get.detalle_codigo + response.data.idcodigo)
                            .then(r=>r.json())
                            .then(_response=>{
                                //alert(JSON.stringify(_response))
                                if(_response==null)
                                {return}
                                if(typeof _response.data=== 'undefined')
                                {return}
                                if(typeof _response.data.length=== 'undefined')
                                {return}
                                if(_response.data.length>0)
                                {
                                    setCodes(_c=>{
                                        return _c.map(_c1=>(_c1.id==_response.data[0].idcodigo ? {..._c1,codigo: _response.data[0].codigo, mensaje: "Stock local no encontrado "} : {..._c1}))
                                    })
                                }
                            })
                            
                            return
                        }

        
                        
                        setCodes(_c1=>{
                            return _c1.map(_c=>(_c.id==response.data[0].idcodigo ? {..._c,codigo:response.data[0].codigo,cantidad_actual:response.data[0].cantidad, mensaje: "OK"} : {..._c}))
                        })
                    })
                }
                else{
                    let _temp = {...dict}
                    _temp[_id.toString()].cantidad++;
                    compare_quantities(_id,_temp[_id.toString()].cantidad)
                    setDict(_d=>_temp)

                    let  _codes = codes.map(_c=>(_c.id==_id ? {..._c,cantidad:_c.cantidad+1} : {..._c}))
                    setCodes(__=>_codes)

                }
            }
            else{
                alert("CODIGO NO ENCONTRADO")
            }
        }

        
    }

    const aplicar = () => {
        if(!confirm("Modificar Cantidades del Stock?"))
        {
            return
        }
        if(comentarios.trim().length<1)
        {
            alert("Comentario vacio")
            return
        }
        post_method(post.update.modificar_cantidad_lista,{
            fksucursal: globals.obtenerSucursal(),
            codigos: codes,
            fkusuario: globals.obtenerUID(),
            tipo: 'carga',
            comentarios: comentarios,
        },(resp)=>{
            alert("OK")
        })
    }

    const filtros = () => {
        switch(categoria)
        {
            case "": return <></>
            case "familia": return <FamiliaSelect callback={(id)=>{load("familia",id)}}/>
            case "subfamilia": return <SubFamiliaSelect callback={(id)=>{load("subfamilia",id)}}/>
            case "grupo": return <GrupoSelect callback={(id)=>{load("grupo",id)}}/>
            case "subgrupo": return <SubGroupSelect callback={(id)=>{load("subgrupo",id)}}/>
            default: return <></>

        }
    }

    const proc_filtros =(cat, valor)=>{

        return {
            sucursal: globals.obtenerSucursal(),
            codigo_contenga_a: "",
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
            
            subgrupo:(cat=="subgrupo" ? valor: ""),
            grupo: (cat=="grupo" ? valor: ""),
            subfamilia: (cat=="subfamilia" ? valor: ""),
            familia: (cat=="familia" ? valor: ""),
            order: "",
        }
    }

    const load =(cat, id) => {
        if(id<0)
        {
            return
        }
        const filtros = proc_filtros(cat,id)
        //alert(JSON.stringify(filtros))
        post_method(post.search.filtro_stock,filtros,(response)=>{
            setSrcControl(d=>response.data.map(r=>({
                idcodigo: r.idcodigo,
                codigo: r.codigo,
                cantidad: r.cantidad,
                dif: r.cantidad,
            })))
        })
    }

    const compare_quantities = (idcod,cant) => {
        const temp = [...srcControl]
        for(let i=0;i<temp.length;i++)
        {
            if(temp[i].idcodigo == idcod)
            {
                temp[i].dif =   temp[i].cantidad - cant
            }
        }
        
        setSrcControl(_src => [...temp])
    }

    const guardar = () => {
        if(comentarios.trim().length<1)
        {
            alert("Comentario vacio")
            return
        }
        post_method(post.insert.control_stock,{
            fksucursal: globals.obtenerSucursal(),
            codigos: codes,
            fkusuario: globals.obtenerUID(),
            tipo: 'carga',
            comentarios: comentarios
        },
        (resp)=>{
            alert("OK")
        })
    }

    const aplicar_filtros = _ => verSoloFaltantes ? srcControl.filter(r=>r.dif!=0) : srcControl

    return <>
        <Row>
            <Col span={24}>
                <Checkbox 
                checked={modoControl}
                onChange={(e)=>{
                    setModoControl(!modoControl)
                }} 
                >
                    Control de Cantidades
                </Checkbox>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                
            </Col>
        </Row>
        <Row>
            <Col span={16} style={{padding:"1em"}}>
                <Row>
                    <Col span={24}>
                        <Input prefix="Valor:   " onKeyDown={onKeyDown} onChange={(e)=>{setInputVal(_=>e.target.value)}} value={inputVal} style={{backgroundColor:"lightblue"}} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table columns={columns} dataSource={codes} pagination={false} scroll={{y:"400px"}}/>
                    </Col>
                </Row>
                
            </Col>
            <Col span={8} style={{padding:"1em"}}>

                <Row>
                    <Col span={4}>
                        Filtro
                    </Col>
                    <Col span={16}>
                        
                        <Select 
                        placeholder="Seleccione Categoría"
                        style={{width:"100%"}}
                        options={[
                            {label:"FAMILIA", value:"familia"},
                            {label:"SUBFAMILIA", value:"subfamilia"},
                            {label:"GRUPO", value:"grupo"},
                            {label:"SUBGRUPO", value:"subgrupo"}
                        ]}
                        onChange={(v)=>{
                            setCategoria(v)
                        }}
                        
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {filtros()}
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{padding:"1em"}}>
                        <Checkbox checked={verSoloFaltantes} onChange={()=>{setVerSoloFaltantes(!verSoloFaltantes)}}>Ver s&oacute;lo faltantes</Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table 
                        rowClassName={(record, index) => (record.dif != 0 ? "error-row" : "ok-row")}
                        scroll={{y:"500px"}}
                        pagination={false}
                        dataSource={aplicar_filtros()}
                        columns={[
                            {dataIndex:"idcodigo", title:"ID"},
                            {dataIndex:"codigo", title:"CODIGO"},
                            {dataIndex:"cantidad", title:"CANT.", render:(_,o)=>(<><b>{o.cantidad}</b></>)},
                            {dataIndex:"dif", title:"DIF."},
                            {title:"L.", render:(_,o)=>(<>{o.cantidad - o.dif}</>)},
                        ]}/>
                    </Col>
                </Row>
                
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                    Comentarios:
                    <Input.TextArea showCount rows={2} onChange={(e)=>{setComentarios(e.target.value)}} maxLength={125} placeholder="Max. 125 Carácteres"></Input.TextArea>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Divider />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <Button disabled={modoControl} block type="primary" onClick={aplicar}>Aplicar Cantidades y Guardar</Button>
            </Col>
            
            <Col span={12}>
                <Button disabled={!modoControl} block type="primary" onClick={guardar}><SaveOutlined /> Guardar</Button>
            
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

CargaStock.PageLayout = MyLayout;