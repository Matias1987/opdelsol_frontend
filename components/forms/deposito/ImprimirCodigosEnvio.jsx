import { useEffect, useState } from "react";

const ImprimirCodigosEnvio = (props) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    //load codigos for envio
    useEffect(()=>{
        setLoading(true)
        fetch("")
        .then(response=>response.json())
        .then((response)=>{
            let data = response.data.map((e)=>({
                codigo: e.cod,
                id: e.idcodigo,
            }))
            setData(data)
            setLoading(false)
        })
    },[])

    const Content = _  => (
        <>
        {data.map(e=>(
            <>
            </>
        ))}
        </>
    )

    return (
        loading  ? null : <Content />
    )
}

export default ImprimirCodigosEnvio;