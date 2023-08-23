import GrupoForm from "@/components/forms/GrupoForm";
import MyLayout from "@/components/layout/layout";

export default function AgregarGrupo(){
    return (
        <>
            <h1>Agregar Grupo</h1>
            <GrupoForm  action="ADD" />
        </>
    )
}

AgregarGrupo.PageLayout = MyLayout;