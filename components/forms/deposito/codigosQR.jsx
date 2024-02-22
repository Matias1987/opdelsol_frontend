import PrinterWrapper from "@/components/PrinterWrapper"
import { get } from "@/src/urls";

const { QRCode, Col, Row } = require("antd")
const { useState, useEffect } = require("react")

const CodigosQR = (props) => {
    const [codigosId, setCodigosId] = useState([]);

    useEffect(()=>{

        
        fetch(get.lista_envio_stock+props.idenvio)
        .then(response=>response.json())
        .then((response)=>{

            let _t1 = response.data.map(
                e=>(
                    {
                        idcodigo: e.idcodigo,
                        codigo: e.codigo,
                        cantidad: e.cantidad,
                    }
                )
            )

            var _temp = Array();
            _t1.forEach(r=>{
                for(let i=0;i<r.cantidad;i++){
                    _temp.push(
                        {codigo: r.codigo, idcodigo: r.idcodigo}
                    )
                }
            })


            setCodigosId(
                _temp
            )
        })
    },[])

    return <>
    <PrinterWrapper>
        <Row>
            
            {
                
                codigosId.map(c=>(
                <>
                <Col span={4} style={{textAlign:"left", fontSize:"0.6em"}}>
                {c.codigo}
                <QRCode
                size={80}
                    errorLevel="H"
                    value={"TYPEQR" + c.idcodigo + "?COD"+c.codigo}
                    //icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                />
                </Col>
                </>))
            }

        </Row>
    </PrinterWrapper>
        
    </>
}

export default CodigosQR