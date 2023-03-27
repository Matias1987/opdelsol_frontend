const { Space, Select, Spin } = require("antd");
const { useState, useEffect } = require("react");

const SubFamiliaSelect = (props) => {

    const familiaFetchUrl = "http://localhost:3000/api/v1/familia/menu/options/";
    const subfamiliaFetchUrl = "http://localhost:3000/api/v1/subfamilia/optionsforfamilia/";


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
                style={{ width: 240 }}
                
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
                    idFamilia==-1 ? <Spin /> :
                    (
                        <Select 
                        style={{ width: 240 }}
                        loading = {subFamiliaLoading}
                        options = {subFamiliaOptions}
                        placeholder = {"Select"}
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