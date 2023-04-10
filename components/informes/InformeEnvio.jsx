import * as React from "react";
const { Spin } = require("antd")
const { useEffect, useState} = require("react")

export const InformeEnvio = React.forwardRef((props, ref) =>{

    const [content, setContent] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        //load data from envio
        /*fetch("someurl")
        .then(response=>response.json())
        .then((response)=>{
            //load data from items
            fetch("another url")
            .then(_response=>_response.json())
            .then((_response)=>{

            })
        })*/
        //TEST DATA!
        const _content = {
            fecha: "10/04/2023",
            usuario: "Admin",
            cantidad: "50",
            monto_total: "$50000",
            sucursal: "Alberdi",
            id: "500",
            items: [
                {
                    key: "1",
                    codigo: "cod001col1",
                    cantidad: "5",
                },
                {
                    key: "2",
                    codigo: "cod001col2",
                    cantidad: "15",
                },
                {
                    key: "3",
                    codigo: "cod001col3",
                    cantidad: "25",
                },
            ]
        }
        setContent(_content)
        setLoading(false)


    },[])

    const Content =  () => {
        return (<>
                <p>Nro. Envio: &nbsp; <b>{content.id}</b></p><br />
                <p>Sucursal: &nbsp; <b>{content.sucursal}</b></p><br />
                <p>Cantidad: &nbsp; <b>{content.cantidad}</b></p><br />
                <p>Usuario: &nbsp; <b>{content.usuario}</b></p><br />
                <table style={{border:"1px solid", width: "100%"}}>
                    <thead>
                        <tr>
                            <th>
                                C&oacute;digo
                            </th>
                            <th>
                                Cantidad
                            </th>
                        </tr>
                    </thead>
                    {
                        content.items.map(r=>(
                            <tr>
                                <td style={{border:"1px solid",textAlign:"center"}}>{r.codigo}</td>
                                <td style={{border:"1px solid",textAlign:"center"}}>{r.cantidad}</td>
                            </tr>
                        ))
                    }
                </table>
                </>
            )

    }

    return (
        <div ref={ref}>
        {loading? <Spin/> : <Content />}
        
        </div>
    )

})

