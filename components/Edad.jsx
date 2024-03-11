const { Row, Col } = require("antd")
const { useEffect, useState } = require("react")
/**
 * 
 * @param dia
 * @param mes
 * @param anio
 */
const Edad =(props) => {
    const {dia, mes, anio} = props
    const [edad, setEdad] = useState(0)
    useEffect(()=>{
        
        if((dia||"") === "" || ( mes||"") === "" || (anio||"") === "")
        {
            setEdad("-")
        }
        else
        {
            let now = new Date()

            let _edad = now.getFullYear() - anio
    
            if((now.getMonth()+1)<mes){
                _edad-=1
            }
            else{
                if((now.getMonth()-1)==mes){
                    if(now.getDate()<dia){
                        _edad-=1
                    }
                }
            }
    
            setEdad(_edad.toString())
        }

       


    },[dia,mes,anio])
    return <>
        <Row>
            <Col span={24}>{edad} A&ntilde;os</Col>
        </Row>
    </>
}

export default Edad;