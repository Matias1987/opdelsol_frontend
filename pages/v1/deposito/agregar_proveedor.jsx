import ProveedorForm from "@/components/forms/ProveedorForm";
const urls = require("../../../src/urls")
const AgregarProveedor = () => {
    let handleSubmit = async (data) => {
        alert(JSON.stringify({nombre: "a", cuit: "a"}));
        try {
          let res = await fetch(urls.post.insert.proveedor, {

            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({nombre: "a", cuit: "a"})
            
          });
            let resJson = await res.json();
            if (resJson.status === 'OK') {
                alert("Proveedor agregado.")
            } else {
                alert("Some error occured");
            }
        }catch (err) {
            console.log(err);
          }
        }
    return(
        <>
        <h1>Agregar Proveedor</h1>
        <ProveedorForm onSubmit={
           (data)=>{
            handleSubmit(data)
           } 
        } />
        </>
        
    )
}

export default AgregarProveedor;