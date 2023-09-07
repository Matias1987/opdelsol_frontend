import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { LogoutOutlined } from "@ant-design/icons";
import { Alert, Anchor, Button, Input, Layout } from "antd";
import { useEffect } from "react";
import SucursalLabel from "../sucursal_label";
import globals from "@/src/globals";
import MenuCajaTop from "./menu_caja_top";
import Alerts from "./alert_container";
import HeaderSol from "./header";

export default function LayoutCaja({children}){
    const { Header, Sider, Content } = Layout;

    var cnt=0;
    const { getItem } = useStorage();
    const validate_user = () => {

        const _token = getItem("token",'session')

        if(_token === typeof 'undefined' ){
            alert("Debe Iniciar Sesion")
            window.location.replace(public_urls.login)
        }

        console.log("validate_user" + cnt + " token: " + _token)
        cnt++;
        var _t = setTimeout(() => {

            if(_t !== typeof 'undefined'){
                console.log("clear timeout")
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
                    _t  = validate_user();
                }

            })
            
        }, 2000);
    }
  useEffect(()=>{
    console.log("run user effect")

    if(!globals.esUsuarioCaja1())
    {
        window.location.replace(public_urls.modo)
    }
    
    validate_user()
  },[])
    return (
        <Layout className='layout' style={{minHeight: 1200}}>
                <HeaderSol tipoCuenta="CAJA" />
                <MenuCajaTop />
  
            <Content style={{ margin: '40px 100px', padding: 24, background: '#fff', overflowY:'scroll' }}>
                {/*<Alerts />*/}
                {children}
            </Content>
        </Layout>
    )
}