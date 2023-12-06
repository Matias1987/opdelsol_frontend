import LayoutSingle from "@/components/layout/layout_single";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Alert, Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";

export default function Auth(){
    const [message, setMessage] = useState("")
    const [request, setRequest] = useState(null)
    const [count, setCount] = useState(0);
    const [validationPending, setValidationPending] = useState(true)
    const { getItem } = useStorage();

    useEffect(()=>{
        const interval = setInterval(() => { 
            update()
            setCount(count + 1); 
            
        }, 5000); 
        //Clearing the interval 
        return () => clearInterval(interval); 
    },[count]);

    const on_pending = _ => {
        setMessage("Estado Pendiente...")
        ////check again
        //fetch(url + `${globals.obtenerUID()}/${globals.obtenerSucursal()}`)
        //.then(r=>r.json())
        //.then((r)=>{
//
        //})
        //.catch(e=>{console.log("error")})
    }

    const on_acepted = () => {
        alert("Accepted")
        //redirect!
        window.location.replace(public_urls.modo)
    }

    const on_declined = () => {
        //go back to login
        alert("Forbidden")
        //redirect!
        const _token = getItem("token",'session')

        fetch(get.logout + _token)
        .then(response=>response.json())
        .then((response)=>{
            window.location.replace(public_urls.login);
        })
        .catch(err=>{console.log("error")})

     
    }

    const on_create_request = () => {
        //alert("Creating")
        const date = new Date();
        post_method(post.insert.session,{
            fkusuario: globals.obtenerUID(), 
            fksucursal: globals.obtenerSucursal(),
            dia:date.getDate(),
            mes:date.getMonth() +1,
            anio: date.getFullYear()
        },(response)=>{

        })
    }

    const update = () => {
        if(!validationPending)
        {
            return;
        }
        setMessage("Fetching...")
        /*get current user sessions request if exists */
        fetch(get.check_session+ `${globals.obtenerUID()}/${globals.obtenerSucursal()}`)
        .then(r=>r.json())
        .then((response)=>{

            if(response.data!=null)
            {
                setRequest({
                    estado: response.data.estado
                })
                switch(response.data.estado)
                {
                    case 'pending': on_pending()
                        break;
                    case 'acepted': on_acepted()
                        break;
                    case 'declined': on_declined()
                        break;
                }
            }
            else 
            {
                on_create_request()
            }
        })
        .catch(e=>{console.log("error")})
    }

    return <>
    <Row>
        <Col span={24}>
        <h2>Auth</h2>
        <Alert
            message={`Espere... ${message}`}
        />
        
        {request === null ? <Spin /> : <>
        
            Autorizaci&oacute;n {request.estado}
        
        </>}
        </Col>
    </Row>
    </>

}

Auth.PageLayout = LayoutSingle;