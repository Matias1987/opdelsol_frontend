import SubFamiliaForm from "@/components/forms/SubFamiliaForm";
import MyLayout from "@/components/layout/layout";

export default function AgregarSubFamilia(){
    return (
        <>
            <h1>Agregar SubFamilia</h1>
            <SubFamiliaForm  action="ADD" />
        </>
    )
}

AgregarSubFamilia.PageLayout = MyLayout;