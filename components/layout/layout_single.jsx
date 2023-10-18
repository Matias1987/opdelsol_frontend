import { Layout } from "antd";

export default function LayoutSingle({children}){
    const { Content } = Layout;
    return (
        <Layout className='layout'>
            <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
                {children}
            </Content>
        </Layout>
    )
}