import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"
import { Row, Col, Input, Button, Modal } from "antd"
import { useEffect, useState } from "react"
import SubGrupoFormV3 from "./SubgrupoFormV3"

const EditarSubgrupo = (props) => {
    const [open, setOpen] = useState(false)

    /*useEffect(()=>{
        
    },[])

    const load = () => {
        fetch(get.obtener_detalle_subgrupo + props.idsubgrupo)
        .then(r=>r.json())
        .then((response)=>{
            
            setPrecio(response.data[0].precio_defecto)
            setComentarios(response.data[0].comentarios)
            setNombreCorto(response.data[0].nombre_corto)
            setNombreLargo(response.data[0].nombre_largo)
        })
        .catch(e=>{console.log("error")})
    }

    const actualizar = () => {
        post_method(post.update.subgrupo_2,
            {
                idsubgrupo: props.idsubgrupo,
                precio_defecto: precio,
                comentarios: comentarios,
            },
            (resp)=>{
                alert("Ok")
                
                props?.callback?.()
                setOpen(false)
            })
    }*/
    return <>
        <Button 
        style={{fontSize:".75em", maxWidth:"90px", padding:"1px", overflow:"hidden", wordBreak:"break-all", wordWrap:"break-word", height:"auto", textAlign:"center"}} 
        disabled={!globals.esUsuarioDeposito()&&!globals.esUsuarioAdmin()} 
        danger 
        size="small" 
        onClick={()=>{ setOpen(true); }  }>
            {props.buttonText}
        </Button>
        <Modal destroyOnClose footer={null} title={`Editar Subgrupo ${props.title||" "}`} open={open} onCancel={()=>{setOpen(false)}}>
            <SubGrupoFormV3 idsubgrupo={props.idsubgrupo} callback={()=>{setOpen(false); props?.callback?.()}} />
        </Modal>
    </>
}

export default EditarSubgrupo