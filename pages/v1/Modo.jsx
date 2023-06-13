import LayoutSingleLogedIn from "@/components/layout/layout_single_logedin";

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
      <Button style={{margin:"1em", backgroundColor:"#F4E293"}} size="large" block>Dep&oacute;sito</Button>
      <Button style={{margin:"1em", backgroundColor:"#EBC3C0"}} size="large" block>Ventas</Button>
      <Button style={{margin:"1em", backgroundColor:"#F0CCB6"}} size="large" block>Caja</Button>
    </Card>
  </Space>)
}

Modo.PageLayout = LayoutSingleLogedIn;  