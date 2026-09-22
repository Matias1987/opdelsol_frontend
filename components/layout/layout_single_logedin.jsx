import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Layout } from "antd";
import { useEffect } from "react";

export default function LayoutSingleLogedIn(props){
    const { Content } = Layout;


    return (
        <Layout className='layout'>
            <Content style={{ margin: '24px 16px', padding: 24,  minHeight: 280 }}>
                {props.children}
            </Content>
        </Layout>
    )
}