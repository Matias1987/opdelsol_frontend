import Barcode from "react-barcode";

const { useEffect, useState } = require("react");
const urls = require("../../src/urls");

const CodigosDeBarraEnvio = (props) => {
    const [codigosId, setCodigosId] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true);
        //get barcodes!
        fetch(urls.get.lista_envio_stock+props.idenvio)
        .then(response=>response.json())
        .then((response)=>{
            setCodigosId(
                response.data.map(
                    e=>(
                        {
                            idcodigo: "AR_ID_"+e.idcodigo,
                            codigo: e.codigo
                        }
                    )
                )
            )
            setLoading(false)
        })
    },[])

    const Content = () =>{ 
        return (<>
        <table style={{width:"auto"}}>
                        <tbody>
                        <tr>
        {
            
            codigosId.map((c)=>(
                <>
                    
                        
                            <td style={{textAlign:"center"}}>
                                {c.codigo}
                                <br />
                                <Barcode value={c.idcodigo} displayValue={false} width={1.5} height={20}/>
                            </td>
                        
                        
                </>
            )
            )
        }
        </tr>
            </tbody>
        </table>
        </>)
    }

    return ( loading ? null : <Content />  )


}

export default CodigosDeBarraEnvio;