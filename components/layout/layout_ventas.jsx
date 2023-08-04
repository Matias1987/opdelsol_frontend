import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { LogoutOutlined } from "@ant-design/icons";
import { Alert, Button, Layout } from "antd";
import { useEffect } from "react";
import SucursalLabel from "../sucursal_label";
import globals from "@/src/globals";
import MenuVentasTop from "./menu_ventas_top";

export default function LayoutVentas({children}){
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
    validate_user()
  },[])
    return (
        <Layout className='layout'>
            <Header style={{ background: '#fff', padding: 0 }}>
                        
                        <span style={{padding:'1em'}}>
                            <i>
                                Sucursal:&nbsp;&nbsp;<SucursalLabel idsucursal={
                                    globals.obtenerSucursal()
                                    } />
                                &nbsp;- Cuenta: VENTAS
                                &nbsp;- Usuario: NOMBRE
                            </i>
                        </span>
                        <Button type="link" onClick={()=>{
                            
                            const _token = getItem("token",'session')
    
                            fetch(get.logout + _token)
                            .then(response=>response.json())
                            .then((response)=>{
                                window.location.replace(public_urls.login);
                            })
                        }}>
                            
                        <LogoutOutlined />Salir     
                        </Button>
                        &nbsp;&nbsp;
                        <Button type="link" onClick={(e)=>{
                            window.location.replace(public_urls.modo);
                        }}>
                            Cambiar Modo
                        </Button>
                        </Header>
                        <MenuVentasTop />
            <Content style={{ margin: '40px 100px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Alert
                message="Caja de fecha anterior"
                description="Error Description Error Description Error Description Error Description Error Description Error Description"
                type="error"
                closable
                //onClose={onClose}
                />
                {children}
            </Content>
        </Layout>
    )
}