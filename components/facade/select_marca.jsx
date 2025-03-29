const { Select } = require("antd")
const { useState, useEffect } = require("react")

const SelectArmazonMarca = props =>{

    const {callback} = props

    const [selectedSubgrupo, setSelectedSubgrupo] = useState([])

    const [gruposData, setGruposData] = useState(null)
    const [subgruposData, setSubgruposData] = useState(null)
    const [subfamiliaData, setSubfamiliaData] = useState(null)

    useEffect(()=>{
        load_subfamilias()
    },[])


    //#region load data 

        const load_grupos = _=>{
            setGruposData(null)
            setSubgruposData(null)
            //fetch(...)

        }

        const load_subgrupos = _ =>{
            setSubgruposData(null)


        }

        const load_subfamilias = _ =>{
            setSubgruposData(null)
            setGruposData(null)

        }

        
    //#endregion

    //#region select events
    const onTipoArmazonSelect = (v) => {
        load_subgrupos()
    }

    const onMarcaSelect = (v) => {
        load_subgrupos()
    }

    const onSubgrupoSelect = (v) => {

    }
    //#endregion

    const select_style = {with:"300px"}

    return <>
    <Select loading={subgruposData==null} onChange={onTipoArmazonSelect} style={select_style} prefix={<>Tipo Armaz&oacute;n: </>} />
    <Select loading={subgruposData==null} onChange={onMarcaSelect} style={select_style} prefix={<> Marca: </>} />
    <Select loading={subgruposData==null} onChange={onSubgrupoSelect} style={select_style} prefix={<> Sub Grupo: </>} />
    </>
}

export default SelectArmazonMarca;