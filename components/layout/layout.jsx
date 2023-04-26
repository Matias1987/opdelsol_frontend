import React from 'react';
import { Layout, Menu, Icon, Button, Image } from 'antd';
import SideMenu from './sidemenu';
import TestMenu from './menu_test';
import { EyeOutlined, LogoutOutlined } from '@ant-design/icons';
import { useEffect } from 'react'
import useStorage from "../../useStorage";
import { public_urls } from '@/src/urls';


export default function MyLayout({children}){
    const { Header, Sider, Content } = Layout;
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
            fetch("http://localhost:3000/api/v1/usuarios/l/checklogin/"+_token)
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
            
        }, 3000);
    }
  useEffect(()=>{
    console.log("run user effect")
    validate_user()
  },[])
    
    
    return (
            <Layout className='layout' style={{height:"100hv"}}>
                <Sider width={"auto"} style={{padding:"20px",  overflowY:"scroll"}}>
                    <div className="logo" style={{padding:".45em", textAlign:"center" }}>
                        <span style={{color:"rgba(255,255,255,1)"}}><b>Optica del Sol</b>&nbsp;&nbsp;</span>
                    </div>
                    {/*SideMenu */}
                    <TestMenu />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                    <Button type="link" onClick={()=>{
                        
                        const _token = getItem("token",'session')

                        fetch("http://localhost:3000/api/v1/usuarios/l/logout/" + _token)
                        .then(response=>response.json())
                        .then((response)=>{
                            //alert("Usuario is logged out")
                            window.location.replace("http://localhost:3001/v1/usuario/login/login");
                        })
                    }}>
                    <LogoutOutlined />Salir     
                    </Button>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, overflowY:"scroll"  }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
    )
}