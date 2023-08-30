import SubGrupoForm from "@/components/forms/SubGrupoForm";
import SubGrupoFormV2 from "@/components/forms/SubGrupoFormV2";
import MyLayout from "@/components/layout/layout";

export default function AgregarSubgrupo(){
    return (
        <>
        <h1>Agregar Subgrupo</h1>
        <SubGrupoFormV2  action="ADD" />
        </>
    )
}

AgregarSubgrupo.PageLayout = MyLayout;