import VentasInsumo from "../Insumo";
import LCItem from "./lc_item";

const LCStockItems = (props) => {
    return (
    <>
    <LCItem />
    <LCItem />  
    <VentasInsumo callback={(v)=>{}} />
    </>
    )
}

export default LCStockItems;