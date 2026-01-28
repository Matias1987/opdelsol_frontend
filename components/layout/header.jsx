import globals from "@/src/globals";
import { Button, Col, Layout, Row } from "antd";
import SucursalLabel from "../sucursal_label";
import useStorage from "@/useStorage";
import { UserOutlined } from "@ant-design/icons";
import { get, public_urls } from "@/src/urls";
import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import VentasVendedor from "../informes/ventas/VentasVendedor";
import { registrar_evento } from "@/src/helpers/evento_helper";
import { cambio_sucursal_habilitado, idf_optica } from "@/src/config";

/**
 * 
 * @param tipoCuenta
 * @returns 
 */
const HeaderSol =(props)=> {
    const { Header, Sider, Content } = Layout;
    const { getItem } = useStorage();
    const [uname, setUName] = useState('')
    const [soloVtasCaja, setCambiarModo] = useState(true)
    useEffect(()=>{
        //alert(globals.obtenerSoloVtaCajaUser())
        setCambiarModo(globals.obtenerSoloVtaCajaUser())
        setUName(globals.obtenerUserName())
    },[])
    return(    
    <Header style={{ background: '#131313', color: "white", paddingLeft: '5em', paddingTop:"4px", lineHeight:'0', margin: '0', fontSize:'.70em', height:'36px' }}>
        <Row>
            <Col span={24}>
                <span style={{padding:'0'}}>
                    <i>
                        {props.tipoCuenta && props.tipoCuenta == "ADMIN"? null: <>Sucursal:&nbsp;&nbsp;<SucursalLabel changeSucursalEnabled={cambio_sucursal_habilitado} /></>}
                           { /* &nbsp;- Cuenta: <b>{props.tipoCuenta}</b>
                           &nbsp;&nbsp;&nbsp;  Usuario: <b>{uname}</b>
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   |&nbsp;&nbsp;&nbsp;*/}
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           {<CustomModal title={<h2 style={{color:"darkred"}}>{uname}</h2>} width="500px" type="text" openButtonText={<><span style={{color:"white"}}><UserOutlined size={"small"} />&nbsp;{uname}</span></>}><VentasVendedor /></CustomModal>}
                    </i>
                </span>
                &nbsp;&nbsp;&nbsp;
                <Button size="small" type="text"  style={{color:"white"}} onClick={()=>{
                    
                    const _token = getItem("token",'session')

                    fetch(get.logout + _token)
                    .then(response=>response.json())
                    .then((response)=>{
                        registrar_evento("USER_LOGOUT", "Cierre de sesion",globals.obtenerUID() )
                        window.location.replace(public_urls.login);
                    })
                    .catch(err=>{console.log("error")})
                }}>
                
                Salir     
                </Button>
                &nbsp;&nbsp;
                {
                    soloVtasCaja ? <></> :  
                    <Button type="link" style={{color:"white", padding:".5em"}} onClick={(e)=>{
                    window.location.replace(public_urls.modo);
                    }}>
                        Cambiar Modo
                    </Button>
                    }
                &nbsp;&nbsp;
                {/*<Switch defaultChecked checkedChildren={<> </>} unCheckedChildren={<> </>} onChange={(c)=>{
                    props?.displaymodechange?.(c)
                }} />*/}
            
            </Col>  
            
        </Row>
       
        
        
        </Header>)
}

export default HeaderSol;