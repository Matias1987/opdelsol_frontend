
import { Layout} from 'antd';
import { useEffect, useState } from 'react'
import useStorage from "../../useStorage";
import { get, public_urls } from '@/src/urls';
import globals from '@/src/globals';
import { Content } from 'antd/es/layout/layout';
import dynamic from 'next/dynamic';

const TestMenu = dynamic(
  () => import("./menu_test"),
  {
    ssr: false,
    loading: () => <div style={{ height: "30px" }}>...</div>,
  },
);
const MenuV2 = dynamic(
  () => import("./menu_v2"),
  {
    ssr: false,
    loading: () => <div style={{ height: "30px" }}>...</div>,
  },
);
const HeaderSol = dynamic(
  () => import("./header"),
  {
    ssr: false,
    loading: () => <div style={{ height: "30px" }}>...</div>,
  },
);

export default function MyLayout(props){
    const [uDepositoMin, setUDepositoMin] = useState(false)
    const [uDeposito, setUDeposito] = useState(false)
    const { getItem } = useStorage();

    const validate_user = () => {

        if(!globals.esUsuarioDeposito() && !globals.esUsuarioDepositoMin())
        {
            window.location.replace(public_urls.modo)
        }

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
                    console.log("user loged in")
                    //_t  = validate_user();
                    validate_user();
                }

            })
            
        }, 10000);
    }
  useEffect(()=>{
    console.log("run user effect")
    validate_user()
    setUDepositoMin(globals.esUsuarioDepositoMin())
    setUDeposito(globals.esUsuarioDeposito())
  },[])
    
    
    
    return (
            <Layout className='layout' >

                <Layout>

                    {/*<HeaderSol tipoCuenta="DEPOSITO" displaymodechange={(c)=>{
                        props?.displaymodechange?.(c)
                    }}/>*/}
                    {uDeposito?<>
                        <TestMenu />
                    </>:
                    uDepositoMin?<>
                        <MenuV2/>
                    </>:<></>
                    }

                    <Content style={{ margin: '24px 16px', padding: 24, minHeight: "100hv"  }}>
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
    )
}