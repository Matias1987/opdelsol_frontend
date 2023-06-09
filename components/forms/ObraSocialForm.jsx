const { Form, Input, Button } = require("antd")

const ObraSocialForm = (props) => {
    return (<>
        <Form>
            <Form.Item label={"Nombre"} required={true} name={"nombre"}>
                <Input />
            </Form.Item>
            <Form.Item label={"Siglas"} required={true} name={"siglas"}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button>Agregar O.S.</Button>
            </Form.Item>
        </Form>
    </>)
}

export default ObraSocialForm;