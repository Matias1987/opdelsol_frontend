  import LayoutSingleLogedIn from "@/components/layout/layout_single_logedin";
  import globals from "@/src/globals";
  import { get, public_urls } from "@/src/urls";
import { getItem } from "localforage";
  import { useEffect, useState } from "react";

  import { Space, Card, Button, Col, Row } from "antd";

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

      let permisos_count = 0;
      permisos_count += (globals.esUsuarioAdmin() ? 1:0) + 
                        (globals.esUsuarioCaja1() ? 1 : 0) + 
                        (globals.esUsuarioVentas()? 1:0 ) +
                        (globals.esUsuarioLaboratorio()? 1:0) +
                        (globals.esUsuarioCaja2()?1:0) +
                        (globals.esUsuarioAdminMin()?1:0)+
                        (globals.esUsuarioDeposito()?1:0)+
                        (globals.esUsuarioDepositoMin()?1:0)



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
          return
        }
      }
      //alert(permisos_count)

      if(permisos_count>1)
        {
          return
        }
      
      setRedirecting(true)

      if(globals.esUsuarioAdmin())
      {
        window.location.replace(public_urls.dashboard_admin)
        return
      }

      if(globals.esUsuarioVentas())
      {
        window.location.replace(public_urls.dashboard_venta)
        return
      }
      
      if(globals.esUsuarioCaja1()){

        window.location.replace(public_urls.dashboard_caja)
        return

      }

      if(globals.esUsuarioLaboratorio()){

        window.location.replace(public_urls.dashboard_laboratorio)
        return

      }
      if(globals.esUsuarioDepositoMin()){

        window.location.replace(public_urls.dashboard_deposito)
        return

      }
      if(globals.esUsuarioDeposito()){

        window.location.replace(public_urls.dashboard_deposito)
        return

      }

     

     

      /**
       * if the user is only ventas or caja, redirect
       */

      /*const stay = globals.esUsuarioDeposito() || globals.esUsuarioLaboratorio() || globals.esUsuarioAdmin() || globals.esUsuarioAdminMin();
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
      }*/

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
      /*background: "rgb(184,203,217)",
      background: "radial-gradient(circle,  rgba(218,205,186,1) 0%,  rgba(184,203,217,1) 100%)",
      marginTop: "1em",
      color: "#284459",*/
      //fontWeight: "bold",
    }

    const button_style_danger = {
      /*background: "rgb(28,77,142)",
      background: "radial-gradient(circle, rgba(199,0,0,1) 0%, rgba(252,70,70,1) 100%)",
      marginTop: "1em",
      color: "white",*/
      //fontWeight: "bold",
    }

    const row_style = {
      padding:"1em"
    }

    const buttons = () => (
      permisos == null ? <></> :
      <>
        {(permisos.esUsuarioDeposito || permisos.esUsuarioDepositoMin)?
          <>
          <Row style={row_style}>
            <Col span={24}>
                <Button 
              shape="round"
              type="primary" onClick={(e)=>{
                window.location.replace(public_urls.dashboard_deposito)
              }} 
              style={button_style_default} 
              size="large" 
              block>Dep&oacute;sito</Button>
            </Col>
          </Row>
          
          </>
          :<></>
        }
        {
        permisos.esUsuarioVentas?
        <>
          <Row style={row_style}>
            <Col span={24}>
                <Button 
            shape="round"
            type="primary" onClick={(e)=>{
              window.location.replace(public_urls.dashboard_venta)
            }} 
            style={button_style_default} 
            size="large" 
            block>Ventas</Button>
            </Col>
          </Row>
        
        </>
        :<></>
        }
        {
        permisos.esUsuarioCaja1?
        <>
          <Row style={row_style}>
            <Col span={24}>
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
            </Col>
          </Row>
          
        </>
        :<></>
        }
        {
        permisos.esUsuarioLaboratorio?
        <>
          <Row style={row_style}>
            <Col span={24}>
                <Button 
              shape="round"
              type="primary" onClick={(e)=>{
                window.location.replace(public_urls.dashboard_laboratorio)
              }} 
              style={button_style_default} 
              size="large" 
              block>
              Dep. Cristales
              </Button>
            </Col>
          </Row>
          
        </>
        :<></>
        
        }
        {
        permisos.esUsuarioAdmin?
        <>
          <Row style={row_style}>
            <Col span={24}>
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
            </Col>
          </Row>
          
        </>
        :<></>
        
        }
        {
        globals.userLogedIn() ? 
        <>
        <Row style={row_style}>
          <Col span={24}>
            <Button 
            block
            shape="round"
            type="primary" 
            danger 
            size="small" 
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
          </Col>
        </Row>
          
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