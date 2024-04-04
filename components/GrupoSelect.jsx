/*
familia
    subfamilia
        grupo
            subgrupo
                codigo

*/

import { get } from "@/src/urls";

const { Space, Select, Spin } = require("antd");
const { useState, useEffect } = require("react");

const GrupoSelect = (props) => {

    const familiaFetchUrl = get.familia_menu_opt;
    const subfamiliaFetchUrl = get.subfamilia_menu_opt;
    const grupoFetchUrl = get.optionsforsubfamilia; //"http://localhost:3000/api/v1/grupos/optionsforsubfamilia/";


    const [idFamilia,setIdFamilia] = useState(-1);
    const [idSubFamilia, setIdSubFamilia] = useState(-1)
    const [idGrupo, setIdGrupo] = useState(-1)

    const [familiaOptions, setFamiliaOptions] = useState([]);
    const [subFamiliaOptions, setSubFamiliaOptions] = useState([]);
    const [grupoOptions, setGrupoOptions] = useState([]);


    const [familiaLoading , setFamiliaLoading] = useState(false);
    const [subFamiliaLoading , setSubFamiliaLoading] = useState(false);
    const [grupoLoading , setGrupoLoading] = useState(false);

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

    const loadGrupo = (_idsubfamilia) => {
        setGrupoLoading(true);
        fetch(grupoFetchUrl+_idsubfamilia)
        .then((response) => response.json())
        .then((response)=>{
            setGrupoOptions(response.data);
            setGrupoLoading(false);
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
                disabled={typeof props.disabled === 'undefined' ? false : props.disabled}
                style={{ width: 240 }}
                
                loading = {familiaLoading}
                value={idFamilia<1?"Seleccione Familia":idFamilia}
                onChange={
                    (value)=>{
                        
                        setIdFamilia(value);
                        setIdSubFamilia(-1);
                        setIdGrupo(-1);

                        loadSubFamilia(value);
                    }
                }
                options = {familiaOptions}
                />
                {
                    idFamilia==-1 ? <Spin /> :
                    (
                        <Select 
                        disabled={typeof props.disabled === 'undefined' ? false : props.disabled}
                        style={{ width: 240 }}
                        loading = {subFamiliaLoading}
                        options = {subFamiliaOptions}
                        placeholder = {"Select"}
                        value = {idSubFamilia<0? "Seleccione Sub Familia" : idSubFamilia}
                        onChange = {
                            (value)=>{
                                setIdSubFamilia(value);
                                setIdGrupo(-1);

                                loadGrupo(value);
                            }

                        }
                        />
                    )
                }
                {
                    idSubFamilia == -1 ? <Spin /> :
                    (
                        <Select 
                        disabled={typeof props.disabled === 'undefined' ? false : props.disabled}
                        style={{ width: 240 }}
                        loading = {grupoLoading}
                        options = {grupoOptions}
                        placeholder = {"Select"}
                        value = {idGrupo<0? "Seleccione Grupo" : idGrupo}
                        onChange = {
                            (value)=>{
                                setIdGrupo(value)


                                props.callback(value)
                            }
                        }
                        />
                    )
                }
                

            </Space>
        
        </>

    );
}

export default GrupoSelect;