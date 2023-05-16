import { Button, Form, Input } from "antd";
import LayoutSingle from "@/components/layout/layout_single";
import { redirect } from "next/dist/server/api-utils";
import useStorage from "../../../../useStorage"
import globals from "@/src/globals";
import SucursalSelect from "@/components/SucursalSelect";
import LoadSelect from "@/components/LoadSelect";
const post_helper = require("../../../../src/helpers/post_helper")
const urls = require("../../../../src/urls")

export default function Login(){
    const [form] = Form.useForm();
    const setValue = (key,value) => {
        switch(key){
            case "sucursal":
                form.setFieldsValue({sucursal:value})
                break;
        }
    }

    const onFinish = (values)=>{
        if(typeof values.nombre === 'undefined'){
            alert("completar campos obligatorios (*)");
            return;
        }
        if(typeof values.password === 'undefined'){
            alert("completar campos obligatorios (*)");
            return;
        }
        if(typeof values.sucursal === 'undefined'){
            alert("completar campos obligatorios (*)");
            return;
        }
        if(values.nombre == "" || values.nombre === null){
            alert("completar campos obligatorios (*)");
            return;
            
        }
        if(values.password == "" || values.password === null){
            alert("completar campos obligatorios (*)");
            return;

        }
        if(values.sucursal == "" || values.sucursal === null){
            alert("completar campos obligatorios (*)");
            return;

        }
        //alert("submit..")
        post_helper.post_method(urls.post.login,values,(res)=>{
            //alert(JSON.stringify(res))
            if(res.data.loged == 1){
                const {setItem} = useStorage();
                console.log(res.data.token)
                setItem("token",res.data.token)
               
                //globals.establecerSucursal(1);

                if (typeof window !== "undefined") {
                        window.location.replace(urls.public_urls.dashboard_deposito)
                  }
                
                
                //redirect(urls.public_urls.lista_subgrupos)
            }
            else{
                alert("Datos Incorrectos")
            }
        })
    }

    const onFinishFailed = (errorInfo) => {
        alert(errorInfo)
    }

    return (
    <Form
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    form={form}
    >
        <h4>Log In</h4>
        <Form.Item label={"Usuario"}  name="nombre"  required={true} value="">
            <Input style={{width:"300px"}} placeholder="Ingrese Usuario"/>
        </Form.Item>
        <Form.Item label={"Contraseña"} name="password" required={true} value="">
            <Input.Password style={{width:"300px"}}  />
        </Form.Item>
        <Form.Item
            label={"Sucursal"}
            name={"sucursal"}
            required={true}
        >
            <LoadSelect fetchurl={urls.get.sucursales} 
                        parsefnt={(data) =>(
                                    data.map((row)=>(
                                        {
                                            "value": row.idsucursal,
                                            "label": row.nombre
                                        }
                                    ))
                                )}  
                        callback={
                            (id)=>{
                                globals.establecerSucursal(id)
                                setValue("sucursal",id)
                            }
                        }
                                />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">Log In</Button>
        </Form.Item>

    </Form>)

}

Login.PageLayout = LayoutSingle;