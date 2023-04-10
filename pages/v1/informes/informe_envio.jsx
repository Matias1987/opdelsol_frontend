import InformeEnvio from "@/components/informes/InformeEnvio";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function VerInformeEnvio(){
    const componentRef = useRef();
    const handlePrint = useReactToPrint(
        {content: ()=>componentRef.current}
    )
return (
<>
    <div >
        <InformeEnvio ref={componentRef} />
    </div>
    <button onClick={handlePrint}>Print!</button>
</>

)
}
