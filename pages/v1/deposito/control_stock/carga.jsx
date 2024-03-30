import MyLayout from "@/components/layout/layout";
import globals from "@/src/globals";
import { regex_get_id_if_match } from "@/src/helpers/barcode_helper";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Col, Input, Row, Table } from "antd";
import { useState } from "react";

export default function CargaStock(){
    const [codes, setCodes] = useState([])
    const [inputVal, setInputVal] = useState("") 
    const [dict, setDict] = useState({})
  
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
                    setDict(_d=>_temp)

                    let  _codes = codes.map(_c=>(_c.id==_id ? {..._c,cantidad:_c.cantidad+1} : {..._c}))
                    setCodes(__=>_codes)

                }
            }
            else{
                alert("pattern not Found")
            }
        }
    }

    const aplicar = () => {
        post_method(post.update.modificar_cantidad_lista,{
            fksucursal: globals.obtenerSucursal(),
            codigos: codes,
            fkusuario: globals.obtenerUID(),
            tipo: 'carga'
        },(resp)=>{
            alert("OK")
        })
    }
    return <>
        <Row>
            <Col span={24}>
                
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input prefix="Valor:   " onKeyDown={onKeyDown} onChange={(e)=>{setInputVal(_=>e.target.value)}} value={inputVal} style={{backgroundColor:"lightblue"}} />
            </Col>
        </Row>
        <Row>
            <Col span={18}>
                <Table columns={columns} dataSource={codes} pagination={false} scroll={{y:"400px"}}/>
            </Col>
            <Col span={6}>
                <Input.TextArea value={JSON.stringify(dict)} rows={30} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button block type="primary" onClick={aplicar}>Aplicar</Button>
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

CargaStock.PageLayout = MyLayout;