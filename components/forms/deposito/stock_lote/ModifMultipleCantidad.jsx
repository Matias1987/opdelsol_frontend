import CustomModal from "@/components/CustomModal";
import { Button, Form, Input } from "antd";

export default function ModifMultipleCantidad(props){
    
    return (
    <>
    <CustomModal openButtonText="Modificar Cantidad" title="Modificar Cantidad por Selección" onOk={()=>{props.callback()}}>
        <Form>
            <Form.Item label={"Cantidad"}>
                <Input type="number" />
            </Form.Item>
            <Form.Item>
                <Button>Aplicar Cambios</Button>
            </Form.Item>
        </Form>
    </CustomModal>
    </>
    )
}