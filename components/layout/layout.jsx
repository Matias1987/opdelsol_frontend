import React, { useState } from 'react';
import { Layout, Menu, Icon, Button, Image } from 'antd';
import SideMenu from './sidemenu';
import TestMenu from './menu_test';
import { EyeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useEffect } from 'react'
import useStorage from "../../useStorage";
import { get, public_urls } from '@/src/urls';
import SucursalLabel from '../sucursal_label';
import globals from '@/src/globals';


export default function MyLayout({children}){
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {}
    //return (<>Hello</>)

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
            <Layout className='layout' style={{height:"100hv"}}>
                <Sider width={"auto"} style={{padding:"20px",  overflowY:"scroll"}} collapsed={collapsed}>
                    <div className="logo" style={{padding:".45em", textAlign:"center" }}>
                        <span style={{color:"rgba(255,255,255,1)"}}><b>Optica del Sol</b>&nbsp;&nbsp;</span>
                    </div>
                    {/*SideMenu */}
                    <TestMenu />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        
                    <span style={{padding:'1em'}}>
                        <i>
                            Sucursal:&nbsp;&nbsp;<SucursalLabel idsucursal={
                                globals.obtenerSucursal()
                                } />
                            &nbsp;- Cuenta: DEP&Oacute;SITO
                            &nbsp;- Usuario: NOMBRE
                        </i>
                    </span>
                    {/*React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                    })*/}
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
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, overflowY:"scroll"  }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
    )
}