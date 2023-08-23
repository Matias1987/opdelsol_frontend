import SubGrupoForm from "@/components/forms/SubGrupoForm";
import MyLayout from "@/components/layout/layout";

export default function AgregarSubgrupo(){
    return (
        <>
        <h1>Agregar Subgrupo</h1>
        <SubGrupoForm  action="ADD" />
        </>
    )
}

AgregarSubgrupo.PageLayout = MyLayout;