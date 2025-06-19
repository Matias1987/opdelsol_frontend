import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Alert, Layout, Row, Col, Input, Menu, Card, Button } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import HeaderSol from "./header";
import MenuV2 from "./menu_v2";
import PopupResultadoBusqueda from "../precios/PopupResultadoBusqueda";
import BarraResumenCaja from "../forms/caja/BarraResumenCaja";
import { SearchOutlined } from "@ant-design/icons";


export default function LayoutVentas(props) {
  const { Content } = Layout;
  const [alerta, setAlerta] = useState("");
  const { getItem } = useStorage();
  const [popupBusquedaOpen, setPopupBusquedaOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const onSearch = () => {
    if (busqueda.trim().length < 1) {
      return;
    }
   // setBusqueda(value);
    setPopupBusquedaOpen(true);
  };

  const validate_user = () => {
    const _token = getItem("token", "session");

    if (_token === typeof "undefined") {
      //alert("Debe Iniciar Sesion")
      window.location.replace(public_urls.login);
    }

    var _t = setTimeout(() => {
      if (_t !== typeof "undefined") {
        console.log("clear timeout");
        clearTimeout(_t);
      }
      fetch(get.check_login + _token)
        .then((response) => response.json())
        .then((response) => {
          if (response.data.logged == "0") {
            //alert("Debe Iniciar Sesion")
            window.location.replace(public_urls.login);
          } else {
            //_t  = validate_user();
            validate_user();
          }
        });

      //check if caja is closed, if so, then check whether it is open now
      fetch(get.caja_abierta + globals.obtenerSucursal())
        .then((r) => r.json())
        .then((response) => {
          //if caja is open, set this value in local
          if (typeof response.data !== "undefined") {
            //alert(JSON.stringify(response))
            if (response.data != null) {
              if (+response.data.abierta == 1) {
                globals.setCajaOpen(true);
                setAlerta(
                  +response.data.current == 1 ? "" : "Caja Desactualizada"
                );
              } else {
                //alert("caja cerrada")
                setAlerta("CAJA CERRADA");
              }
            }
          }
        });
    }, 2000);
  };
  useEffect(() => {
    //console.log("run user effect")
    if (!globals.esUsuarioVentas()) {
      window.location.replace(public_urls.modo);
    }
    validate_user();
  }, []);
  return (
    <Layout style={{ padding: 0 }} className="layout">
      <HeaderSol
        tipoCuenta="VENTAS"
        displaymodechange={(__c) => {
          props?.displaymodechange?.(__c);
        }}
      />
      
      
      {/*<MenuVentasTop />*/}
      <Card
      styles={{
        header:{background: "#ADD8E6", background: "linear-gradient(39deg, rgba(173, 216, 230, 1) 62%, rgba(128, 164, 230, 1) 95%)", borderTop:"3px solid #4589A0"},  body:{backgroundColor:"#FAFBFF", padding:"0"}}}
        extra={
          <div>
            <Input 
            style={{borderRadius:"16px", backgroundColor:"rgb(255, 255, 255)", border:"1px solid black"}} 
            suffix={<><Button type="link" onClick={onSearch}><SearchOutlined /></Button></>} 
            prefix={<span style={{fontWeight:"600"}}>Buscar Código:</span>} 
            value={busqueda} 
            onChange={(e)=>{setBusqueda(e.target.value)}}
            />
          </div>
        }
        title={
          <>
            <MenuV2 />
           
          </>
        }
      >
         {globals.esUsuarioCaja1() ? <BarraResumenCaja /> : <></>}  
        <Content
          style={{
            margin: "0px 100px",
            padding: 24,
            borderRadius: "15px",
            minHeight: 580,
          }}
        >
            
            {alerta != "" ? (
            <>
            <Alert style={{fontSize:".9em", padding:"1px 50px "}} key={alerta} message={alerta} type="error" showIcon />
            <br />
            </>
            ) : (
                <></>
            )}
          <Row>
            <Col span={24}>{props.children}</Col>
          </Row>

          <PopupResultadoBusqueda
            open={popupBusquedaOpen}
            busqueda={busqueda}
            callback={() => {
              setPopupBusquedaOpen(false);
              setBusqueda("");
            }}
          />
        </Content>
      </Card>
      {/*
            <Menu items={[{
                label:<Input.Search style={{padding:".3em"}} prefix={<span style={{fontWeight:"600"}}>Buscar Código:&nbsp;&nbsp;&nbsp;</span>} value={busqueda} onChange={(e)=>{setBusqueda(e.target.value)}} onSearch={onSearch} />

            }]}
            />
           */}

      {/*<Alerts />*/}
    </Layout>
  );
}
