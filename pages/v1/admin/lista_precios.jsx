import LayoutAdmin from "@/components/layout/layout_admin";
import ListaPreciosV3 from "@/components/lista_precios/listaPreciosV3";
import ListaPreciosV4 from "@/components/lista_precios/listaPreciosV4";
import { idf_optica } from "@/src/config";

export default function ListaPreciosAdmin(){
    return idf_optica==3 ? <ListaPreciosV4 editable={true} /> : <ListaPreciosV3 /> 
} 


ListaPreciosAdmin.PageLayout = LayoutAdmin;  