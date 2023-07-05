import PrinterWrapper from "@/components/PrinterWrapper"

const { default: CustomModal } = require("@/components/CustomModal")
const { Row, Col } = require("antd")
const { useState, useEffect } = require("react")

const InformeStock = (props) => {

    const [data,setData] = useState(null);
    const [total, setTotal] = useState(0);
    const date = new Date();
    const [fecha, setFecha] = useState(null)
    var __idx =0;
    useEffect(()=>{
        __idx=0;
        if(typeof props.data !== 'undefined'){
            setData(data=>props.data)

            setTotal(total=>{
                var _t = 0;
                props.data.forEach(r=>{
                    _t+=r.cantidad
                })
                return _t;
            })
        }
        setFecha((fecha)=>{
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return `${day}-${month}-${year}`;
        })
    },data)

    const _thead = _ => <>
    <tr>
        <th style={{border:0}}>Fecha:</th>
        <th style={{border:0}}>
            {fecha}
        </th>
        <th style={{border:0}}>
            Total:
        </th>
        <th colSpan={2} style={{border:0}}>
            {total}
        </th>
        
    </tr>
    <tr>
        <th>Familia</th>
        <th>SubFamilia</th>
        <th>Grupo</th>
        <th>SubGrupo</th>
        <th>C&oacute;digo</th>
        <th>Cantidad</th>
    </tr>
</>
    
    return <>
    <CustomModal openButtonText="Imprimir Listado">
        <Row>
            <Col span={24}>
                <h3>Informe Cantidad Stock</h3>
            </Col>
        </Row>
        <Row>
            <Col span={24} style={{height:"600px", overflowY:"scroll"}}>
                <PrinterWrapper>
                    <table style={{width:"100%"}} border={"1px solid"}>
                        <thead>
                            <tr><th colSpan={6} style={{textAlign:"center"}}>Informe de Cantidad de Stock</th></tr>
                            {_thead()}
                        </thead>
                        <tbody>
                            {
                                data?.map?.(r=>
                                <>
                                    {(++__idx)%100==0 ? _thead() : <></>}
                                    <tr>
                                    <td>{r.familia}</td>
                                    <td>{r.subfamilia}</td>
                                    <td>{r.grupo}</td>
                                    <td>{r.subgrupo}</td>
                                    <td>{r.codigo}</td>
                                    <td>{r.cantidad}</td>
                                    </tr>
                                </>
                                )
                            }
                        </tbody>

                    </table>
                </PrinterWrapper>
            </Col>
        </Row>
    </CustomModal>
    </>
}

export default InformeStock;