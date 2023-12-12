  import LayoutSingleLogedIn from "@/components/layout/layout_single_logedin";
  import globals from "@/src/globals";
  import { get, public_urls } from "@/src/urls";
import { getItem } from "localforage";
  import { useEffect, useState } from "react";

  const { Space, Card, Button } = require("antd");

  export default function Modo(){

    const [permisos, setPermisos] = useState(null)
    const [redirecting, setRedirecting] = useState(false)

    useEffect(()=>{
      setPermisos(p => {
        const _t = {
          esUsuarioDeposito: globals.esUsuarioDeposito(),
          esUsuarioDepositoMin: globals.esUsuarioDepositoMin(),
          esUsuarioVentas: globals.esUsuarioVentas(),
          esUsuarioCaja1: globals.esUsuarioCaja1(),
          esUsuarioLaboratorio: globals.esUsuarioLaboratorio(),
          esUsuarioAdmin: globals.esUsuarioAdmin(),
          esUsuarioAdminMin: globals.esUsuarioAdminMin(),
        }
        return _t
      })

      /**
       * if the user is only ventas or caja, redirect
       */

      const stay = globals.esUsuarioDeposito() || globals.esUsuarioLaboratorio() || globals.esUsuarioAdmin() || globals.esUsuarioAdminMin();
      globals.establecerUserSoloVentaCaja(!stay)
      setRedirecting(!stay)
      if(!stay)
      {
        if(globals.esUsuarioVentas() || globals.esUsuarioCaja1())
        {
          if(globals.esUsuarioVentas())
          {
            window.location.replace(public_urls.dashboard_venta)
          }
          else{
            window.location.replace(public_urls.dashboard_caja)
          }
          
        }
      }

    },[])


   /* const button_style_default = {
      background: "rgb(238,174,202)",
      background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      marginTop: "1em",
      color: "#1C4D8E",
      fontWeight: "bold",
    }*/
    /*const button_style_default = {
      background: "rgb(28,77,142)",
      background: "linear-gradient(90deg, rgba(28,77,142,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
      marginTop: "1em",
      color: "#FCE4C5",
      fontWeight: "bold",
    }*/
    /*const button_style_default = {
      background: "rgb(4,126,217)",
      background: "linear-gradient(90deg, rgba(4,126,217,1) 0%, rgba(46,71,89,1) 59%)",
      marginTop: "1em",
      color: "#DACDBA",
      fontWeight: "bold",
    }*/
    const button_style_default = {
      background: "rgb(184,203,217)",
      background: "radial-gradient(circle,  rgba(218,205,186,1) 0%,  rgba(184,203,217,1) 100%)",
      marginTop: "1em",
      color: "#284459",
      //fontWeight: "bold",
    }

    const button_style_danger = {
      background: "rgb(28,77,142)",
      background: "radial-gradient(circle, rgba(199,0,0,1) 0%, rgba(252,70,70,1) 100%)",
      marginTop: "1em",
      color: "white",
      //fontWeight: "bold",
    }

    const buttons = () => (
      permisos == null ? <></> :
      <>
        {(permisos.esUsuarioDeposito || permisos.esUsuarioDepositoMin)?
          <>
          <Button 
          shape="round"
          type="primary" onClick={(e)=>{
            window.location.replace(public_urls.dashboard_deposito)
          }} 
          style={button_style_default} 
          size="large" 
          block>Dep&oacute;sito</Button>
          </>
          :<></>
        }
        {
        permisos.esUsuarioVentas?
        <>
        <Button 
        shape="round"
        type="primary" onClick={(e)=>{
          window.location.replace(public_urls.dashboard_venta)
        }} 
        style={button_style_default} 
        size="large" 
        block>Ventas</Button>
        </>
        :<></>
        }
        {
        permisos.esUsuarioCaja1?
        <>
          <Button 
          shape="round"
          type="primary" onClick={(e)=>{
            window.location.replace(public_urls.dashboard_caja)
          }} 
          style={button_style_default} 
          size="large" 
          block>
          Caja
          </Button>
        </>
        :<></>
        }
        {
        permisos.esUsuarioLaboratorio?
        <>
          <Button 
          shape="round"
          type="primary" onClick={(e)=>{
            window.location.replace(public_urls.dashboard_laboratorio)
          }} 
          style={button_style_default} 
          size="large" 
          block>
          Laboratorio
          </Button>
        </>
        :<></>
        
        }
        {
        permisos.esUsuarioAdmin?
        <>
          <Button 
          shape="round"
          type="primary" onClick={(e)=>{
            window.location.replace(public_urls.dashboard_admin)
          }} 
          style={button_style_default} 
          size="large" 
          block>
          Admin
          </Button>
        </>
        :<></>
        
        }
        {
        globals.userLogedIn() ? 
        <>
          <Button 
          shape="circle"
          type="primary" 
          danger 
          size="large" 
          style={button_style_danger}
          onClick={()=>{
            const _token = getItem("token",'session')
      
            fetch(get.logout + _token)
            .then(response=>response.json())
            .then((response)=>{
                window.location.replace(public_urls.login);
            })
          }}>Salir
          </Button>
        </>
        :<></>
        }
        </>
    )

    return (
     
<>
<Card title="" size="small" style={{paddingLeft:"40%", paddingRight:"40%"}} >
        {
        redirecting? <></> : buttons()
        }
        
      </Card>
    <Space
      direction="vertical"
      size="large"
      style={{
        display: 'flex',
      }}
    >
      
    </Space>
</>
    )
  }

  Modo.PageLayout = LayoutSingleLogedIn;  