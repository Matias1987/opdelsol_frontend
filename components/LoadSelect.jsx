import { Select, Space } from "antd";
import { useEffect, useState } from "react";

const LoadSelect = (props) => {

    const [id,setId] = useState(-1);

    const [options, setOptions] = useState([]);

    const [loading , setLoading] = useState(false);

    const load = () => {
        setLoading(true);
        fetch(props.fetchurl)
        .then((response) => 
            
            response.json()
        )
        .then((response) => {
            let _data = response.data;
            
            if (typeof props.parsefnt !== 'undefined') {
                _data = props.parsefnt(response.data)
            }
            
            setOptions(_data);
            
            setLoading(false);
        })
        .catch(error => console.error(error))
    }


    useEffect(()=>{
        load();
    },[]);

    return (
                <>
                {
                 typeof props.label !== 'undefined'? 
                (<label>{props.label}</label>)
                : null
                }
                <Select 
                style={{ width: 240 }}
                value={id}
                loading = {loading}
                
                onChange={
                    (value)=>{
                        
                        setId(value);
                        props.callback(value)
                    }
                }
                options = {options}
                />
                </>
    );
}

export default LoadSelect;