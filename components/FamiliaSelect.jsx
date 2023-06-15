import { get } from "@/src/urls";
import { Select, Space } from "antd";
import { useEffect, useState } from "react";

const FamiliaSelect = (props) => {

    const familiaFetchUrl = get.familia_menu_opt; //"http://localhost:3000/api/v1/familia/menu/options/";

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
                value={idFamilia<0 ? "Seleccione Familia" : idFamilia}
                loading = {familiaLoading}
                
                onChange={
                    (value)=>{
                       
                        if(typeof value=== 'undefined'){
                            return;
                        }                        
                        if(value== null){
                            return;
                        }                        
                        setIdFamilia(value);
                       
                        props.callback(value)
                    }
                }
                options = {familiaOptions}
                />



    );
}

export default FamiliaSelect;