import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Alert,  Input,  Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import HeaderSol from "./header";
import MenuV2 from "./menu_v2";
import PopupResultadoBusqueda from "../precios/PopupResultadoBusqueda";
import BarraResumenCaja from "../forms/caja/BarraResumenCaja";

export default function LayoutCaja(props){
    const { Header, Sider, Content } = Layout;

    const { getItem } = useStorage();
    const [alerta, setAlerta] = useState("")

    const [busqueda, setBusqueda] = useState("")
    const [popupBusquedaOpen, setPopupBusquedaOpen] = useState(false)
    const onSearch = (value) => {
        if(value.trim().length<1)
        {
            return;
        }
        setBusqueda(value)
        setPopupBusquedaOpen(true)
    }

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
                    console.log("user validated")
                    //_t  = validate_user();
                    validate_user();
                }

            })

            //check if caja is closed, if so, then check whether it is open now
            fetch(get.caja_abierta + globals.obtenerSucursal())
                .then(r=>r.json())
                .then((response)=>{
                    //if caja is open, set this value in local
                    if(typeof response.data !== 'undefined')
                    {
                        //alert(JSON.stringify(response))
                        if(response.data!=null)
                        {
                            if(+response.data.abierta==1)
                            {
                                globals.setCajaOpen(true)
                                setAlerta(+response.data.current==1 ? "" : "Caja Desactualizada")
                            }
                            else
                            {
                                //alert("caja cerrada")
                                setAlerta("CAJA CERRADA")
                            }
                        }
                    }
                })
            
        }, 2000);
    }
  useEffect(()=>{
    //console.log("run user effect")

    if(!globals.esUsuarioCaja1())
    {
        window.location.replace(public_urls.modo)
    }
    
    validate_user()
    //globals.validate_user(window)
  },[])
    return (
        <Layout className='layout' >

                <HeaderSol tipoCuenta="CAJA" displaymodechange={(__c)=>{
                props?.displaymodechange?.(__c)
                    }}/>
                {/*<MenuCajaTop />*/}
                {<MenuV2 />}
                <Menu 
                items={[{
                    label:<Input.Search style={{padding:"6px"}} 
                    prefix={<span style={{fontWeight:"bold", backgroundColor:"lightyellow"}}>
                    Buscar Código:&nbsp;&nbsp;&nbsp;</span>} 
                    value={busqueda} 
                    onChange={(e)=>{setBusqueda(e.target.value)}} onSearch={onSearch} 
                    />

                }]}
                />
                <BarraResumenCaja />
                {
                    (alerta!="") ? <><Alert key={alerta} message={alerta} type="error" showIcon/></>:<></>
                }
            <Content style={{ margin: '10px 100px', padding: "6px", borderRadius:"15px" }}>
                
                {props.children}
                {/*<Chat />*/}
                <PopupResultadoBusqueda open = {popupBusquedaOpen} busqueda = {busqueda} callback={()=>{setPopupBusquedaOpen(false); setBusqueda("");} }  />
            </Content>
        </Layout>
    )
}