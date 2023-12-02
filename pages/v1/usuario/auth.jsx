import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export default function Auth(){

    const [request, setRequest] = useState(null)
    const [count, setCount] = useState(0);

    useEffect(()=>{
        const interval = setInterval(() => { 
            update()
            setCount(count + 1); 
            
        }, 5000); 
        //Clearing the interval 
        return () => clearInterval(interval); 
    },[count]);

    const on_pending = () => {

    }

    const on_acepted = () => {

    }

    const on_declined = () => {

    }

    const on_create_request = () => {
        post_method(url_,{idusuario: globals.obtenerUID(), idsucursal: globals.obtenerSucursal()},(response)=>{

        })
    }

    const update = () => {
        /*get current user sessions request if exists */
        fetch(url)
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
    <h2>Auth</h2>
    {request === null ? <Spin /> : <>
    
        Autorizaci&oacute;n {request.estado}
    
    </>}
    
    </>

}