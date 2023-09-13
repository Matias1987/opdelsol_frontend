import { get } from "@/src/urls"
import { useEffect, useState } from "react"

const GrillaCristales = (props) => {
    const [grillaData, setGrillaData]  = useState([])
    const [codeData, setCodeData] = useState([])
    const [currentCode, setCurrentCode] = useState("")

    /*const test_objects = [
        {
            esf: .25,
            cil: 2.5
        },
        {
            esf: 1.25,
            cil: 4.5
        },
        {
            esf: 5.25,
            cil: 1.0
        },
        {
            esf: 1.0,
            cil: 2.0
        },
        {
            esf: 1.25,
            cil: 0.75
        },
        {
            esf: 0,
            cil: 0
        },
    ]*/

    const calc_grilla = params => {
        let grid = []
        for(let i=0;i<1350;i+=25)
        {
            grid.push([])
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
                            msg = (parseFloat(i-25) * .01).toString()
                        }
                    }
                }

                grid[grid.length-1].push({
                    cil:j,
                    esf:i,
                    e: 0,
                    msg: msg,
                    codigo: ""
                })
            }

        }

        params.forEach(r=>{
            const e = parseInt( parseFloat(r.esf) * 100) / 25
            const c = parseInt( parseFloat(r.cil) * 100) / 25
            if(e>-1 && c>-1){
                //alert(r.codigo)
                grid[e+1][c+1].e=1
                grid[e+1][c+1].codigo = r.codigo
            }
        })

        setGrillaData(grid)
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
                                //alert(s.codigo)
                                setCurrentCode(s.codigo)
                                //e.target.style =curr_cell_style
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
                                {
                                    s.msg
                                }
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
    {
        grilla(grillaData)
    }

    
    </>
}

export default GrillaCristales;