import LayoutSingleLogedIn from "@/components/layout/layout_single_logedin";
import globals from "@/src/globals";
import { public_urls } from "@/src/urls";

const { Space, Card, Button } = require("antd");

export default function Modo(){
  return (<Space
    direction="vertical"
    size="middle"
    style={{
      display: 'flex',
    }}
  >
    <h4>Bienvenido</h4>
    <Card title="Seleccione Modo" size="small" >
      {
      globals.esUsuarioDeposito() || globals.esUsuarioDepositoMin()?
        <>
        <Button onClick={(e)=>{
          window.location.replace(public_urls.dashboard_deposito)
        }} style={{margin:"1em", backgroundColor:"#F4E293"}} size="large" block>Dep&oacute;sito</Button>
        </>
        :<></>
      }
      {
      globals.esUsuarioVentas()?
      <>
      <Button onClick={(e)=>{
        window.location.replace(public_urls.dashboard_venta)
      }} style={{margin:"1em", backgroundColor:"#EBC3C0"}} size="large" block>Ventas</Button>
      </>
      :<></>
      }
      {
      globals.esUsuarioCaja1()?
      <>
        <Button onClick={(e)=>{
          window.location.replace(public_urls.dashboard_caja)
        }} style={{margin:"1em", backgroundColor:"#F0CCB6"}} size="large" block>
        Caja
        </Button>
      </>
      :<></>
      }
    </Card>
  </Space>)
}

Modo.PageLayout = LayoutSingleLogedIn;  