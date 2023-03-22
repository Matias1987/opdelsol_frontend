/*
familia
    subfamilia
        grupo
            subgrupo
                codigo

*/

const { Space, Select } = require("antd");
const { useState, useEffect } = require("react");

const CodeSelect = (callback) => {

    const familiaFetchUrl = "http://localhost:3000/api/v1/familia/menu/options/";
    const subfamiliaFetchUrl = "http://localhost:3000/api/v1/subfamilia/optionsforfamilia/";
    const grupoFetchUrl = "http://localhost:3000/api/v1/grupos/optionsforsubfamilia/";
    const subGrupoFetchUrl = "http://localhost:3000/api/v1/subgrupos/optionsforgrupo/";
    const codigoFetchUrl = "http://localhost:3000/api/v1/codigos/optforsubgrupo/";


    const [idFamilia,setIdFamilia] = useState(-1);
    const [idSubFamilia, setIdSubFamilia] = useState(-1)
    const [idGrupo, setIdGrupo] = useState(-1)
    const [idSubGrupo, setIdSubGrupo] = useState(-1)
    const [codigo, setCodigo] = useState(null)

    const [familiaOptions, setFamiliaOptions] = useState([]);
    const [subFamiliaOptions, setSubFamiliaOptions] = useState([]);
    const [grupoOptions, setGrupoOptions] = useState([]);
    const [subGrupoOptions, setSubGrupoOptions] = useState([]);
    const [codigoOptions, setCodigoOptions] = useState([]);


    const [familiaLoading , setFamiliaLoading] = useState(false);
    const [subFamiliaLoading , setSubFamiliaLoading] = useState(false);
    const [grupoLoading , setGrupoLoading] = useState(false);
    const [subGrupoLoading , setSubGrupoLoading] = useState(false);
    const [CodigosLoading , setCodigosLoading] = useState(false);

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

    const loadSubFamilia = () =>{
        setSubFamiliaLoading(true);
        fetch(subfamiliaFetchUrl + idFamilia)
        .then((response) => response.json())
        .then((response) => {
            setSubFamiliaOptions(response.data);
            setSubFamiliaLoading(false);
        })
        .catch(error => console.error(error))
    }

    const loadGrupo = () => {
        setGrupoLoading(true);
        fetch(grupoFetchUrl+idSubFamilia)
        .then((response) => response.json())
        .then((response)=>{
            setGrupoOptions(response.data);
            setGrupoLoading(false);
        })
        .catch(error => console.error(error))
    }


    const loadSubgrupo = () => {
        setSubGrupoLoading(true);
        fetch(subGrupoFetchUrl+idGrupo)
        .then((response) => response.json())
        .then((response)=>{
            setSubGrupoOptions(response.data);
            setSubGrupoLoading(false);
        })
        .catch(error => console.error(error))
    }

    const loadCodigos = () => {
        setCodigosLoading(true);
        fetch(codigoFetchUrl+idSubGrupo)
        .then((response)=>response.json())
        .then((response)=>{
            setCodigoOptions(response)
            setCodigosLoading(false)
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
                loading = {familiaLoading}
                onChange={
                    (value)=>{

                        setIdFamilia(value);
                        setIdSubFamilia(-1);
                        setIdGrupo(-1);
                        setIdSubGrupo(-1);

                        loadSubFamilia();
                    }
                }
                options = {familiaOptions}
                />
                {
                    idFamilia==-1 ? null :
                    (
                        <Select 
                        loading = {subFamiliaLoading}
                        options = {subFamiliaOptions}
                        onChange = {
                            (value)=>{
                                setIdSubFamilia(value);
                                setIdGrupo(-1);
                                setIdSubGrupo(-1);

                                loadGrupo();
                            }

                        }
                        />
                    )
                }
                {
                    idSubFamilia == -1 ? null :
                    (
                        <Select 
                        loading = {grupoLoading}
                        options = {grupoOptions}
                        onChange = {
                            (value)=>{
                                setIdGrupo(value)
                                setIdSubGrupo(-1)

                                loadSubgrupo()
                            }
                        }
                        />
                    )
                }
                {
                    idGrupo == -1 ? null :
                    (
                        <Select 
                        loading = {subGrupoLoading}
                        options = {subGrupoOptions}
                        onChange = {
                            (value)=>{
                                setIdSubGrupo(value);

                                loadCodigos();
                            }
                        }
                        
                        />
                    )
                }
                {
                    idSubGrupo == -1 ? null : 
                    (
                        <Select
                        loading = {CodigosLoading}
                        options = {codigoOptions}
                        onChange = {
                            (value) => {
                                setCodigo(value)
                                callback(codigo)
                            }
                        }
                        />
                    )
                }

            </Space>
        
        </>

    );
}

export default CodeSelect;