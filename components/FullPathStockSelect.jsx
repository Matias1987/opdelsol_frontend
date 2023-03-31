const { Select, Spin } = require("antd");
const { useState, useEffect } = require("react");
const { default: CodeSelect } = require("./CodeSelect");


const FullPathStockSelect = (props) => {

    const [idcodigo, setIdCodigo] = useState(-1)
    const [stockData, setStockData] = useState([])
    const [loading, setLoading] = useState(false)
    const stockUrl = "http://localhost:3000/api/v1/stock/porsubgrupo/"

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
                    setIdCodigo(value)
                    loadStock(value)
                }
            }
        />
        {idcodigo == -1 ? <Spin /> :
        <Select 
            loading={loading}
            options={stockData}
            onChange={
                (value)=>{
                    props.callack(value)
                }
            }
            style={{width:240}}
        
        />}
        </>

    )

}

export default FullPathStockSelect;