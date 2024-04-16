import { post_method } from "@/src/helpers/post_helper"

const { get, post } = require("@/src/urls")
const { Row, Col, Select, Checkbox, Button } = require("antd")
const { useState, useEffect } = require("react")

const AgregarPrivilegiosUsuarios = (props) => {
    const {idusuario} = props
    const [permisos, setPermisos] = useState({
        ventas:"0",
        caja1:"0",
        deposito_min:"0",
        deposito:"0",
        caja2:"0",
        admin1:"0",
        admin2:"0",
        admin3:"0",
        laboratorio:"0",
        fk_sucursal:-1
    })
    const [sucursales, setSucursales] = useState([])
    const options = [
        {value: "ventas", label:"venta"},
        {value: "caja1", label:"caja"},
        {value: "deposito_min", label:"deposito_min"},
        {value: "deposito", label:"deposito"},
        {value: "caja2", label:"caja2"},
        {value: "admina", label:"admin"},
        {value: "admin2", label:"admin2"},
        {value: "admin3", label:"admin3"},
        {value: "laboratorio", label:"laboratorio"},
    ]

    useEffect(()=>{
        //alert(props.idusuario)
    },[
        props.idusuario
    ])

    const onChangePermisos = (checkedValues) => {
        let temp = {...permisos}

        options.forEach(o=>{
            temp[o.value]="0";
        })

        checkedValues.forEach(v=>{
            temp[v]="1";
        })
        
        setPermisos(temp)
    }

    const loadSucursales = () => {
        fetch(get.sucursales)
        .then(r=>r.json())
        .then((response)=>{
            setSucursales(
                
                [
                    ...[{value:-1, label:"Todas"}],
                    ...response.data.map(r=>({
                    value:r.idsucursal,
                    label: r.nombre
                    }))
                ]

            )
        })
    }

    const onChangeSucursal = (v) => {
        setPermisos(p=>({...p,fk_sucursal:v}))
    }

    const onAplicar = ( ) => {
        const perm = {...permisos,fk_usuario:idusuario}
        //alert(JSON.stringify(perm))
        post_method(post.insert.u_permisos_a_u,perm,(response)=>{
            alert("OK")
            props?.callback?.()
        })
    }


    useEffect(()=>{
        loadSucursales()
    },[])
    
    return <>
        <Row>
            <Col span={24}>
                Permisos Usuario
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Select style={{width:"100%"}} options={sucursales} onChange={onChangeSucursal} value={permisos.fk_sucursal} />
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Checkbox.Group options={options} onChange={onChangePermisos} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button block onClick={onAplicar}>Aplicar</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
    </>
}

export default AgregarPrivilegiosUsuarios