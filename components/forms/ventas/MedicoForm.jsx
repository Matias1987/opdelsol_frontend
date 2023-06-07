import { Form, Input } from "antd";

const MedicoForm = (props) => {
    return (<>
    Agregar Medico
    <Form>
        <Form.Item label={"Nombre"} name={"nombre"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Matricula"} name={"matricula"}>
            <Input />
        </Form.Item>

    </Form>
    </>);
}

export default MedicoForm;