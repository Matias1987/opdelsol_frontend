import React, { useState } from 'react';
import { Layout} from 'antd';
import TestMenu from './menu_test';
import { useEffect } from 'react'
import useStorage from "../../useStorage";
import { get, public_urls } from '@/src/urls';
import globals from '@/src/globals';
import HeaderSol from './header';
import MenuV2 from './menu_v2';


export default function MyLayout(props){
    const { Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
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
            
        }, 2000);
    }
  useEffect(()=>{
    console.log("run user effect")
    validate_user()
    setUDepositoMin(globals.esUsuarioDepositoMin())
    setUDeposito(globals.esUsuarioDeposito())
  },[])
    
    
    
    return (
            <Layout className='layout' >
                <Sider width={"auto"} collapsed={collapsed} style={{backgroundColor:'#262626'}}>
                    {<div className="logo" style={{padding:".45em", textAlign:"center", height:"36px" }}>
                        <span style={{color:"rgba(255,255,255,1)"}}><b></b>&nbsp;&nbsp;</span>
                        
                    </div>}
                    {uDeposito?<>
                        <TestMenu />
                    </>:
                    uDepositoMin?<>
                        <MenuV2 mode="vertical"/>
                    </>:<></>
                    }
                </Sider>
                <Layout>

                    <HeaderSol tipoCuenta="DEPOSITO" displaymodechange={(c)=>{
                        props?.displaymodechange?.(c)
                    }}/>

                    <Content style={{ margin: '24px 16px', padding: 24, minHeight: "100hv"  }}>
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
    )
}