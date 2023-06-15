import CustomModal from "@/components/CustomModal";
import { Form, Input } from "antd";

export default function ModifMultipleCosto(props){
    
    return (
    <>
    <CustomModal openButtonText="Modificar Costo" title="Modificar Costo por Selección" onOk={()=>{props.callback()}}>
        <Form>
            <Form.Item label={"Costo"}>
                <Input type="number" />
            </Form.Item>
        </Form>
    </CustomModal>
    </>
    )
}