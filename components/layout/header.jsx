import globals from "@/src/globals";
import { Alert, Button, Col, Input, Layout, Row } from "antd";
import SucursalLabel from "../sucursal_label";
import useStorage from "@/useStorage";
import { LogoutOutlined } from "@ant-design/icons";
import { get, public_urls } from "@/src/urls";
import { useEffect, useState } from "react";

/**
 * 
 * @param tipoCuenta
 * @returns 
 */
const HeaderSol =(props)=> {
    const { Header, Sider, Content } = Layout;
    const { getItem } = useStorage();
    const [uname, setUName] = useState('')
    useEffect(()=>{
        setUName(globals.obtenerUserName())
    },[])
    return(    
    <Header style={{ background: '#fff', padding: '0em', margin: '0', fontSize:'.85em' }}>
        <Row>
            <Col span={16}>
                <span style={{padding:'.1em'}}>
                    <i>
                        Sucursal:&nbsp;&nbsp;<SucursalLabel idsucursal={
                            globals.obtenerSucursal()
                            } />
                            &nbsp;- Cuenta: <b>{props.tipoCuenta}</b>
                            &nbsp;- Usuario: <b>{uname}</b>
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
            
            </Col>  
            
        </Row>
       
        
        
        </Header>)
}

export default HeaderSol;