import { get } from "@/src/urls"
import { Button, Popover } from "antd"
import { useEffect, useState } from "react"

const GrillaCristales = (props) => {
    const [grillaDataPos, setGrillaDataPos]  = useState([])
    const [grillaDataNeg, setGrillaDataNeg]  = useState([])
    const [codeData, setCodeData] = useState([])
    const [currentCode, setCurrentCode] = useState("")


    const calc_grilla = params => {
        let gridPos = []
        let gridNeg = []
        for(let i=0;i<1350;i+=25)
        {
            gridPos.push([])
            gridNeg.push([])
            for(let j=0;j<650;j+=25)
            {
                let msg=""
                if(i==0&&j==0)
                {
                    msg="esf\\cil"
                }
                else
                {
                    if(i==0)
                    {
                        msg = "-" + (parseFloat(j-25) * .01).toString()
                    }
                    else{
                        if(j==0)
                        {
                            msg =  (parseFloat(i-25) * .01).toString()
                        }
                    }
                }

                gridPos[gridPos.length-1].push({
                    cil:j,
                    esf:i,
                    e: 0,
                    msg: msg,
                    codigo: ""
                })
                gridNeg[gridNeg.length-1].push({
                    cil:j,
                    esf:i,
                    e: 0,
                    msg: msg,
                    codigo: ""
                })
            }

        }

        params.forEach(r=>{
            const e = parseInt( parseFloat(Math.abs(r.esf)) * 100) / 25
            const c = parseInt( parseFloat(Math.abs(r.cil)) * 100) / 25
            if(r.esf>=0){
                if(e>-1 && c>-1){
                    //alert(r.codigo)
                    gridPos[e+1][c+1].e=1
                    gridPos[e+1][c+1].codigo = r.codigo
                }
            }
            else
            {
                if(e>-1 && c>-1){
                    //alert(r.codigo)
                    gridNeg[e+1][c+1].e=1
                    gridNeg[e+1][c+1].codigo = r.codigo
                }
            }
        })

        setGrillaDataPos(gridPos)
        setGrillaDataNeg(gridNeg)
    }

    


    useEffect(()=>{
        /*
        * receive as parameter: id: category id and the category
        */
        var familia= -1;
        var subfamilia= -1;
        var grupo= -1;
        var subgrupo= -1;
        
        if(typeof props.categoria === 'undefined')
        {
            return; 
        }

        switch(props.categoria)
        {
            case "familia": familia=props.id; break;
            case "subfamilia": subfamilia=props.id; break;
            case "grupo": grupo=props.id; break;
            case "subgrupo": subgrupo=props.id; break;
        }

        fetch(get.lista_codigos_categoria + `${familia}/${subfamilia}/${grupo}/${subgrupo}/-1`)
        .then(response=>response.json())
        .then((response)=>{
            setCodeData(
                response.data.map(
                    r=>(
                        {
                            esf: r.esf,
                            cil: r.cil,
                            codigo: r.codigo,
                        }
                    )
                )
            )
            
            calc_grilla(response.data)
        })
        
       
    },[])

    const cell_style = {
        border: "0px solid ",
        width: "32px",
        height: "12px",
        fontSize: "12px",
        textAlign: "center",
        fontWeight: "bold",
    }
    const curr_cell_style = {
        border: "1px solid black",
        width: "32px",
        height: "12px",
        fontSize: "12px",
        textAlign: "center",
        fontWeight: "bold",
    }
    const grilla = src => (
        src.map(
            r=>(
                <tr>
                    {r.map(
                        s=>(
                            <td 
                            style={{...curr_cell_style, backgroundColor: (s.e==1 ? "lightgreen": "lightblue")}}
                            onMouseEnter={(e)=>{
                                setCurrentCode(s.codigo)
                            }}
                            onMouseOut={(e)=>{
                                //e.target.style =cell_style
                            }}
                            onClick={(e)=>{
                                alert(s.codigo)
                            }}
                            >
                                {/*parseFloat(s.esf) * .01*/}
                                {/*parseFloat(s.cil) * .01*/}
                                {s.msg=="" ? <>{

                                    s.codigo==""?<></>:<>
                                    <Popover color="yellow" content={s.codigo}>
                                    {
                                        <Button style={{width:"100%", height:"100%"}} type="ghost" size="small">&nbsp;&nbsp;</Button>
                                    }
                                    </Popover>
                                    </>

                                }</>: <>{s.msg}</>}
                                
                                </td>
                        )
                    )}
                </tr>
            )
        )
    )
    return <>
    <h3>Grilla de C&oacute;digos</h3>
    <h1>{currentCode == "" ? "-" : currentCode}</h1>
    <h3>Positivo</h3>
    {grilla(grillaDataPos)}
    <h3>Negativo</h3>
    {grilla(grillaDataNeg)}

    
    </>
}

export default GrillaCristales;