import { Layout } from "antd";

export default function LayoutSingle(props){
    const { Content } = Layout;
    return (
        <Layout >
            <Content>
                {props.children}
            </Content>
        </Layout>
    )
} 