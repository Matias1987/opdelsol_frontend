import PrinterWrapper from "@/components/PrinterWrapper"
import { get_barcode_from_id2 } from "@/src/helpers/barcode_helper";
import {Modal, Button} from "antd"
import { useState } from "react"
import { BarcodeOutlined} from "@ant-design/icons";
import Barcode from "react-barcode";

const ImpresionCodigosPopup = (props) => {
    const [open, setOpen] = useState(false)
    const [elements, setElements] = useState(null)

    const onOpen = () => {
        const _elements = []
        let j=0
        let curr=null
        props.codigos.forEach(c=>{
            for(let i=0;i<c.cantidad;i++)
            {
                if(curr==null || j%4==0)
                {
                    _elements.push([])
                    curr = _elements[_elements.length-1]
                }
                curr.push({
                    idcodigo: c.idcodigo,
                    codigo: c.codigo,

                })
                j++
            }
        })
        
        setElements(_elements)
    }

    return <>
        <Button size="small" onClick={()=>{onOpen(); setOpen(true);}}><BarcodeOutlined /> Imprimir Codigos</Button>
    <Modal 
    width={"100%"}
    open={open}
    onCancel={()=>{setOpen(false)}}
    footer={null}
    title="Imprimir Códigos"
    >
{       elements == null ? <></> : <PrinterWrapper >
            <div >
            <table style={{width:"auto"}}>
                <tbody>
                    {
                        elements.length <1 ? <h4>No hay c&oacute;digos</h4> : 
                        elements.map(e=>(<tr>{e.map(r=><td style={{textAlign:"center", fontSize:"8px"}}>{r.codigo}<br /><Barcode value={get_barcode_from_id2(r.idcodigo)}  displayValue={false} width={1.5} height={20}/>&nbsp;</td>)}</tr>))
                    }
                </tbody>
            </table>
            </div>
        </PrinterWrapper>
        }
    </Modal>
</>
}

export default ImpresionCodigosPopup;