const { default: CodeSelect } = require("../CodeSelect")
const { default: SucursalSelect } = require("../SucursalSelect")


const StockForm = () => {
    const [form] = Form.useForm()

    const setSucursalValue = () => {

    }

    const setCodeValue = () => {
        
    }


    return (
        <>
        <Form>
            <Form.Item
            name=""
            label=""
            rules={[{required:true}]}
            >
                <SucursalSelect />
            </Form.Item>
            <Form.Item
            name=""
            label=""
            rules={[{required:true}]}
            >
                <CodeSelect />
            </Form.Item>
            <Form.Item
            name=""
            label=""
            rules={[{required:true}]}
            >

            </Form.Item>
        </Form>
        </>
    )
}