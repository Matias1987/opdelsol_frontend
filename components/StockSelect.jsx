import { Select } from "antd";

const { useState, useEffect } = require("react");

const StockSelect = (props) => {
    const [stockData, setStockData] = useState([]) 
    const [loadingDetails, setLoadingDetails] = useState(false) 
    const stockUrl = ""
    const stockDetailsUrl = ""

    const loadStockOptions = () => {
        fetch(stockUrl)
        .then((response)=>response.json())
        .then((response)=>{
            setStockData(response.data)
        })
    }

    const loadStockDetails = (val) => {
        setLoadingDetails(true)
        fetch(stockDetailsUrl+val)
        .then((response)=>response.json())
        .then((response)=>{
            props.callback(response.data)
            setLoadingDetails(false)
        })
    }

    useEffect(()=>{
        loadStockOptions()
    },[])

    const onChange = (val) => {
        loadStockDetails(val)
    }
    return (
    <Select
    options={stockData}
    onChange={onChange}
    style={{width:240}}
    disabled={loadingDetails}
    />
    )
}

export default StockSelect;


