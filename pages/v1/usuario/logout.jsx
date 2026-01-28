import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { useEffect } from "react";
export default function LogoutPage() {
useEffect(()=>{
        const { getItem } = useStorage();
    const _token = getItem("token",'session')

    fetch(get.logout + _token)
    .then(response=>response.json())
    .then((response)=>{
        //registrar_evento("USER_LOGOUT", "Cierre de sesion",globals.obtenerUID() )
        //window.location.replace(public_urls.login);
        //router.push("/v1/usuario/login/login");
    })
    .catch(err=>{console.log("error")})
},[])
return(<div>Logging out...</div>)
}