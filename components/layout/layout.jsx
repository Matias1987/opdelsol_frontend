import React from 'react';
import { Layout, Menu, Icon, Button, Image } from 'antd';
import SideMenu from './sidemenu';
import TestMenu from './menu_test';
import { EyeOutlined, LogoutOutlined } from '@ant-design/icons';



export default function MyLayout({children}){
    const { Header, Sider, Content } = Layout;
    const toggle = () => {}
    //return (<>Hello</>)
    
    
    return (
            <Layout className='layout' style={{height:"auto"}}>
                <Sider width={240} style={{padding:"10px"}}>
                    <div className="logo" style={{padding:".45em"}}>
                        <span style={{color:"white"}}>Optica del Sol&nbsp;&nbsp;</span>
                    </div>
                    {/*SideMenu */}
                    <TestMenu />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                    <Button type="link" onClick={()=>{
                        fetch("http://localhost:3000/api/v1/usuarios/l/logout/")
                        .then(response=>response.json())
                        .then((response)=>{
                            alert("Usuario is loged out")
                            window.location.replace("http://localhost:3001/v1/usuario/login/login");
                        })
                    }}>
                    <LogoutOutlined />LogOut
                    </Button>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
    )
}