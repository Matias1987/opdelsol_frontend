import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { useState } from "react";


export default function ClienteFormV2(props){
    

    const [form] = Form.useForm();
    const [qr, setQR] = useState("")
    const [clienteData, setClienteData] = useState({
        nombres:"",
        dni:"",
        apellidos:"",
        nacimiento: null,
        domicilio: "",
        telefono: "",
    })

    const url = post.insert.cliente;

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

        if(!validateStr(clienteData.dni, "DNI Vacío")){return}
        if(!validateStr(clienteData.nombres, "Nombres Vacío")){return}
        if(!validateStr(clienteData.apellidos, "Apellidos Vacío")){return}
        if(!validateStr(clienteData.domicilio, "Domicilio Vacío")){return}
        if(!validateStr(clienteData.telefono, "Teléfono Vacío")){return}
        if(!validateStr(clienteData.nacimiento, "Fecha de Nacimiento Vacío")){return}
        

        //alert(JSON.stringify(clienteData))
        post_method(post.obtener_cliente_dni,{"dni":clienteData.dni},(res)=>{
            if(res.data.length>0){
                alert("El cliente ya existe")
            }
            else{
                post_method(url,clienteData,(res)=>{
                    alert("Agregado")
                    if(typeof props.callback !== 'undefined'){
                        props.callback(res.data);
                    }
                })
            }
        })
        
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
                    nombre: _match[3],
                    apellidos: _match[2],
                    dni: _match[4],
                    nacimiento: dayjs(`${_parts[2]}-${_parts[1]}-${_parts[0]}`) 
                }
            )
        }
        else{
            alert("Input doesn´t match")
        }
    }

    return (<>
<Row>
    <Col style={{padding:".5em"}} span={24}>
        <Input style={{backgroundColor:"lightgray"}} prefix={"QR"} onChange={onQRChange} value={qr} placeholder="  Escanee código QR..." />
    </Col>
</Row>

<Row>
    <Col style={{padding:".5em"}} span={24}>
        <Input style={{backgroundColor:"lightblue"}} prefix={"D.N.I.:"} value={clienteData.dni} onChange={(e)=>{setClienteData(v=>({...v,dni:e.target.value}))}} />
    </Col>
</Row>

<Row>
    <Col style={{padding:".5em"}} span={24}>
        <Input style={{backgroundColor:"lightblue"}} prefix={"Nombres:"} value={clienteData.nombres} onChange={(e)=>{setClienteData(v=>({...v,nombres:e.target.value}))}} />
    </Col>
</Row>

<Row>
    <Col style={{padding:".5em"}} span={24}>
        <Input style={{backgroundColor:"lightblue"}} prefix={"Apellidos:"} value={clienteData.apellidos} onChange={(e)=>{setClienteData(v=>({...v,apellidos:e.target.value}))}} />
    </Col>
</Row>

<Row>
    <Col style={{padding:".5em"}} span={24}>
        <DatePicker value={clienteData.nacimiento} onChange={onChangeDate} format={'DD/MM/YYYY'}/>
    </Col>
</Row>

<Row>
    <Col style={{padding:".5em"}} span={24}>
        <Input style={{backgroundColor:"lightblue"}} prefix={"Domicilio:"} onChange={(e)=>{setClienteData(d=>({...d,domicilio:e.target.value}))}} value={clienteData.domicilio} />
    </Col>
</Row>

<Row>
    <Col style={{padding:".5em"}} span={24}>
        <Input style={{backgroundColor:"lightblue"}} prefix={"Teléfono:"} onChange={(e)=>{setClienteData(d=>({...d,telefono:e.target.value}))}} value={clienteData.telefono} />
    </Col>
</Row>

<Row>
    <Col style={{padding:".5em"}}>
        <Button onClick={onFinish}>Guardar</Button>
    </Col>
</Row>
</>)}