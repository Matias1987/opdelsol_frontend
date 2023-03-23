const { Select } = require("antd");
const { useState, useEffect } = require("react");


const FacturaSelect = (props) =>{
    const [facturaId,setFacturaId] = useState(-1)
    const facturaUrl = ""
    const [facturaData, setFacturaData] = useState([])
    const loadFacturas = () => {
        fetch(facturaUrl)
        .then((response)=>response.json())
        .then((response)=>{
            setFacturaData(response.data)
        })
    }

    useEffect(()=>{loadFacturas()},[]);

    return (
        <>
        <Select 
            options={facturaData}
            onChange={
                (value)=>{
                    setFacturaId(value)
                    props.callack(value)
                }
            }
            style={{width:240}}
        
        />
        </>

    )

}

export default FacturaSelect;