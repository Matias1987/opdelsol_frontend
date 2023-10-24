import globals from "@/src/globals";
import { Alert, Button, Col, Input, Layout, Row, Switch } from "antd";
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
    <Header style={{ background: '#262626', color: "white", paddingLeft: '5em', lineHeight:'0', margin: '0', fontSize:'.70em', height:'36px' }}>
        <Row>
            <Col span={16}>
                <span style={{padding:'0'}}>
                    <i>
                        Sucursal:&nbsp;&nbsp;<SucursalLabel idsucursal={
                            globals.obtenerSucursal()
                            } />
                            &nbsp;- Cuenta: <b>{props.tipoCuenta}</b>
                            &nbsp;- Usuario: <b>{uname}</b>
                    </i>
                </span>
                <Button type="link"  style={{color:"white", padding:".5em"}} onClick={()=>{
                    
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
                <Button type="link" style={{color:"white", padding:".5em"}} onClick={(e)=>{
                    window.location.replace(public_urls.modo);
                }}>
                    Cambiar Modo
                </Button>
                &nbsp;&nbsp;
                <Switch defaultChecked checkedChildren="Modo Nocturno" unCheckedChildren="Modo Normal" onChange={(c)=>{
                    props?.displaymodechange?.(c)
                }} />
            
            </Col>  
            
        </Row>
       
        
        
        </Header>)
}

export default HeaderSol;