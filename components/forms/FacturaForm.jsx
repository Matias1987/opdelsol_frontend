import { Form, Input, Button, Row, Col }  from "antd";
import LoadSelect from "../LoadSelect";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

const FacturaForm = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        //alert(JSON.stringify(values))
        switch(props.action){
            case 'ADD': post_method(post.insert.factura,values,(res)=>{
              if(res.status == "OK"){
                alert("Datos Guardados")
                if(typeof props.callback !== 'undefined'){
                    props.callback()
                }
            }else{alert("Error.")}});
              break;
            case 'EDIT': post_helper.post_method(urls.post.update.factura,values,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            };
        
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const setValue = (key,value) => {
        switch(key){
            case "proveedor_idproveedor":
                form.setFieldsValue({proveedor_idproveedor:value})
                break;
        }
    }

    const row_style = {
        padding:".5em"
    }

    return (
        <>
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form = {form}
        >
            <Row style={row_style}>
                <Col span={24}>
                    <Form.Item name={"proveedor_idproveedor"} label="Proveedor" rules={[{required:true}]}>
                    <LoadSelect 
                    fetchurl={get.lista_proveedores} 
                    callback={(id)=>{setValue("proveedor_idproveedor",id)}} 
                    parsefnt = {
                        (data) => {
                            return data.map((row)=>(
                                {
                                    "value": row.idproveedor,
                                    "label": row.nombre
                                }
                            ))
                        }
                    }
                    />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={row_style}>
                <Col span={24}>
                    <Form.Item name={"numero"} label={"Número"} style={{width:400}} rules={[{required:true}]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={row_style}>
                <Col span={24}>
                    <Form.Item name={"monto"} label={"Monto"} style={{width:200}} rules={[{required:true}]}>
                        <Input type="number" value={0}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row style={row_style}>
                <Col span={24}>
                    <Form.Item name={"cantidad"} label={"Cantidad"} style={{width:200}} rules={[{required:true}]}>
                        <Input type="number" value={0} min={0}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row style={row_style}>
                <Col span={24}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Guardar</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        </>
    );
}

export default FacturaForm;