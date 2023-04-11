import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import CodigosDeBarraEnvio from "@/components/informes/CodigosDeBarra";
import InformeEnvio from "@/components/informes/InformeEnvio";


export default function VerInformeEnvio(){
    return(
        <>
    <PrinterWrapper>
        <InformeEnvio idenvio={16} />
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
    <CustomModal 
    openButtonText="Imprimir C&oacute;digos"
    title=""
    onOk={()=>{}}
    >
       <PrinterWrapper>
            <CodigosDeBarraEnvio idenvio={16} />
        </PrinterWrapper>
    </CustomModal>

    </>)
}
