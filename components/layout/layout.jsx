import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import SideMenu from './sidemenu';



export default function MyLayout({children}){
    const { Header, Sider, Content } = Layout;
    const toggle = () => {}
    //return (<>Hello</>)
    
    
    return (
            <Layout className='layout'>
                <Sider>
                    <div className="logo" />
                    <SideMenu />
                </Sider>
                <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    {children}
                    </Content>
                </Layout>
            </Layout>
    )
}