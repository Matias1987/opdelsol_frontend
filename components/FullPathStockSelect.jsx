const { Select } = require("antd");
const { useState, useEffect } = require("react");
const { default: CodeSelect } = require("./CodeSelect");


const FullPathStockSelect = (props) => {

    const [stockData, setStockData] = useState([])
    const [loading, setLoading] = useState(false)
    const stockUrl = ""

    const loadStock = (val) => {
        setLoading(true)
        fetch(stockUrl+val)
        .then((response)=>response.json())
        .then((response)=>{
            setLoading(false)
            setStockData(response.data)
            
        })
        .catch()
    }

    return (
        <>
        <CodeSelect
            callback={
                (value)=>{
                    //here is the code
                    loadStock(value)
                }
            }
        />
        <Select 
            disabled={loading}
            options={stockData}
            onChange={
                (value)=>{
                    props.callack(value)
                }
            }
            style={{width:240}}
        
        />
        </>

    )

}

export default FullPathStockSelect;