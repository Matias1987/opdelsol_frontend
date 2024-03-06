import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import SelectLocalidad from "../SelectLocalidad";
import SelectLocalidadV2 from "../SelectLocalidadV2";


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
        idlocalidad:-1
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
                
                post_method(url,clienteData,(res)=>{
                    alert("Cliente Agregado")

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

    return (<>
    <Row>
        <Col  span={24}>
            <Button block type="primary" size="small" onClick={()=>{ props?.test?.();  setOpen(true)}}>Agregar Cliente</Button>
        </Col>
    </Row>
    
    <Modal width={"70%"} title="Agregar Cliente" open={open} onCancel={()=>{setOpen(false)}} footer={false}>
        <Row>
            <Col style={{padding:".5em"}} span={24}>
                <Input  prefix={"QR"} onChange={onQRChange} value={qr} placeholder="  Escanee código QR..." />
            </Col>
        </Row>

        <Row>
            <Col style={{padding:".5em"}} span={24}>
                <Input  
                maxLength={10} 
                style={{appearance:"textfield"}} 
                prefix={"D.N.I.: "} 
                value={clienteData.dni} 
                onChange={(e)=>{setClienteData(v=>({...v,dni:e.target.value}))}} 
                readOnly={false/*props.destinatario*/}
                
                onBlur={(e)=>{
                    checkIfDNIExists(e.target.value)
                }}
                />
            </Col>
        </Row>
        
        <Row>
            <Col style={{padding:".5em"}} span={24}>
                <Input  maxLength={45} prefix={"Apellidos:"} value={clienteData.apellidos} onChange={(e)=>{setClienteData(v=>({...v,apellidos:e.target.value.toUpperCase()}))}} />
            </Col>
        </Row>

        <Row>
            <Col style={{padding:".5em"}} span={24}>
                <Input  maxLength={45} prefix={"Nombres:"} value={clienteData.nombres} onChange={(e)=>{setClienteData(v=>({...v,nombres:e.target.value.toUpperCase()}))}} />
            </Col>
        </Row>

        
        <Row>
            <Col span={4}>
                Fecha de Nacimiento
            </Col>
            <Col span={20}>
                <DatePicker 
                format={'DD-MM-YYYY'}
                onChange={(day,daystr)=>{
                    
                    setFechaNac({
                        dia:day.date(),
                        mes:day.month(),
                        anio:day.year()
                    })
                }} />
            </Col>
            {/*<Col span={20}>
                <Space>
                    <Space.Compact>
                        <Input 
                            onChange={(e)=>{
                            
                            let d= parseInt(e.target.value||0); 
                            
                            setFechaNac(_d=>({..._d,dia:d}))
                            
                            }} 
                            value={fechaNac.dia} 
                            type="number" 
                            prefix="Día" 

                            />
                        <Input 
                        onChange={(e)=>{
                            
                            let m= parseInt(e.target.value||0); 
                            
                            setFechaNac(_d=>({..._d,mes:m}))
                            
                            }} 
                        value={fechaNac.mes} 
                        type="number" 
                        prefix="Mes" 

                        />
                        <Input 
                        onChange={(e)=>{
                            
                            let a= parseInt(e.target.value||0); 
                            
                            setFechaNac(_d=>({..._d,anio:a}))
                            
                            }} 
                        value={fechaNac.anio} 
                        
                        prefix="Año" 
                        type="number"
                        />
                        
                    </Space.Compact>
                </Space>
            </Col>*/}
        </Row>

        <Row>
            <Col style={{padding:".5em"}} span={12}>
                <Input  maxLength={45} prefix={"Domicilio:"} onChange={(e)=>{setClienteData(d=>({...d,domicilio:e.target.value}))}} value={clienteData.domicilio.toUpperCase()} />
            </Col>
            <Col style={{padding:".5em"}} span={12}>
                <SelectLocalidadV2 callback={(p)=>{setClienteData(c=>({...c,idlocalidad:p.idlocalidad}))}} />
            </Col>
        </Row>

        <Row>
            <Col style={{padding:".5em"}} span={24}>
                <Input  maxLength={20} prefix={"Teléfono:"} onChange={(e)=>{setClienteData(d=>({...d,telefono:e.target.value}))}} value={clienteData.telefono.toUpperCase()} />
            </Col>
        </Row>
        <Row>
            <Col style={{padding:".5em"}} span={24}>
                
            </Col>
        </Row>
        <Row>
            <Col style={{padding:".5em"}} span={24}>
                <Button disabled={btnDisabled} block type="primary" onClick={onFinish}>Guardar</Button>
            </Col>
        </Row>
    </Modal>

</>)}