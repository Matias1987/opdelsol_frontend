  import LayoutSingleLogedIn from "@/components/layout/layout_single_logedin";
  import globals from "@/src/globals";
  import { get, public_urls } from "@/src/urls";
import { getItem } from "localforage";
  import { useEffect, useState } from "react";

  const { Space, Card, Button } = require("antd");

  export default function Modo(){

    const [permisos, setPermisos] = useState(null)

    useEffect(()=>{
      //alert(globals.esUsuarioDeposito())
      //alert(globals.esUsuarioDepositoMin())
      //alert(globals.esUsuarioVentas())
      //alert(globals.esUsuarioCaja1())
      setPermisos(p => {
        const _t = {
          esUsuarioDeposito: globals.esUsuarioDeposito(),
          esUsuarioDepositoMin: globals.esUsuarioDepositoMin(),
          esUsuarioVentas: globals.esUsuarioVentas(),
          esUsuarioCaja1: globals.esUsuarioCaja1(),
          esUsuarioLaboratorio: globals.esUsuarioLaboratorio(),
        }
        //alert(JSON.stringify(_t))
        return _t
      })

    },[])

    const buttons = () => (
      permisos == null ? <></> :
      <>
        {(permisos.esUsuarioDeposito || permisos.esUsuarioDepositoMin)?
          <>
          <Button onClick={(e)=>{
            window.location.replace(public_urls.dashboard_deposito)
          }} style={{marginTop:"1em", color:"green"}} size="large" block>Dep&oacute;sito</Button>
          </>
          :<></>
        }
        {
        permisos.esUsuarioVentas?
        <>
        <Button onClick={(e)=>{
          window.location.replace(public_urls.dashboard_venta)
        }} style={{marginTop:"1em", color:"blue"}} size="large" block>Ventas</Button>
        </>
        :<></>
        }
        {
        permisos.esUsuarioCaja1?
        <>
          <Button onClick={(e)=>{
            window.location.replace(public_urls.dashboard_caja)
          }} style={{marginTop:"1em", color:"red"}} size="large" block>
          Caja
          </Button>
        </>
        :<></>
        }
        {
        permisos.esUsuarioLaboratorio?
        <>
          <Button onClick={(e)=>{
            window.location.replace(public_urls.dashboard_laboratorio)
          }} style={{marginTop:"1em", color:"darkgoldenrod"}} size="large" block>
          Laboratorio
          </Button>
        </>
        :<></>
        }
        </>
    )

    return (<Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
    >
      <h4>Bienvenido</h4>
      <Card title="Seleccione Modo" size="small" style={{paddingLeft:"5em", paddingRight:"5em"}}>
        {
        buttons()
        }
        <Button danger block size="small" style={{marginTop:"2em"}} onClick={()=>{
          const _token = getItem("token",'session')
    
          fetch(get.logout + _token)
          .then(response=>response.json())
          .then((response)=>{
              window.location.replace(public_urls.login);
          })
        }}>Salir</Button>
      </Card>
    </Space>)
  }

  Modo.PageLayout = LayoutSingleLogedIn;  