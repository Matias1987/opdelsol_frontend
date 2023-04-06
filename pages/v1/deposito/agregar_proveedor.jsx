import ProveedorForm from "@/components/forms/ProveedorForm";
const urls = require("../../../src/urls")
const post_helper = require("../../../src/helpers/post_helper")
const AgregarProveedor = () => {
    
    return(
        <>
        <h1>Agregar Proveedor</h1>
        <ProveedorForm onSubmit={
           (data)=>{
            //handleSubmit(data)
            post_helper.post_method(urls.post.insert.proveedor,data,(res)=>{
                if(res.status == "OK"){
                    alert("Proveedor Agregado")
                }
            })
           } 
        } />
        </>
        
    )
}

export default AgregarProveedor;