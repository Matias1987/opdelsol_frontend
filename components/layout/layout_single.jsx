import { Layout } from "antd";

export default function LayoutSingle(props){
    const { Content } = Layout;
    return (
        <Layout >
            <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, }}>
                {props.children}
            </Content>
        </Layout>
    )
} 