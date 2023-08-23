import FamiliaForm from "@/components/forms/FamiliaForm";
import MyLayout from "@/components/layout/layout";

export default function AgregarFamilia(){
    return (
    <>
        <h1>Agregar Familia</h1>
        <FamiliaForm action={"ADD"} />
    </>
    )
}

AgregarFamilia.PageLayout = MyLayout;