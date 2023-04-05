import GrupoSelect from "@/components/GrupoSelect";
import LoadSelect from "@/components/LoadSelect";
import SubFamiliaSelect from "@/components/SubFamiliaSelect";
import SubGroupSelect from "@/components/SubGroupSelect";
import { Button, Divider, Form, Input, Select } from "antd";
import { useState } from "react";

export default function ModificarPreciosCategoria(){
    const [categoria, setCategoria] = useState("");

    const show_select = () => {

        switch (categoria){
            case "familia": return (<LoadSelect callback={(v)=>{}} />)
            case "subfamilia": return (<SubFamiliaSelect callback={(v)=>{}} />)
            case "grupo": return (<GrupoSelect callback={(v)=>{}} />)
            case "subgrupo": return (<SubGroupSelect callback={(v)=>{}} />)
            default: return (<><i>Seleccione Categor&iacute;a</i></>)
        }

    }


    return (
        <>
        <h1>Cambiar Multiplicador Categor&iacute;a</h1>
        <Divider />
        <Form>
            <Form.Item
            name={"categoria"}
            label={"Categoría"}
            >
                <Select
                style={{width:200}}
                onChange={(val)=>{
                    setCategoria(val)
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
            </Form.Item>

            <Form.Item
            name={"fkcategoria"}
            label={"Seleccione:"}
            >
                {show_select()}
            </Form.Item>
            <Form.Item
            label={"Multiplicador"}
            name={"multiplicador"}
            >
                <Input type="number" style={{width:100}} step={.01} min={1} value={1}/>
            </Form.Item>
            <Form.Item>
                <>
                    <Divider />
                    <Button>Aceptar</Button>
                </>
                
            </Form.Item>
        </Form>

      
        </>
    )

}