import CodeGrid from "@/components/etc/CodeGrid";
import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import SucursalSelect from "@/components/SucursalSelect";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import {Row, Col, Table, Input, Tabs} from "antd";
import { useEffect, useState } from "react";

const CantidadesSucursales = (props) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    
    const [filtros, setFiltros] = useState({
            codigo_contenga_a:'',
            codigo_igual_a:'',
            precio_mayor_a:'',
            precio_menor_a:'',
            precio_igual_a:'',
            cantidad_igual_a:'',
            cantidad_mayor_a:'',
            cantidad_menor_a:'',
            sexo:'',
            edad:'',
            descripcion:'',
            subgrupo:'',
            grupo:'',
            subfamilia:'',
            familia:'',
            grupo_contenga_a:'',
            sucursal:-1,
        })
    const [update, setUpdate] = useState(false)
    const [total, setTotal] = useState(0)
    const columns = [
        {dataIndex:"sucursal", title:"Sucursal"},
        {dataIndex:"codigo", title:"Codigo"},
        {dataIndex:"cantidad", title:"Cantidad"},
    ]

    const tabla = _ => 
        <>
            <Row style={{padding:"1em"}}>
                <Col span={24}>
                    <Table columns={columns} dataSource={dataSource} loading={loading} pagination={true} scroll={{y:"500px"}} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Input readOnly prefix="Total:  " value={total} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
    
                </Col>
            </Row>
        </>


    const items = [
        {
          key: '1',
          label: 'Lista',
          children: <>{tabla()}</>,
        },
        {
          key: '2',
          label: 'Grilla Cristales',
          children: <><CodeGrid idsucursal={filtros.sucursal} width={640} height={480} callback={()=>{}} idsubgrupo={filtros.subgrupo} key={update}/></>,
        },
  
      ];

    

    const onChange = (key) => {
        console.log(key);
    };

    useEffect(()=>{
        
        if(typeof filtros.familia === 'undefined')
        {
            return
        }

      

        post_method(post.search.filtro_stock,filtros,(response)=>{

            setDataSource(response.data)
            let t = 0
            response.data.forEach(r=>{
                t+=parseInt(r.cantidad)
            })
            setTotal(t)
        })

    },[update])
    return <>
       
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Row>
                    <Col span={24}>
                        <SucursalSelect callback={(id)=>{setFiltros(f=>({...f,sucursal:id})); setUpdate(!update);}}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FiltroCodigos callback={(f)=>{
                        setFiltros(_f=>({..._f,...{
                            familia:+f.idfamilia<0?'':f.idfamilia,
                            subfamilia:+f.idsubfamilia<0?'':f.idsubfamilia,
                            grupo:+f.idgrupo<0?'':f.idgrupo,
                            subgrupo:+f.idsubgrupo<0?'':f.idsubgrupo,
                        }}))
                        setUpdate(!update)
                        }} />
                    </Col>
                </Row>
                
            </Col>
            </Row>
            <Row>
            <Col span={24}  style={{border:"1px solid #A9A9A9", padding:"12px", borderRadius:"6px"}}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Col>
        </Row>
    </>
}

export default CantidadesSucursales;