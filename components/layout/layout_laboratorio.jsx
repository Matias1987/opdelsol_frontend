import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Alert, Button, Layout } from "antd";
import { useEffect } from "react";
import globals from "@/src/globals";
import Alerts from "./alert_container";
import HeaderSol from "./header";
import MenuLaboratorioTop from "./menu_laboratorio_top";

export default function LayoutLaboratorio(props){
    const { Content } = Layout;

    const { getItem } = useStorage();
    const validate_user = () => {

        const _token = getItem("token",'session')

        if(_token === typeof 'undefined' ){
            //alert("Debe Iniciar Sesion")
            window.location.replace(public_urls.login)
        }

        var _t = setTimeout(() => {

            if(_t !== typeof 'undefined'){
                console.log("clear timeout")
                clearTimeout(_t)
            }
            fetch(get.check_login+_token)
            .then(response=>response.json())
            .then((response)=>{ 
                if(response.data.logged=='0'){
                    //alert("Debe Iniciar Sesion")
                    window.location.replace(public_urls.login)
                }
                else{
                    //_t  = validate_user();
                    validate_user();
                }
            })
            
        }, 2000);
    }
  useEffect(()=>{
    console.log("run user effect")

    if(!globals.esUsuarioLaboratorio())
    {
        window.location.replace(public_urls.modo)
    }
    
    validate_user()
  },[])
    return (
        <Layout className='layout'>
            <HeaderSol tipoCuenta="LABORATORIO" displaymodechange={(__c)=>{
                props?.displaymodechange?.(__c)
            }}/>
            <MenuLaboratorioTop />
            <Content style={{ margin: '40px 100px', padding: 24, minHeight: 280 }}>
                {props.children}
            </Content>
        </Layout>
    )
}