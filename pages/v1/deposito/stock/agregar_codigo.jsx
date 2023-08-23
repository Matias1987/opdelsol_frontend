import CodigoForm from "@/components/forms/CodigoForm";
import MyLayout from "@/components/layout/layout";

export default function AgregarCodigo(){
    return (
        <>
            <h1>Agregar C&oacute;digo</h1>
            <CodigoForm action="ADD" />
        </>
    )

}

AgregarCodigo.PageLayout = MyLayout;