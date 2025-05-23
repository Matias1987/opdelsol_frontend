import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { reg_only_letters_s, reg_only_numbers_and_letters_s } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";

const AgregarUsuarioForm = (props) =>{
    const [loading, setLoading] = useState(false)
    const [defValues, setDefValues] = useState([])
    const [password, setPassword] = useState("")
    //var defValues=[]
    const [usuario, setUsuario] = useState({
        nombre:"",
        usuario: "",
        ventas:"0",
        caja1:"0",
        deposito_min:"0",
        deposito:"0",
        caja2:"0",
        admin1:"0",
        admin2:"0",
        admin3:"0",
        laboratorio:"0",
    })

    const options = [
        {value: "ventas", label:"venta"},
        {value: "caja1", label:"caja"},
        {value: "deposito_min", label:"deposito_min"},
        {value: "deposito", label:"deposito"},
        {value: "caja2", label:"caja2"},
        {value: "admin1", label:"admin"},
        {value: "admin2", label:"admin2"},
        {value: "admin3", label:"admin3"},
        {value: "laboratorio", label:"laboratorio"},
    ]

    useEffect(()=>{
        let _edicion = typeof props.edicion === 'undefined' ? false : props.edicion
        let _idusuario = typeof props.idusuario === 'undefined' ? -1 : props.idusuario
        if(_edicion)
        {
            setLoading(true)
            fetch(get.detalle_usuario + _idusuario)
            .then(r=>r.json())
            .then((response)=>{
                
                if((response.data||[]).length<1)
                {
                    return
                }
                let u = response.data
                setUsuario(
                    {
                        nombre: u.nombre,
                        usuario:u.usuario,
                        ventas:u.ventas,
                        caja1:u.caja1,
                        caja2:u.caja2,
                        deposito_min: u.deposito_min,
                        deposito: u.deposito,
                        admin1: u.admin1,
                        admin2: u.admin2,
                        laboratorio: u.laboratorio
                    }
                )
                let _dv = []
                const _add = (v,lbl,arr) => v=='1' ? [...arr,lbl] : arr
                _dv=_add(u.caja1,'caja1',_dv)
                _dv=_add(u.caja2,'caja2',_dv)
                _dv=_add(u.ventas,'ventas',_dv)
                _dv=_add(u.deposito_min,'deposito_min',_dv)
                _dv=_add(u.deposito,'deposito',_dv)
                _dv=_add(u.admin1,'admin1',_dv)
                _dv=_add(u.admin2,'admin2',_dv)
                _dv=_add(u.laboratorio,'laboratorio',_dv)

                setDefValues(_dv)
               
                setLoading(false)
            })
        }
    },[])

    const setValue = (idx,value) => {
        setUsuario(_u => ({
            ..._u,[idx]:value
        }))
    }

    const validar_y_guardar = () => {

        //const text_regex = globals ///^[a-zA-Z\s0-9]+$/

        if(usuario.nombre.length<4)
        {
            alert("El Nombre debe tener al menos 4 carácteres")
            return
        }
        if(usuario.usuario.length<4)
        {
            alert("El Usuario debe tener al menos 4 carácteres")
            return
        }

        

        let _edicion = typeof props.edicion === 'undefined' ? false : props.edicion

        if(!reg_only_letters_s.test(usuario.usuario.trim()))
        {
            alert("El usuario sólo debe contener letras")
            return 
        }
        
        if(!reg_only_letters_s.test(usuario.nombre.trim()))
        {
            alert("El nombre sólo debe contener letras")
            return 
        }

        const _pass = (password||"").trim()

        if(!((_edicion &&(_pass.length>4||_pass.length<1))||(!_edicion&&_pass.length>4)))
        {
            //invalid password
            alert("Contraseña Incorrecta")
            return;
        }

        if(_pass.length>0)
        {
            if(false===reg_only_numbers_and_letters_s.test(_pass))
            {
                alert("La contraseña sólo debe contener números y/o letras")
                return;
            }
        }
        
        //END OF VALIDATION

        //do not include password if unchanged in edition...
        let _usr = _edicion ? (password=="" ? {...usuario} : {...usuario,passwd:password}) : {...usuario,passwd:password} 

        //alert(JSON.stringify(_usr))
        //console.log(JSON.stringify(_usr))

        //return
        //alert(post.insert.usuario)
        post_method(post.insert.usuario,_usr,(resp)=>{
            if(resp.data.err)
            {
                alert("El usuario ya existe")
                props?.callback?.()
                return
            }
            alert("OK")
            props?.callback?.()
        })
    }

    const onChangePermisos = (checkedValues) => {
        let temp = {...usuario}

        options.forEach(o=>{
            temp[o.value]="0";
        })

        checkedValues.forEach(v=>{
            temp = {...temp,[v]:"1"}
          
        })
        
        setUsuario(_u=>temp)
    }

    const row_style = {
        padding:"1em"
    }

    return <>
 
    <Row style={row_style}>
        <Col span={24}>
            <Input style={{backgroundColor:"lightblue"}} disabled={loading} value={usuario.nombre} prefix="Nombre" onChange={(e)=>{setValue("nombre",e.target.value)}} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input style={{backgroundColor:"lightblue"}} disabled={loading} value={usuario.usuario} prefix="Usuario" onChange={(e)=>{setValue("usuario",e.target.value)}} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input.Password 
            style={{backgroundColor:"lightblue"}} 
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            disabled={loading} 
            value={password} 
            prefix="Contraseña"  
            onChange={(e)=>{setPassword(e.target.value)}} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <h4>Permisos</h4>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Checkbox.Group defaultValue={defValues} options={options} onChange={onChangePermisos} key={defValues} disabled={loading}/>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Button loading={loading} type="primary" block onClick={validar_y_guardar}>Agregar</Button>
        </Col>
    </Row>
    
    </>
}

export default AgregarUsuarioForm;