const { get } = require("@/src/urls")
const { Row, Col, Select, Checkbox } = require("antd")
const { useState, useEffect } = require("react")

const AgregarPrivilegiosUsuarios = (props) => {
    const [permisos, setPermisos] = useState({
        venta:"0",
        caja:"0",
        deposito_min:"0",
        deposito:"0",
        caja2:"0",
        admin:"0",
        admin2:"0",
        admin3:"0",
        laboratorio:"0",
        fksucursal:-1,
    })
    const [sucursales, setSucursales] = useState([])
    const options = [
        {value: "venta", label:"venta"},
        {value: "caja", label:"caja"},
        {value: "deposito_min", label:"deposito_min"},
        {value: "deposito", label:"deposito"},
        {value: "caja2", label:"caja2"},
        {value: "admin", label:"admin"},
        {value: "admin2", label:"admin2"},
        {value: "admin3", label:"admin3"},
        {value: "laboratorio", label:"laboratorio"},
    ]

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
                response.map(r=>({
                    value:r.idsucursal,
                    label: r.nombre
                }))
            )
        })
    }

    const onChangeSucursal = (v) => {
        setPermisos(p=>({...p,fksucursal:v}))
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
        <Row>
            <Col span={24}>
                <Select options={sucursales} onChange={onChangeSucursal} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Checkbox.Group options={options} onChange={onChangePermisos} />
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
        <Row>
            <Col span={24}>
            </Col>
        </Row>
    </>
}

export default AgregarPrivilegiosUsuarios