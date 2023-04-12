import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import CodigosDeBarraEnvio from "@/components/informes/CodigosDeBarra";
import InformeEnvio from "@/components/informes/InformeEnvio";
import { useRouter } from "next/router";


export default function VerInformeEnvio2(){
    const router = useRouter()
    const {id} = router.query
    return(
        <>
    <PrinterWrapper>
        <InformeEnvio idenvio={id} />
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
            <CodigosDeBarraEnvio idenvio={id} />
        </PrinterWrapper>
    </CustomModal>

    </>)
}
