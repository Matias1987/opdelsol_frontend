import { Form } from "antd";
import VentasArmazon from "../Armazon";
import VentasTratamiento from "../Tratamiento";

const { default: RecStockCristal } = require("./Cristal")

const RecetaStockItems = (props) => {
    return <>
        <Form.Item>
            {/* Lejos */}
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
        <Form.Item>
            {/* Cerca */}
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
export default RecetaStockItems;