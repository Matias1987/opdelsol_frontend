import globals from "@/src/globals";
import { Alert, Button, Layout } from "antd";
import SucursalLabel from "../sucursal_label";
import useStorage from "@/useStorage";
import { LogoutOutlined } from "@ant-design/icons";
import { get, public_urls } from "@/src/urls";

/**
 * 
 * @param tipoCuenta
 * @returns 
 */
const HeaderSol =(props)=> {
    const { Header, Sider, Content } = Layout;
    const { getItem } = useStorage();
    return(    
    <Header style={{ background: '#fff', padding: 0 }}>
        <span style={{padding:'1em'}}>
            <i>
                Sucursal:&nbsp;&nbsp;<SucursalLabel idsucursal={
                    globals.obtenerSucursal()
                    } />
                    &nbsp;- Cuenta: {props.tipoCuenta}
                    &nbsp;- Usuario: NOMBRE
            </i>
        </span>
        <Button type="link" onClick={()=>{
            
            const _token = getItem("token",'session')

            fetch(get.logout + _token)
            .then(response=>response.json())
            .then((response)=>{
                window.location.replace(public_urls.login);
            })
        }}>

        <LogoutOutlined />Salir     
        </Button>
        &nbsp;&nbsp;
        <Button type="link" onClick={(e)=>{
            window.location.replace(public_urls.modo);
        }}>
            Cambiar Modo
        </Button>
        &nbsp;&nbsp;
        </Header>)
}

export default HeaderSol;