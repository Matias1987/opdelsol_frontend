import StockForm from "@/components/forms/StockForm";

export default function AgregarStock(){
    return (
        <>
        <h1>Agregar Stock</h1>
        <StockForm  action="ADD" />
        </>
    )
}