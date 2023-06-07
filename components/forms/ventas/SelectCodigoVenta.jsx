import CustomModal from "@/components/CustomModal";
import SearchCodigo from "@/components/SearchCodigo";

export default function SelectCodigoVenta(props){return (<>
    <CustomModal 
    openButtonText= { typeof props.buttonText === 'undefined' ? 'Seleccione Codigo' : props.buttonText }
    title=""
    ><SearchCodigo /></CustomModal>
</>)}