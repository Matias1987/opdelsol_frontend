import SubGroupSelect from "@/components/SubGroupSelect";
import React from "react";

export default function SelectCode(){
    return (
        <SubGroupSelect callback={(id)=>{alert("subgrupo seleccionado: " + id)}} />
    )
}

