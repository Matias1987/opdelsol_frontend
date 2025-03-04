import ListaMedicos from "@/components/admin/ListaMedicos";
import LayoutAdmin from "@/components/layout/layout_admin";

export default function ListaMedicosAdm(){
    return <>
        <ListaMedicos />
    </>
}

ListaMedicosAdm.PageLayout = LayoutAdmin;  