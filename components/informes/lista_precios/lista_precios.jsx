import { get, public_urls } from "@/src/urls";
import Link from "next/link";
import { useState } from "react";

const { Row, Modal, Button, Col, Menu, Card, Layout } = require("antd");
export default function ListaPrecios(){
    const { Header, Sider, Content } = Layout;
    const [subgrupos, setSubgrupos] = useState([])
    const [menuSubfamilia, setMenuSubFamilia] = useState([])
    const [open, setOpen] = useState(false)
    

    ///get subfamilias
    const get_subfamilias = () => {
        //alert(get.lista_subfamilias)
        fetch(get.lista_subfamilias)
        .then(r=>r.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            setMenuSubFamilia(response.data.map(r=>({
                key: r.idsubfamilia,
                label: r.nombre_corto,
                onClick:(e)=>{
                    //alert(e.key)
                    get_subgrupos(e.key)
                }
            })))
        })
    }

    const get_subgrupos = (id) => {
        //alert(get.lista_subgrupos_subfamilia + id)
        fetch(get.lista_subgrupos_subfamilia + id)
        .then(r=>r.json())
        .then((response)=>{
            var res = []
            var last_grupo = "-1"
            response.data.forEach(r=>{
                //alert(JSON.stringify({last_grupo: last_grupo, idgrupo: r.idgrupo}))
                if(+last_grupo!=+r.idgrupo){
                    //alert("jalkslk")
                    res.push({
                        nombre_grupo: r.grupo,
                        children: []
                    })
                    last_grupo=r.idgrupo
                }
                res[res.length-1].children.push({subgrupo: r.subgrupo, precio: r.precio})

            })


            setSubgrupos(
                res
                /*response.data.map(r=>({
                    grupo: r.grupo,
                    subgrupo: r.subgrupo,
                    precio: r.precio,
                }))*/

            )
        })
    }

    return <>
        <Button onClick={()=>{get_subfamilias(); setOpen(true)}}>Lista de Precios</Button>
        <Modal title="Lista de Precios" width={"80%"} open={open} onCancel={()=>{setOpen(false)}} >
           <Layout>
           <Content style={{padding:"0.8em"}}>
                    {subgrupos.map(r=><>
                        <Card title={r.nombre_grupo}>
                            <table style={{width:"100%"}}>
                                <tbody>
                                    {r.children.map((c)=><>
                                        <tr><td>{c.subgrupo} </td><td> {"$" + c.precio}</td></tr>
                                    </>)}
                                </tbody>
                            </table>
                        </Card>
                    </>)}
                </Content>
                <Sider>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuSubfamilia} />
                </Sider>
                
           </Layout>
        </Modal>
        </>
}