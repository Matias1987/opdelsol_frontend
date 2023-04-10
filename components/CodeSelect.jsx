import SubGroupSelect from "./SubGroupSelect";
import { Select, Spin } from "antd";
import { useState } from "react";

const CodeSelect = (props) => {
    const [codigosLoading, setCodigosLoading] = useState(false)
    const [codigo, setCodigo] = useState(-1);
    const [codigoOptions, setCodigoOptions] = useState([]);
    const [idsubgrupo, setIdSubgrupo] = useState(-1)
    const codigosUrl = "http://localhost:3000/api/v1/codigos/optforsubgrupo/";

    const loadCodigos = (idSubgrupo)=>{
        setCodigosLoading(true)
        fetch(codigosUrl + idSubgrupo)
        .then((response) => response.json())
        .then((response)=>{
            setCodigosLoading(false)
            setCodigoOptions(response.data)
        })
    }

    return (
    <>
        <SubGroupSelect callback = {
            (id) => {
                setIdSubgrupo(id)
                setCodigo(-1)
                if(id>-1)
                {
                    loadCodigos(id);
                    setCodigosLoading(true);
                }
                
                
            }
        }   
        />
        {
            (idsubgrupo == -1) ? <Spin /> : (
                <Select 
                style={{width: 240}}
                options={codigoOptions}
                value={(codigo==-1? "Seleccione...": codigo)}
                loading={codigosLoading}
                onChange={
                    (value)=>{
                        setCodigo(value)
                        props.callback(value)
                    }
                }
                />
            )
        }
    </>
    )
    
}

export default CodeSelect;


