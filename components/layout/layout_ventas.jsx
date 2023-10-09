import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { LogoutOutlined } from "@ant-design/icons";
import { Alert, Button, Layout } from "antd";
import { useEffect } from "react";
import SucursalLabel from "../sucursal_label";
import globals from "@/src/globals";
import MenuVentasTop from "./menu_ventas_top";
import Alerts from "./alert_container";
import HeaderSol from "./header";

export default function LayoutVentas({children}){
    const { Header, Sider, Content } = Layout;

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
    //console.log("run user effect")
    if(!globals.esUsuarioVentas())
    {
        window.location.replace(public_urls.modo)
    }
    validate_user()
  },[])
    return (
        <Layout style={{backgroundColor: '#D3D3D3', padding:0}} className='layout'>
            <HeaderSol tipoCuenta="VENTAS" />
            <MenuVentasTop />
            <Content style={{ margin: '40px 100px', padding: 24, background: 'white', borderRadius:"15px", minHeight: 580 }}>
            {/*<Alerts />*/}
                {children}
            </Content>
        </Layout>
    )
}