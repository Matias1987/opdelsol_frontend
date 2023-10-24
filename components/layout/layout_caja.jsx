import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { LogoutOutlined } from "@ant-design/icons";
import { Alert, Anchor, Button, Input, Layout } from "antd";
import { useEffect, useState } from "react";
import SucursalLabel from "../sucursal_label";
import globals from "@/src/globals";
import MenuCajaTop from "./menu_caja_top";
import Alerts from "./alert_container";
import HeaderSol from "./header";
import Chat from "../chat/chat";

export default function LayoutCaja(props){
    const { Header, Sider, Content } = Layout;

    const { getItem } = useStorage();
    const [alerta, setAlerta] = useState("")

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
                    console.log("user validated")
                    //_t  = validate_user();
                    validate_user();
                }

            })

            //check if caja is closed, if so, then check whether it is open now
            fetch(get.caja_abierta + globals.obtenerSucursal())
                .then(r=>r.json())
                .then((response)=>{
                    //if caja is open, set this value in local
                    if(typeof response.data !== 'undefined')
                    {
                        //alert(JSON.stringify(response))
                        if(response.data!=null)
                        {
                            if(+response.data.abierta==1)
                            {
                                globals.setCajaOpen(true)
                                setAlerta(+response.data.current==1 ? "" : "Caja Desactualizada")
                            }
                            else
                            {
                                //alert("caja cerrada")
                                setAlerta("CAJA CERRADA")
                            }
                        }
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
    //globals.validate_user(window)
  },[])
    return (
        <Layout className='layout' style={{minHeight: 1200}}>
                <HeaderSol tipoCuenta="CAJA" displaymodechange={(__c)=>{
                props?.displaymodechange?.(__c)
            }}/>
                <MenuCajaTop />
  
            <Content style={{ margin: '40px 100px', padding: 24, borderRadius:"15px", overflowY:'scroll' }}>
                {
                    (alerta!="") ? <><Alert key={alerta} message={alerta} type="error" showIcon/></>:<></>
                }
                {props.children}
                {/*<Chat />*/}
            </Content>
        </Layout>
    )
}