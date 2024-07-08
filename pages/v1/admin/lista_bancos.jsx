import ListaBancos from "@/components/admin/ListaBancos";
import LayoutAdmin from "@/components/layout/layout_admin";

export default function ListaBancosAdmin(){
    return <>
       <h3>Bancos</h3> 
       <ListaBancos />
    </>
}

ListaBancosAdmin.PageLayout = LayoutAdmin;  