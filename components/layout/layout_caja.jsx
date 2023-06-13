import { Layout } from "antd";

export default function LayoutCaja({children}){
    const { Content } = Layout;
    return (
        <Layout className='layout'>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                {children}
            </Content>
        </Layout>
    )
}