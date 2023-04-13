import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default function LayoutSingle({children}){
    return (
        <Layout className='layout'>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                {children}
            </Content>
        </Layout>
    )
}