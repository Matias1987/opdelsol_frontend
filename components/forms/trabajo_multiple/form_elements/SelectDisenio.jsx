import { get } from "@/src/urls";
import { Select } from "antd";
import { useEffect, useState } from "react"

const SelectDisenio = ({idgrupo, callback, style}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [selection, setSelection] = useState(null)
    const load = () =>{
        if(!idgrupo || +idgrupo<0)
        {
            return;
        }
        setLoading(true)
        const url = get.lista_subgrupo + idgrupo;
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            const options = res.data.map(sg=>({label:sg.nombre_corto, value:sg.idsubgrupo}));
            setData(options);
            setLoading(false);
        })
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