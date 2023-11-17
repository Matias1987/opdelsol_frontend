import { get } from "@/src/urls";
import { Col, Row, Table, Tag } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { currency_format } from "@/src/helpers/string_helper";



const ListaVentasAdmin = (props) =>{
    const [dataSource, setDataSource] = useState([])
    const [count, setCount] = useState(0);
    ChartJS.register(ArcElement, Tooltip, Legend);

/*const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };*/


    const update = ( ) => {
        //alert("updating")
        console.log("run user effect  key " + props.key )
        console.log(get.obtener_lista_ventas_admin)
        fetch(get.obtener_lista_ventas_admin)
        .then(response=>{return response.json()})
        .then((response)=>{
            //alert(JSON.stringify(response))
            
            setDataSource(response.data.map(
                r=>({
                    sucursal: r.sucursal,
                    vendedor: r.vendedor,
                    cliente: r.cliente,
                    monto_total: r.monto_total,
                    color: r.color,
                })
            ))
        })
    }
 
    useEffect(()=>{
        const interval = setInterval(() => { 
            update()
            setCount(count + 1); 
            
        }, 5000); 
  
        //Clearing the interval 
        return () => clearInterval(interval); 
    },[count]);
    return <>
        <h4>Lista de Ventas</h4>
        <Row>
            <Col span={24}>
                <Table 
                size="small"
                    dataSource={dataSource}
                    columns={
                        [
                            {title:"Sucursal", dataIndex:"sucursal", render:(_,{sucursal,color})=>(<Tag color={color}>{sucursal}</Tag>)},
                            {title:"Vendedor", dataIndex:"vendedor"},
                            {title:"Cliente", dataIndex:"cliente"},
                            {title:"Monto", dataIndex:"monto_total", render:(_,{monto_total})=>(<div style={{textAlign:"right"}}>{"$ " + currency_format(monto_total)}</div>)},
                        ]
                    }
                    />
            </Col>
            {/*<Col span={12}>
                <Pie data={data} />
                </Col>*/}
        </Row>
        
    </>
}

export default ListaVentasAdmin;