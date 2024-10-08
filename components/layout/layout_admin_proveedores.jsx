import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Layout } from "antd";
import { useEffect } from "react";
import globals from "@/src/globals";
import HeaderSol from "./header";
import MenuAdminTop from "./menu_admin";
import MenuAdminProveedores from "./menu_admin_proveedores";

export default function layout_admin_proveedores({children}){
    const { Content } = Layout;
    const { getItem } = useStorage();
    const validate_user = () => {

        const _token = getItem("token",'session')

        if(_token === typeof 'undefined' ){
            alert("Debe Iniciar Sesion")
            window.location.replace(public_urls.login)
        }

        var _t = setTimeout(() => {

            if(_t !== typeof 'undefined'){
                //console.log("clear timeout")
                clearTimeout(_t)
            }
            fetch(get.check_login+_token)
            .then(response=>response.json())
            .then((response)=>{ 
                if(response.data.logged=='0'){
                    alert("Debe Iniciar Sesion")
                    window.location.replace(public_urls.login)
                }
                else{
                    //console.log("user validated")
                    validate_user();
                }

            })
            
        }, 2000);
    }
  useEffect(()=>{
    //console.log("run user effect")

    if(!globals.esUsuarioAdminProv())
    {
        window.location.replace(public_urls.modo)
    }
    
    validate_user()
  },[])
    return (
        <Layout style={{minHeight: 1200}}>
                <HeaderSol tipoCuenta="ADMIN" displaymodechange={()=>{
                    props?.displaymodechange?.()
                }}/>
                <MenuAdminProveedores />
  
            <Content style={{ margin: '40px 100px', padding: 24, overflowY:'scroll' }}>
                {children}
            </Content>
        </Layout>
    )
}