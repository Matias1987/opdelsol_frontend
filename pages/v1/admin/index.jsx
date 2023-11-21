import ResumenOperacionesRow from "@/components/admin/resumenOperacionesRow";
import LayoutAdmin from "@/components/layout/layout_admin";
import { get } from "@/src/urls";
import { useEffect, useState } from "react";

export default function dashboard_admin(){
    const [sucursales, setSucursales] = useState([])
    useEffect(()=>{
        fetch(get.sucursales)
        .then(response=>response.json())
        .then((response)=>{
            setSucursales(
                response.data.map(r=>({
                    nombre:r.nombre,
                    idsucursal:r.idsucursal,
                }))
            )
        })
    },[])
    return <>
     {
        sucursales.map(s=><ResumenOperacionesRow idsucursal={s.idsucursal} />)
     }
    </>
}

dashboard_admin.PageLayout = LayoutAdmin;  