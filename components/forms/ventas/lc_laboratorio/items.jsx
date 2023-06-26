import { Form } from "antd";
import { useState } from "react";

const [items, setItems] = useState({
    esf: -1,
    cil: -1,
    eje: -1,
    codigo: null,
    precio: 0,
})

const onChange= ( index, value) => {
    setItems((items)=>{
        const _items = {...items,[index]:value};
        props?.callback(_items);
        return _items;
    })
}

const LCLabItems = (props) => {
    return <>
    <Form>
        
    </Form>
    </>
}

export default LCLabItems;