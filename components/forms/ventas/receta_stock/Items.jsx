import { Form, Tabs } from "antd";
import VentasArmazon from "../Armazon";
import VentasTratamiento from "../Tratamiento";

const { default: RecStockCristal } = require("./Cristal")
    const tabs_items = [
        {
            key: 'lejos',
            label: 'Lejos',
            children: 
                <>
                <Form.Item>
                    <RecStockCristal tipo='LEJOS_OD' />
                </Form.Item>
                <Form.Item>    
                    <RecStockCristal tipo='LEJOS_OI' />
                </Form.Item>
                <Form.Item>    
                    <VentasArmazon tipo='LEJOS' buttonText={"Elejir Armazon Lejos"} />
                </Form.Item>
                <Form.Item>    
                    <VentasTratamiento tipo='LEJOS' buttonText={"Elejir Tratamiento Lejos"}/>
                </Form.Item>
                </>
            
        },
        {
            key: 'cerca',
            label: 'Cerca',
            children: 
                <>
                <Form.Item>
                    <RecStockCristal tipo='CERCA_OD' />
                </Form.Item>
                <Form.Item>    
                    <RecStockCristal tipo='CERCA_OI' />
                </Form.Item>
                <Form.Item>    
                    <VentasArmazon tipo='CERCA' buttonText={"Elejir Armazon Cerca"}/>
                </Form.Item>
                <Form.Item>    
                    <VentasTratamiento tipo='LEJOS' buttonText={"Elejir Tratamiento Cerca"}/>
                </Form.Item>
                </>
            
        }
    ]
const RecetaStockItems = (props) => {
    return <>
        <Tabs defaultActiveKey="lejos" items={tabs_items} size="large"/>
        
        
    </>
}
export default RecetaStockItems;