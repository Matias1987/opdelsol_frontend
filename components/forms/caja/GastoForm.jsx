import { get } from "@/src/urls"

const { Form, Input, Select, Button } = require("antd")
const { useState, useEffect } = require("react")

const GastoForm = (props) => {
    const [options, setOptions] = useState([])
    useEffect(()=>{
        fetch(get.conceptos_gasto)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            setOptions(response.data.map(r=>({
                value: r.idconcepto_gasto,
                label: r.nombre,
            })))
        })
    },[])
    return (<>
        <h3>Cargar Gasto</h3>
        <Form>
            <Form.Item label="Motivo" required={true}>
                <Select options={options} />
            </Form.Item>

            <Form.Item label="Monto" required={true}>

                <Input type="number" />

            </Form.Item>

            <Form.Item>
                <Button>Guardar</Button>
            </Form.Item>

        </Form>
    </>)
}

export default GastoForm;