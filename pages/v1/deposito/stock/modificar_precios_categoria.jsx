import SubGroupSelect from "@/components/SubGroupSelect";
import { Select } from "antd";
import { useState } from "react";

export default function ModificarPreciosCategoria(){
    const [idSubgrupo,setIdSubgrupo] = useState(-1)


    return (
        <>
        <h1>Cambiar Multiplicador Subgrupo</h1>
        <label>Seleccione Subgrupo:</label>
        <Select
        onChange={(val)=>{

        }}
        options={[
            {
                label: "Familia",
                value: "familia"
            },
            {
                label: "SubFamilia",
                value: "subfamilia"
            },
            {
                label: "Grupo",
                value: "grupo"
            },
            {
                label: "SubGrupo",
                value: "subgrupo"
            },
        ]}
        />

        <SubGroupSelect callback={
            (id)=>{
                alert(id)
            }
        }
        />
        </>
    )

}