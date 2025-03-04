import ListaBancos from "@/components/admin/ListaBancos";
import LayoutAdmin from "@/components/layout/layout_admin";

export default function ListaBancosAdmin(){
    return <>
       <ListaBancos />
    </>
}

ListaBancosAdmin.PageLayout = LayoutAdmin;  