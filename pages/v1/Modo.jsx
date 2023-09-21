  import LayoutSingleLogedIn from "@/components/layout/layout_single_logedin";
  import globals from "@/src/globals";
  import { get, public_urls } from "@/src/urls";
import { getItem } from "localforage";
  import { useEffect, useState } from "react";

  const { Space, Card, Button } = require("antd");

  export default function Modo(){

    const [permisos, setPermisos] = useState(null)

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

    },[])

    const buttons = () => (
      permisos == null ? <></> :
      <>
        {(permisos.esUsuarioDeposito || permisos.esUsuarioDepositoMin)?
          <>
          <Button type="primary" onClick={(e)=>{
            window.location.replace(public_urls.dashboard_deposito)
          }} style={{marginTop:"1em", color:"white"}} size="large" block>Dep&oacute;sito</Button>
          </>
          :<></>
        }
        {
        permisos.esUsuarioVentas?
        <>
        <Button type="primary" onClick={(e)=>{
          window.location.replace(public_urls.dashboard_venta)
        }} style={{marginTop:"1em", color:"white"}} size="large" block>Ventas</Button>
        </>
        :<></>
        }
        {
        permisos.esUsuarioCaja1?
        <>
          <Button type="primary" onClick={(e)=>{
            window.location.replace(public_urls.dashboard_caja)
          }} style={{marginTop:"1em", color:"white"}} size="large" block>
          Caja
          </Button>
        </>
        :<></>
        }
        {
        permisos.esUsuarioLaboratorio?
        <>
          <Button type="primary" onClick={(e)=>{
            window.location.replace(public_urls.dashboard_laboratorio)
          }} style={{marginTop:"1em", color:"white"}} size="large" block>
          Laboratorio
          </Button>
        </>
        :<></>
        
        }
        {
        permisos.esUsuarioAdmin?
        <>
          <Button type="primary" onClick={(e)=>{
            window.location.replace(public_urls.dashboard_admin)
          }} style={{marginTop:"1em", color:"white"}} size="large" block>
          Admin
          </Button>
        </>
        :<></>
        
        }
        {
        globals.userLogedIn() ? 
        <>
          <Button type="primary" danger block size="small" style={{marginTop:"2em"}} onClick={()=>{
            const _token = getItem("token",'session')
      
            fetch(get.logout + _token)
            .then(response=>response.json())
            .then((response)=>{
                window.location.replace(public_urls.login);
            })
          }}>Salir</Button>
        </>
        :<></>
        }
        </>
    )

    return (
     

    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
    >
      <h4></h4>
      <Card title="" size="small" style={{paddingLeft:"30%", paddingRight:"30%"}}>
        {
        buttons()
        }
        
      </Card>
    </Space>

    )
  }

  Modo.PageLayout = LayoutSingleLogedIn;  