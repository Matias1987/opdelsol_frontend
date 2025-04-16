import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import SelectLocalidadV2 from "../SelectLocalidadV2";
import Edad from "../Edad";
import { validate_only_numbers_and_letters } from "@/src/helpers/string_helper";
import { UserAddOutlined } from "@ant-design/icons";
import SelectLocalidad from "../SelectLocalidad";
import SelectLocalidadV3 from "../SelectLocalidadV3";


export default function ClienteFormV2(props){
    
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm();
    const [qr, setQR] = useState("")
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [fechaNac, setFechaNac] = useState({
        dia:"",
        mes:"",
        anio:""
    })
    const [clienteData, setClienteData] = useState({
        nombres:"",
        dni:"",
        apellidos:"",
        nacimiento: null,
        domicilio: "",
        telefono: "",
        destinatario: '0',
        idlocalidad:-1,
        
    })

    const url = post.insert.cliente;

    /*useEffect(()=>{
        if(typeof props.destinatario !== 'undefined' && props.destinatario){
            setClienteData(cd=>({...cd,dni:("_d_" + globals.obtenerSucursal() + "_" + Date.now()), destinatario:'1'}))
            
        }
    },[])*/

    const onFinish = () => {
        
        const validateStr = (field, message) => {
            var _val = true;
            if(typeof field === 'undefined'){
                _val=false;
                alert(message)
            }
            if(field===null)
            {
                _val=false;
                alert(message)
            }
            try{
            if(field?.trim().length<1){
                _val=false;
                alert(message)
            }  }
            catch(e){console.log(e)} 
            return _val;

        }
        if(!/^[0-9]+$/.test(clienteData.dni.trim())){
            alert("Campo DNI no válido")
            return
        }
        if(!validateStr(clienteData.dni, "DNI Vacío")){return}
        if(!validateStr(clienteData.nombres, "Nombres Vacío")){return}
        if(!validateStr(clienteData.apellidos, "Apellidos Vacío")){return}
        if(!validateStr(clienteData.domicilio, "Domicilio Vacío")){return}
        if(fechaNac.anio==""||fechaNac.mes==""||fechaNac.dia==""){
            alert("Campo fecha de nacimiento vacío")
            return
        }

        if(!validateStr(clienteData.telefono, "Teléfono Vacío")){return}
        //if(!validateStr(clienteData.nacimiento, "Fecha de Nacimiento Vacío")){return}

        clienteData.fechaNac = `${fechaNac.anio}-${fechaNac.mes}-${fechaNac.dia}`
        
        //alert(JSON.stringify(clienteData))

        if(!confirm("Confirmar agregar cliente"))
        {return}

        setBtnDisabled(true)

        /*if(typeof props.destinatario === 'undefined' || (typeof props.destinatario !== 'undefined' && !props.destinatario)){

            if(!validateStr(clienteData.telefono, "Teléfono Vacío")){return}
            if(!validateStr(clienteData.nacimiento, "Fecha de Nacimiento Vacío")){return}
        
        }*/
        
        
        post_method(post.obtener_cliente_dni,{"dni":clienteData.dni},(res)=>{
            if(res.data.length>0){
                alert("El cliente ya existe")
                setBtnDisabled(false)
            }
            else{

                let _data = {...clienteData, 
                    nombres: clienteData.nombres.toUpperCase(),
                    apellidos: clienteData.apellidos.toUpperCase(),
                    domicilio: clienteData.domicilio.toUpperCase(),
                    tk: globals.getToken(),
                }
                
                post_method(url,_data,(res)=>{
                    //alert("Cliente Agregado")

                    setBtnDisabled(false)

                    setClienteData({
                        nombres:"",
                        dni:"",
                        apellidos:"",
                        nacimiento: null,
                        domicilio: "",
                        telefono: "",
                        destinatario: '0',
                        idlocalidad:-1
                    })

                    if(typeof props.callback !== 'undefined'){
                        props.callback(res.data);
                    }
                    setOpen(false)
                })
            }
        })
    }

    const checkIfDNIExists = (value) =>{
        post_method(post.obtener_cliente_dni,{"dni":clienteData.dni},(res)=>{
            if(res.data.length>0){
                alert("El cliente ya existe")
                setBtnDisabled(true)
            }
            else{
                setBtnDisabled(false)
            }
        }
        )
    }

    
    const onFinishFailed = (err) => {}

    const onChange = (val,idx) => {
        if(!validate_only_numbers_and_letters(val) && val.length>0)
        {
            return
        }
        setClienteData(d=>({...d,[idx]:val}))
    }

    const onChangeDate = (date, datestr) => {
        
        var _parts = datestr.split("/")

        setClienteData(e=>({...e,nacimiento:dayjs(`${_parts[2]}-${_parts[1]}-${_parts[0]}`) }))
        //alert(datestr)
    }

    const onQRChange = (e) => {
       
        const _match = /([0-9]+)@([A-Z\s]+)@([A-Z\s]+)@[A-Z]@([0-9]+)@([A-Z])@([0-9\/]+)@([0-9\/]+)@([0-9]+)/g.exec(e.target.value)
        
        if(_match!=null){
            
            var _parts = _match[6].split("/")

            setClienteData(
                {
                    nombres: _match[3],
                    apellidos: _match[2],
                    dni: _match[4],
                    nacimiento: dayjs(`${_parts[2]}-${_parts[1]}-${_parts[0]}`) 
                }
            )
        }
        else{
            console.log("Input doesn't match")
        }
    }

    const onOpen = () => {
        setFechaNac({ 
            dia:"",
            mes:"",
            anio:""})

            setOpen(true)
    }

    return (<>
    <Button type="link" size="small" onClick={()=>{ props?.test?.(); onOpen();  }}> <UserAddOutlined size={"small"} /> Agregar Cliente</Button>
    
    <Modal width={"70%"} title="Agregar Cliente" open={open} onCancel={()=>{setOpen(false)}} footer={false} destroyOnClose={true}>
        <Row style={{padding:".5em"}}>
            <Col  span={24}>
                <Input  prefix={"QR"} onChange={onQRChange} value={qr} placeholder="  Escanee código QR..." />
            </Col>
        </Row>

        <Row style={{padding:".5em"}}>
            <Col span={24}>
                <Input  
                maxLength={10} 
                style={{appearance:"textfield"}} 
                prefix={"D.N.I.: "} 
                value={clienteData.dni} 
                onChange={(e)=>{
                    //setClienteData(v=>({...v,dni:e.target.value}))
                    onChange(e.target.value,"dni")
                }
                } 
                readOnly={false/*props.destinatario*/}
                
                onBlur={(e)=>{
                    checkIfDNIExists(e.target.value)
                }}
                />
            </Col>
        </Row>
        
        <Row style={{padding:".5em"}}>
            <Col span={24}>
                <Input 
                style={{appearance:"textfield"}}  
                maxLength={45} 
                prefix={"Apellido:"} 
                value={clienteData.apellidos} 
                onChange={(e)=>{
                    //setClienteData(v=>({...v,apellidos:e.target.value}))
                    onChange(e.target.value,"apellidos")
                }} 
                readOnly={false}
                />
            </Col>
        </Row>

        <Row style={{padding:".5em"}}>
            <Col span={24}>
                <Input  
                maxLength={45} 
                prefix={"Nombres:"} 
                value={clienteData.nombres} 
                onChange={(e)=>{
                    //setClienteData(v=>({...v,nombres:e.target.value}))
                    onChange(e.target.value,"nombres")
                    }} />
            </Col>
        </Row>

        
        <Row style={{padding:".5em"}}>
            <Col span={10}>
                <DatePicker 
                prefix={"Fecha de Nacimiento: "}
                format={'DD-MM-YYYY'}
                onChange={(day,daystr)=>{
       
                    if(typeof day === 'undefined')
                    {
                        
                        setFechaNac({
                            dia:"",
                            mes:"",
                            anio:""
                        })
                        return
                    }
                    if(day==null)
                    {
                        
                        setFechaNac({
                            dia:"",
                            mes:"",
                            anio:""
                        })
                        return
                    }
                    
                    setFechaNac(f=>({
                        dia:day.date(),
                        mes:(+day.month()+1),
                        anio:day.year()
                    }))
                }} />
            </Col>
            <Col span={4}>
                <Edad dia={fechaNac.dia} mes={fechaNac.mes} anio={fechaNac.anio} key={fechaNac}/>
            </Col>
            
        </Row>

        <Row style={{padding:".5em"}}>
            <Col span={12}>
                <Input  maxLength={45} prefix={"Domicilio:"} onChange={(e)=>{
                    //setClienteData(d=>({...d,domicilio:e.target.value}))
                    onChange(e.target.value,"domicilio")
                    }} value={clienteData.domicilio} />
            </Col>
            {/*<Col style={{padding:".5em"}} span={12}>
                <SelectLocalidadV2 callback={(p)=>{
                    onChange(p.idlocalidad,"idlocalidad")
                    }} />
            </Col>*/}
            <Col span={12}>
                <SelectLocalidadV3 
                fk_localidad={globals.obtenerOpticaLocalidad()}
                fk_provincia={globals.obtenerOpticaProvincia()}
                callback={(p)=>{
                    alert(JSON.stringify(p))
                    onChange(p.idlocalidad,"idlocalidad")
                    }} />
            </Col>
        </Row>

        <Row style={{padding:".5em"}}>
            <Col span={24}>
                <Input  maxLength={20} prefix={"Teléfono:"} onChange={(e)=>{
                    //setClienteData(d=>({...d,telefono:e.target.value}))
                    onChange(e.target.value,"telefono")
                    }} value={clienteData.telefono} />
            </Col>
        </Row>

        <Row style={{padding:".5em"}}>
            <Col span={24}>
                <Button disabled={btnDisabled} block type="primary" onClick={onFinish}>Guardar</Button>
            </Col>
        </Row>
    </Modal>

</>)}