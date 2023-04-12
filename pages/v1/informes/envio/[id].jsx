import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import CodigosDeBarraEnvio from "@/components/informes/CodigosDeBarra";
import InformeEnvio from "@/components/informes/InformeEnvio";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Envio(){
    const [envioid, setEnvioId] = useState(-1);
    const router = useRouter()
    //const {id} = router.query
    //console.log(router.query)

    useEffect(()=>{
        if(router.isReady){
            const {id} = router.query
            setEnvioId(id)
        }
       
    },[router.isReady])

    return ( envioid<0 ? null : <>
        <PrinterWrapper>
            <InformeEnvio idenvio={envioid} />
            <table style={{width:"100%"}}>
                <tbody>
                    <tr>
                        <td style={{width: "33.33%"}}></td>
                        <td style={{width: "33.33%"}}></td>
                        <td style={{width: "33.33%"}}><br /><br /><br /><hr /></td>
                    </tr>
                </tbody>
            </table>
        </PrinterWrapper>
        &nbsp;
        <CustomModal 
        openButtonText="Imprimir C&oacute;digos"
        title=""
        onOk={()=>{}}
        >
           <PrinterWrapper>
                <CodigosDeBarraEnvio idenvio={envioid} />
            </PrinterWrapper>
        </CustomModal>
    
        </> )
}
