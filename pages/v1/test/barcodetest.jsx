import PrinterWrapper from "@/components/PrinterWrapper"
import CodigosDeBarraEnvio from "@/components/informes/CodigosDeBarra"
import Barcode from "react-barcode"


export default function BarcodeTest () { return (
    <>
        <PrinterWrapper>
            <CodigosDeBarraEnvio idenvio="16" />
        </PrinterWrapper>
    </>
    )}