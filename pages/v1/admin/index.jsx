import ResumenOperacionesRow from "@/components/admin/resumenOperacionesRow";
import InformeCaja from "@/components/informes/caja/InformeCaja";
import LayoutAdmin from "@/components/layout/layout_admin";
import { get } from "@/src/urls";
import { Modal } from "antd";
import { useEffect, useState } from "react";

export default function dashboard_admin(){
    const [sucursales, setSucursales] = useState([])
    const [idcaja, setIdCaja] = useState(-1)
    const [open, setOpen] = useState(false)
    var col = 0;
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
        sucursales.map(s=><ResumenOperacionesRow color={(++col%2==0?"#C4D5E7":"#E1E1E1")} idsucursal={s.idsucursal} nombre_sucursal={s.nombre} />)
    }
    
    </>
}

dashboard_admin.PageLayout = LayoutAdmin;  