import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Form, Input } from "antd";

export default function BajaDesperfecto(){

    const onFinish = (values) => {

        if(
            typeof values.codigo === 'undefined' ||
            typeof values.cantidad === 'undefined' || 
            typeof values.comentarios === 'undefined'
            )
            {
                alert("Completar campos requeridos");
                return;
            }

        if(values.codigo == null){
            alert("Campo codigo vacio");
            return;
        }
        if(  values.codigo.trim() == ""){
            alert("Campo codigo vacio");
            return;
        }
        if(values.cantidad == null){
            alert("Cantidad es cero");
            return;
        }
        if(values.comentarios == null){
            alert("Campo comentario vacio");
            return;
        }
        if(values.comentarios.trim() == ""){
            alert("Campo comentario vacio");
            return;
        }
        const fksucursal = globals.obtenerSucursal();
        //alert(JSON.stringify(values))
        
        post_method(post.update.descontar_cantidad_por_codigo,
            {
                cantidad: values.cantidad,
                sucursal: fksucursal,
                codigo: values.codigo,
            }
            ,(response)=>{

            if(response.data <0){
                alert("Codigo no encontrado")
                return;
            }

            alert("Valor descontado...")
            post_method(post.insert.baja_desperfecto,
                {
                    fkusuario: 1, 
                    fksucursal: fksucursal, 
                    fkcodigo: values.codigo, 
                    cantidad: values.cantidad, 
                    comentarios: values.comentarios
                },
                (_response)=>{
                    alert("OK ")
                }
                )
        })
    }

    return (<>
        <h1>Baja por Desperfecto</h1>
        {/* select codigo first */}
        <Form
            onFinish={onFinish}
        >
            <Form.Item
                name={"codigo"}
                label={"Código"}
                required={true}
            >
                <Input onInput={e => e.target.value = e.target.value.toUpperCase()}  placeholder="Ingrese Codigo"  />

            </Form.Item>
            <Form.Item
                name={"cantidad"}
                label={"Cantidad"}
                required={true}
            >
                <Input type="number" step={0} />

            </Form.Item>
            <Form.Item
                name={"comentarios"}
                label={"Comentarios"}
                required={true}
            >
                <Input.TextArea onInput={e => e.target.value = e.target.value.toUpperCase()}  placeholder="Ingrese Motivo"   />

            </Form.Item>
            <Form.Item>
                <Button danger htmlType="submit">Dar de Baja</Button>
            </Form.Item>
        </Form>
    </>)
}