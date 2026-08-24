import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import {Layout} from "antd";
import { useEffect } from "react";
import globals from "@/src/globals";
import { idf_optica } from "@/src/config";
import dynamic from "next/dynamic";

const MenuLaboratorioTop = dynamic(
  () => import("./menu_laboratorio_top"),
  {
    ssr: false,
    loading: () => <div style={{ height: "30px" }}>...</div>,
  },
);

const MenuTallerCOExp = dynamic(
  () => import("./opts/coexp/menu_taller"),
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

export default function LayoutLaboratorio(props){
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
            .catch((err)=>{
                console.log("error validating user", err);
                validate_user();
            });
            
        }, 20000);
    }
  useEffect(()=>{
    if(!globals.esUsuarioLaboratorio())
    {
        window.location.replace(public_urls.modo)
    }
    validate_user()
  },[])
    return (
        <Layout className='layout'>
           
            {+idf_optica!=3?  <MenuLaboratorioTop /> : <MenuTallerCOExp />}
            <Content style={{ margin: '20px 10px', padding: 10, minHeight: 280 }}>
                {props.children}
            </Content>
        </Layout>
    )
}