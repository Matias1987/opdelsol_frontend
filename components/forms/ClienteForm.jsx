import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, DatePicker, Form, Input } from "antd";
import { useState } from "react";


export default function ClienteForm(props){
    

    const [form] = Form.useForm();
    const [clienteData, setClienteData] = useState({
        nombre:"test",
        dni:"test",
        apellidos:"test"
    })

    const url = post.insert.cliente;

    const onFinish = (values) => {
        
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

        if(!validateStr(values.dni, "DNI Vacío")){return}
        if(!validateStr(values.nombres, "Nombres Vacío")){return}
        if(!validateStr(values.apellidos, "Apellidos Vacío")){return}
        if(!validateStr(values.domicilio, "Domicilio Vacío")){return}
        if(!validateStr(values.telefono, "Teléfono Vacío")){return}
        if(!validateStr(values.nacimiento, "Fecha de Nacimiento Vacío")){return}
        

        alert(JSON.stringify(values))
        post_method(post.obtener_cliente_dni,{"dni":values.dni},(res)=>{
            if(res.data.length>0){
                alert("El cliente ya existe")
            }
            else{
                post_method(url,values,(res)=>{
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
        alert(datestr)
    }

    const onQRChange = (e) => {
       
        const _match = /([0-9]+)@([A-Z\s]+)@([A-Z\s]+)@[A-Z]@([0-9]+)@([A-Z])@([0-9\/]+)@([0-9\/]+)@([0-9]+)/g.exec(e.target.value)
        
        if(_match!=null){
            alert("match")
            /*alert("Match!: " + JSON.stringify(
                
            ))*/
            setClienteData(
                {
                    nombre: _match[3],
                    apellidos: _match[2],
                    dni: _match[4]
                }
            )
        }
        else{
            alert("Input doesn´t match")
        }
    }

    return (<>

    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item rules={[{required:true}]} label={"QR"} name={"qr"}>
            <Input onChange={onQRChange} />
        </Form.Item>
        <Form.Item rules={[{required:true}]} label={"DNI"} name={"dni"}>
            <Input value={clienteData.dni} onChange={(e)=>{setClienteData(v=>({...v,dni:e.target.value}))}} />
        </Form.Item>
        <Form.Item rules={[{required:true}]} label={"Nombres"} name={"nombres"}>
            <Input value={clienteData.nombre} onChange={(e)=>{setClienteData(v=>({...v,nombre:e.target.value}))}} />
        </Form.Item>
        <Form.Item rules={[{required:true}]} label={"Apellidos"} name={"apellidos"}>
            <Input value={clienteData.apellidos} onChange={(e)=>{setClienteData(v=>({...v,apellidos:e.target.value}))}} />
        </Form.Item>
        <Form.Item label={"Fecha de Nacimiento"} name={"nacimiento"}>
            <DatePicker onChange={onChangeDate} format={'DD/MM/YYYY'}/>
        </Form.Item>
        <Form.Item label={"Domicilio"} name={"domicilio"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Telefono"} name={"telefono"}>
            <Input />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit">Guardar</Button>
        </Form.Item>
    </Form>

</>)}