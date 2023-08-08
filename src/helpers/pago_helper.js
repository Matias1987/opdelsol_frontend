
const validar_modo_pago = (mp) => {

    if(mp==null){
        return null;
    }
    //alert("------------------" +JSON.stringify(mp))
    if(mp.tarjeta_monto!=0)
    {
        if(mp.fk_tarjeta == null){
            return {msg:"Tarjeta no seleccionada",tipo: -1}
        }
    }
    if(mp.ctacte_monto!=0)
    {
        //alert(`ctacte ${mp.ctacte_cuotas}   ${mp.ctacte_monto_cuotas}`)
        if(mp.ctacte_cuotas == 0){
             return {msg:"Cant. de cuotas igual a 0",tipo: -1}
        }
        if(mp.ctacte_monto_cuotas == 0){
            return {msg:"Monto cuota igual a 0",tipo: -1}
        }
    }
    if(mp.cheque_monto!=0)
    {
        if(mp.fk_banco == null){
            return {msg:"Banco no seleccionado",tipo: -1}
        }
    }

    return null;
    /*if(mp.mutual_monto!=0)
    {
        return {msg:"",tipo: -1}
    }*/
}

module.exports = {validar_modo_pago}