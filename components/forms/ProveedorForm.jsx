import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Input, Form, Button, Row, Col } from "antd";

const ProveedorForm = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        //alert(values)
        /*props?.onSubmit?.({
            nombre:values.nombre,
            cuit: values.cuit
        })*/

        post_method(post.insert.proveedor,{nombre:values.nombre,cuit: values.cuit},(res)=>{
            if(res.status == "OK"){
                if(res.data<0){
                    alert("El proveedor ya existe")
                }
                else{
                    alert("Proveedor Agregado")
                }
                props?.callback?.()
            }
        })

        
        //console.log('Success:', values);
      };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return(
        <>
            <Form
            form={form}
            style={{color: "white"}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}

            >
                <Row>
                    <Col span={24}>
                        <Form.Item
                        name={"nombre"}
                        label={""}
                        rules={[{required:true}]}
                        >
                            <Input prefix="Nombre" onInput={e => e.target.value = e.target.value.toUpperCase()}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                        name={"cuit"}
                        label={""}
                        rules={[{required:true}]}
                        >
                            <Input prefix="CUIT" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit">Guardar</Button>
                        </Form.Item>
                    </Col>
                </Row>
                

                
                
            </Form>
        </>
    );
}

export default ProveedorForm;