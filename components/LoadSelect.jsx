import { Select } from "antd";
import { useEffect, useState } from "react";
/**
 * 
 * @param {*} fetchurl 
 * @returns 
 */
const LoadSelect = (props) => {

    const _reload = typeof props.reload === 'undefined' ? false : props.reload;

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
    },[_reload]);

    return (
                <>
                {
                 typeof props.label !== 'undefined'? 
                (<label>{props.label}</label>)
                : null
                }
                <Select 
                style={{ width: 240 }}
                value={ id < 0 ? "Seleccione" : id }
                loading = {loading}
                placeholder = {typeof props.placeholder !== 'undefined'? "Seleccione" : props.placeholder}
                onChange={
                    (value)=>{
                        
                        setId(value);
                        props?.callback?.(value)
                    }
                }
                options = {options}
                />
                </>
    );
}

export default LoadSelect;