import ProveedorForm from "@/components/forms/ProveedorForm";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";

const AgregarProveedor = () => {
    
    return(
        <>
        <h1>Agregar Proveedor</h1>
        <ProveedorForm onSubmit={
           (data)=>{
            //handleSubmit(data)
            post_method(post.insert.proveedor,data,(res)=>{
                if(res.status == "OK"){
                    if(res.data<0){
                        alert("El proveedor ya existe")
                    }
                    else{
                        alert("Proveedor Agregado")
                    }
                    
                }
            })
           } 
        } />
        </>
        
    )
}

export default AgregarProveedor;