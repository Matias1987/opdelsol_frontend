import LayoutAdmin from "@/components/layout/layout_admin";
import ListaPreciosMayorista from "@/components/lista_precios/listaPreciosMayorista";
import ListaPreciosV3 from "@/components/lista_precios/listaPreciosV3";
import ListaPreciosV4 from "@/components/lista_precios/listaPreciosV4";
import { idf_optica } from "@/src/config";
import { Tabs } from "antd";

export default function ListaPreciosAdmin(){
    const items = [
        {
            key:"1",
            label:"Cirstales y L.C.",
            children:  <ListaPreciosV3 /> 
        },
        {
            key:"2",
            label:"Otros",
            children: <ListaPreciosMayorista />
        },
    ]
    return idf_optica==3 ? <ListaPreciosV4 editable={true} /> :  <Tabs items={items} defaultActiveKey="1" onChange={_=>{}}/>
} 


ListaPreciosAdmin.PageLayout = LayoutAdmin;  