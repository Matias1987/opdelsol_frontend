import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Layout } from "antd";
import { useEffect } from "react";

export default function LayoutSingleLogedIn(props){
    const { Content } = Layout;

    const { getItem } = useStorage();
    const validate_user = () => {

        const _token = getItem("token",'session')

        if(_token === typeof 'undefined' ){
            //alert("Debe Iniciar Sesion")
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
                    //alert("Debe Iniciar Sesion")
                    window.location.replace(public_urls.login)
                }
                else{
                    //_t  = validate_user();
                    validate_user();
                }

            })
            
        }, 2000);
    }
  useEffect(()=>{
    console.log("run user effect")
    validate_user()
  },[])

    return (
        <Layout className='layout' style={{backgroundColor:"#003E8B"}}>
            <Content style={{ margin: '24px 16px', padding: 24,  minHeight: 280 }}>
                {props.children}
            </Content>
        </Layout>
    )
}