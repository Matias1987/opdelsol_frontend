import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Layout } from "antd";
import { useEffect } from "react";
import globals from "@/src/globals";
import HeaderSol from "./header";
import MenuAdminTop from "./menu_admin";
import { idf_optica } from "@/src/config";
import MenuAdminSolParana from "./opts/sol_parana/menu_admin";
import MenuAdminCOExp from "./opts/coexp/menu_admin";

export default function LayoutAdmin({children}){
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

    if(!globals.esUsuarioAdmin())
    {
        window.location.replace(public_urls.modo)
    }
    
    validate_user()
  },[])

  const menu = _ =>{
    switch(idf_optica)
    {
        case 1: return <MenuAdminTop />;
        case 2: return <MenuAdminSolParana />
        case 3: return <MenuAdminCOExp /> 
    }
  }

    return (
        <Layout style={{minHeight: 1200}}>
                <HeaderSol tipoCuenta="ADMIN" displaymodechange={()=>{
                    props?.displaymodechange?.()
                }}/>
          {menu()}
  
            <Content style={{ margin: '40px 100px', padding: 24}}>
                {children}
            </Content>
        </Layout>
    )
}