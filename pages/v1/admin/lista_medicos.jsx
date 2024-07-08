import ListaMedicos from "@/components/admin/ListaMedicos";
import LayoutAdmin from "@/components/layout/layout_admin";

export default function ListaMedicosAdm(){
    return <>
        <h3>Medicos</h3>
        <ListaMedicos />
    </>
}

ListaMedicosAdm.PageLayout = LayoutAdmin;  