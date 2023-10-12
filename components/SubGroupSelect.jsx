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

const SubGroupSelect = (props) => {

    const familiaFetchUrl = get.familia_menu_opt;// "http://localhost:3000/api/v1/familia/menu/options/";
    const subfamiliaFetchUrl = get.optionsforfamilia; //"http://localhost:3000/api/v1/subfamilia/optionsforfamilia/";
    const grupoFetchUrl = get.optionsforsubfamilia; //"http://localhost:3000/api/v1/grupos/optionsforsubfamilia/";
    const subGrupoFetchUrl = get.optionsforgrupo; //"http://localhost:3000/api/v1/subgrupos/optionsforgrupo/";


    const [idFamilia,setIdFamilia] = useState(-1);
    const [idSubFamilia, setIdSubFamilia] = useState(-1)
    const [idGrupo, setIdGrupo] = useState(-1)
    const [idSubGrupo, setIdSubGrupo] = useState(-1)

    const [familiaOptions, setFamiliaOptions] = useState([]);
    const [subFamiliaOptions, setSubFamiliaOptions] = useState([]);
    const [grupoOptions, setGrupoOptions] = useState([]);
    const [subGrupoOptions, setSubGrupoOptions] = useState([]);


    const [familiaLoading , setFamiliaLoading] = useState(false);
    const [subFamiliaLoading , setSubFamiliaLoading] = useState(false);
    const [grupoLoading , setGrupoLoading] = useState(false);
    const [subGrupoLoading , setSubGrupoLoading] = useState(false);

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


    const loadSubgrupo = (_idgrupo) => {
        setSubGrupoLoading(true);
        fetch(subGrupoFetchUrl+_idgrupo)
        .then((response) => response.json())
        .then((response)=>{
            setSubGrupoOptions(response.data);
            setSubGrupoLoading(false);
        })
        .catch(error => console.error(error))
    }

    useEffect(()=>{
        loadFamilia();
    },[]);

    return (
        <>
            <Space wrap>
                <>
                <Select 
                
                 bordered={idFamilia==-1}
                 style={{ width: "400px" }}
                 value={idFamilia==-1 ? "Seleccione Familia" : idFamilia}
                 loading = {familiaLoading}
                 onChange={
                    (value)=>{
                        
                        setIdFamilia(value);
                        setIdSubFamilia(-1);
                        setIdGrupo(-1);
                        setIdSubGrupo(-1);

                        loadSubFamilia(value);
                        props.callback(-1)
                    }
                }
                options = {familiaOptions}
                />
                </>
                {
                    idFamilia==-1 ? <Spin /> :
                    (
                        <>
                        <Select 
                         bordered={idSubFamilia<0}
                        style={{ width: "400px" }}
                        loading = {subFamiliaLoading}
                        options = {subFamiliaOptions}
                        placeholder = {"Select"}
                        value = {idSubFamilia<0? "Seleccione Sub Familia" : idSubFamilia}
                        onChange = {
                            (value)=>{
                                setIdSubFamilia(value);
                                setIdGrupo(-1);
                                setIdSubGrupo(-1);

                                loadGrupo(value);
                                props.callback(-1)
                            }

                        }
                        />
                        </>
                    )
                }
                {
                    idSubFamilia == -1 ? <Spin /> :
                    (   <>
                            <Select 
                             bordered={idGrupo<0}
                            style={{ width: "400px" }}
                            loading = {grupoLoading}
                            options = {grupoOptions}
                            placeholder = {"Select"}
                            value = {idGrupo<0? "Seleccione Grupo" : idGrupo}
                            onChange = {
                                (value)=>{
                                    setIdGrupo(value)
                                    setIdSubGrupo(-1)
                                    loadSubgrupo(value)
                                    props.callback(-1)
                                }
                            }
                            />
                        </>
                    )
                }
                {
                    idGrupo == -1 ? <Spin /> :
                    (
                        <>
                        <Select 
                         bordered={idSubGrupo<0}
                        style={{ width: "400px" }}
                        loading = {subGrupoLoading}
                        options = {subGrupoOptions}
                        placeholder = {"Seleccione"}
                        value = {idSubGrupo<0? "Seleccione Subgrupo" : idSubGrupo}
                        onChange = {
                            (value)=>{
                                setIdSubGrupo(value)
                                props.callback(value)
                            }
                        }
                        
                        />
                        </>
                    )
                }

            </Space>
        
        </>

    );
}

export default SubGroupSelect;