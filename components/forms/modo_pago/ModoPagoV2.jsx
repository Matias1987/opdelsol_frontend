const { Row, Input, Select, Col } = require("antd")
const { useState } = require("react")
const { default: MP_Efectivo } = require("./tipos/mp_efectivo")
const { default: MP_CtaCte } = require("./tipos/mp_ctacte")
const { default: MP_Tarjeta } = require("./tipos/mp_tarjeta")
const { default: MP_Mutual } = require("./tipos/mp_mutual")
const { default: MP_MercadoPago } = require("./tipos/mp_mercadopago")
const { default: MP_Cheque } = require("./tipos/mp_cheque")


const ModoPagoV2 = (props) => {
    const [mp, setMP] = useState([])

    const callback = (data) => {
        setMP(d=>({
            ...d
        }))
    }
    

    const _list_mp = (mp) => {
        
        switch (mp) {
            case "efectivo":
                alert(JSON.stringify(mp))
                    return <MP_Efectivo callback={callback}  />
                break;
            case "ctacte":
                    return <MP_CtaCte callback={callback}  />
                break;
            case "tarjeta":
                    return <MP_Tarjeta callback={callback}  />
                break;
            case "mutual":
                    return <MP_Mutual callback={callback}  />
                break;
            case "mercadopago":
                    return <MP_MercadoPago callback={callback}  />
                break;
            case "cheque":
                    return <MP_Cheque callback={callback}  />
                break;
        
            default:
                break;
        }
    }

    
    return <>
        <Row>
            <Col span={24}>
                <Select 
                style={{width:"300px"}}
                onChange={(val)=>{
                    
                    if(typeof mp.find(r=>r==val) === 'undefined'){
                        //alert(val)
                        setMP(_mp=>([..._mp,val]))
                    }

                }}
                options={[
                    {value:'efectivo', label:"efectivo"},
                    {value:'tarjeta', label:"tarjeta"},
                    {value:'ctacte', label:"ctacte"},
                    {value:'mutual', label:"mutual"},
                    {value:'cheque', label:"cheque"},
                    {value:'mercadopago', label:"mercadopago"},
                ]}
                />
            </Col>
        </Row>
        {
            mp.map((_mp)=>{<>
                <Row>
                    <Col span={24}>
                        {_list_mp(_mp)}
                    </Col>
                </Row>
                </>
            })

        }
    </> 
}

export default ModoPagoV2;