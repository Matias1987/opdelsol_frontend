import VentasInsumo from "../Insumo";
import LCItem from "./lc_item";

const LCStockItems = (props) => {

    const [items, setItems] = useState({
        codigo: null,
        precio: 0,
        cantidad: 0,
    })
    
    const onChange= ( index, value) => {
        setItems((items)=>{
            const _items = {...items,[index]:value};
            props?.callback(_items);
            return _items;
        })
    }

    return (
    <>
    <LCItem />
    <LCItem />  
    <VentasInsumo callback={(v)=>{}} />
    </>
    )
}

export default LCStockItems;