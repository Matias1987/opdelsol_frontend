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
import MenuDepositoMinTop from './menu_deposito_min_top';
import MenuSideDepositoMin from './menu_side_desposito_min';
import { redirect } from 'next/dist/server/api-utils';
import HeaderSol from './header';


export default function MyLayout({children}){
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [uDepositoMin, setUDepositoMin] = useState(false)
    const [uDeposito, setUDeposito] = useState(false)
    const { getItem } = useStorage();

    const validate_user = () => {

        if(!globals.esUsuarioDeposito() && !globals.esUsuarioDepositoMin())
        {
            window.location.replace(public_urls.modo)
        }

        const _token = getItem("token",'session')

        if(_token === typeof 'undefined' ){
            alert("Debe Iniciar Sesion")
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
                    alert("Debe Iniciar Sesion")
                    window.location.replace(public_urls.login)
                }
                else{
                    console.log("user loged in")
                    //_t  = validate_user();
                    validate_user();
                }

            })
            
        }, 2000);
    }
  useEffect(()=>{
    console.log("run user effect")
    validate_user()
    setUDepositoMin(globals.esUsuarioDepositoMin())
    setUDeposito(globals.esUsuarioDeposito())
  },[])
    
    
    
    return (
            <Layout className='layout' style={{height:"100hv"}}>
                <Sider width={"auto"} style={{padding:"20px",  overflowY:"scroll"}} collapsed={collapsed}>
                    <div className="logo" style={{padding:".45em", textAlign:"center" }}>
                        <span style={{color:"rgba(255,255,255,1)"}}><b>Optica del Sol</b>&nbsp;&nbsp;</span>
                    </div>
                    {uDeposito?<>
                        <TestMenu />
                    </>:
                    uDepositoMin?<>
                        <MenuSideDepositoMin />
                    </>:<></>

                    }
                    
                    
                </Sider>
                <Layout>
                    <HeaderSol tipoCuenta="DEPOSITO" />
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, overflowY:"scroll"  }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
    )
}