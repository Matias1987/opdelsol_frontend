import { Select, Space } from "antd";
import { useEffect, useState } from "react";

const FamiliaSelect = (props) => {

    const familiaFetchUrl = "http://localhost:3000/api/v1/familia/menu/options/";

    const [idFamilia,setIdFamilia] = useState(-1);

    const [familiaOptions, setFamiliaOptions] = useState([]);

    const [familiaLoading , setFamiliaLoading] = useState(false);

    const loadFamilia = () => {
        setFamiliaLoading(true);
        fetch(familiaFetchUrl)
        .then((response) => response.json())
        .then((response) => {
            setFamiliaOptions(response.data);
            setFamiliaLoading(false);
        })
        .catch(error => console.error(error))
    }


    useEffect(()=>{
        loadFamilia();
    },[]);

    return (


                <Select 
                style={{ width: 240 }}
                value={idFamilia}
                loading = {familiaLoading}
                
                onChange={
                    (value)=>{
                        
                        setIdFamilia(value);
                        props.callback(value)
                    }
                }
                options = {familiaOptions}
                />



    );
}

export default FamiliaSelect;