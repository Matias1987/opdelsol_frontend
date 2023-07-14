import InformeVenta from "@/components/informes/ventas/Base";
import PrinterWrapper from "@/components/PrinterWrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function ImprimirSobreVenta(props){
    return (<PrinterWrapper>
        <InformeVenta idventa={props.idventa} />
    </PrinterWrapper>)
}


