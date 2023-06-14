import { get_barcode_from_id, get_barcode_from_id2 } from "@/src/helpers/barcode_helper";
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
                            idcodigo: e.idcodigo,
                            codigo: e.codigo,
                            cantidad: e.cantidad,
                        }
                    )
                )
            )
            setLoading(false)
            //alert(JSON.stringify(response.data))
        })
    },[])

    const Content = () =>{ 
       
        var _temp = Array();
        codigosId.forEach(r=>{
            for(let i=0;i<r.cantidad;i++){
                _temp.push(
                    {codigo: r.codigo, idcodigo: r.idcodigo}
                )
            }
        })

        var _elements = [];
        const cols = 5;
        var prev = -1;

        for(let i=0;i<_temp.length;i++){
            var _t = parseInt(i/cols);
            if(prev != _t){
                _elements.push([]);
                prev = _t;
            }
            _elements[_t].push(_temp[i])
        }

        return (<>
        <table style={{width:"auto"}}>
                        <tbody>
                        <tr>
        {
            
            _elements.map(e=>(<tr>{e.map(r=><td style={{textAlign:"center"}}>{r.codigo}<br /><Barcode value={get_barcode_from_id2(r.idcodigo)}  displayValue={false} width={1.5} height={20}/>&nbsp;</td>)}</tr>))
        }
        </tr>
            </tbody>
        </table>
        </>)
    }

    return ( loading ? null : <Content />  )


}

export default CodigosDeBarraEnvio;