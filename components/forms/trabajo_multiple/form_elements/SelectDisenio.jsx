import { Select } from "antd";
import { useEffect, useState } from "react"

const SelectDisenio = ({idgrupo, callback, style}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [selection, setSelection] = useState(null)
    const load = () =>{
        setLoading(true)
        //... to do
    }

    useEffect(()=>{
        load();
    },[idgrupo]);

    const onChange = (val) => {
        setSelection(val);
        callback?.(val);
    }

    return <Select
                style={style}
                loading={loading}
                options={data}
                onChange={onChange}
                />
}

export default SelectDisenio;