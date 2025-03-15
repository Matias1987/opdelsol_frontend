import { get } from "@/src/urls";

import { Space, Select, Spin } from "antd";
import { useState, useEffect } from "react";

const SubFamiliaSelect = (props) => {

    const familiaFetchUrl = get.familia_menu_opt;
    const subfamiliaFetchUrl = get.subfamilia_menu_opt;


    const [idFamilia,setIdFamilia] = useState(-1);
    const [idSubFamilia, setIdSubFamilia] = useState(-1)

    const [familiaOptions, setFamiliaOptions] = useState([]);
    const [subFamiliaOptions, setSubFamiliaOptions] = useState([]);


    const [familiaLoading , setFamiliaLoading] = useState(false);
    const [subFamiliaLoading , setSubFamiliaLoading] = useState(false);

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

    const loadSubFamilia = (_idfamilia) =>{
        setSubFamiliaLoading(true);

        fetch(subfamiliaFetchUrl + _idfamilia)
        .then((response) => response.json())
        .then((response) => {
            setSubFamiliaOptions(response.data);
            setSubFamiliaLoading(false);
        })
        .catch(error => console.error(error))
    }


    useEffect(()=>{
        loadFamilia();
    },[]);

    return (
        <>
            <Space wrap>
                <Select 
                prefix={<span style={{color:"#536872"}}>Familia: </span>}
                disabled={typeof props.disabled === 'undefined' ? false : props.disabled}
                style={{ width: 240 }}
                size="small"
                placeholder="Seleccione..."
                loading = {familiaLoading}
                onChange={
                    (value)=>{
                        
                        setIdFamilia(value);
                        setIdSubFamilia(-1);
                       
                        loadSubFamilia(value);
                    }
                }
                options = {familiaOptions}
                />
                {
                    idFamilia==-1 ? <></> :
                    (
                        <Select 
                        size="small"
                        prefix={<span style={{color:"#536872"}}>SubFamilia: </span>}
                        disabled={typeof props.disabled === 'undefined' ? false : props.disabled}
                        style={{ width: 240 }}
                        loading = {subFamiliaLoading}
                        options = {subFamiliaOptions}
                        placeholder = {"Seleccione..."}
                        value = {idSubFamilia<0? "" : idSubFamilia}
                        onChange = {
                            (value)=>{
                                
                                setIdSubFamilia(value);
                                props.callback(value);

                            }

                        }
                        />
                    )
                }
            </Space>
        
        </>

    );
}

export default SubFamiliaSelect;