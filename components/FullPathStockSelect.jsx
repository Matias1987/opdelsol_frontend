import { get } from "@/src/urls";

const { Select, Spin } = require("antd");
const { useState, useEffect } = require("react");
const { default: CodeSelect } = require("./CodeSelect");


const FullPathStockSelect = (props) => {

    const [loading, setLoading] = useState(false)
    const stockUrl = get.lista_stock_porsubgrupo;

    const loadStock = (val) => {
        setLoading(true)
        fetch(stockUrl+val)
        .then((response)=>response.json())
        .then((response)=>{
            setLoading(false)
            /*parse data ! */

            const _data = response.data.map(
                (row)=>(
                    {
                        label: row.codigo,
                        key: row.codigo,
                    }
                )
            )

            setStockData(_data)
            
        })
        .catch((error)=>{console.error(error)})
    }

    return (
        <>
        <CodeSelect
            callback={
                (value)=>{
                    //here is the code
                    //loadStock(value)
                    props.callback(value)
                }
            }
        />
        
        </>

    )

}

export default FullPathStockSelect;