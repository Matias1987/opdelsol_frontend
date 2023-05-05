import { public_urls } from "@/src/urls";
import { BlockOutlined, DollarOutlined, GiftOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";

export default function Index(){
    return (<>
        <i>Bienvenido</i>
        <Divider />
        <br />
        <Button style={{width:"130px", height:"130px", wordBreak: "break-all", margin: "1em", color:"red", borderColor:"black"}} onClick={()=>{window.location.href = public_urls.nuevo_envio}}>
            <GiftOutlined /><br />
            <b>Nuevo Envio</b>
        </Button>
        <Button style={{width:"130px", height:"130px", wordBreak: "break-all", margin: "1em", color:"orange", borderColor:"black"}} onClick={()=>{window.location.href = public_urls.lista_stock}}>
            <BlockOutlined /><br />
            <b>Stock</b>
        </Button>
        <Button style={{width:"130px", height:"130px", wordBreak: "break-all", margin: "1em", color:"green", borderColor:"black"}} onClick={()=>{window.location.href = public_urls.editar_multiplicadores}}>
            <DollarOutlined /><br /> 
            <b>Cambiar Precios</b>
        </Button>
    </>)
}