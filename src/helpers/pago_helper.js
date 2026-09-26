
const validar_modo_pago = (mp) => {

    if(mp==null){
        return null;
    }
    if(mp.tarjeta_monto!=0)
    {
        if(mp.fk_tarjeta == null){
            return {msg:"Tarjeta no seleccionada",tipo: -1}
        }
    }
    if(mp.ctacte_monto!=0)
    {
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
    if(mp.transferencia_monto!=0)
    {
        if(mp.fk_banco_transferencia == null){
            return {msg:"Banco no seleccionado",tipo: -1}
        }
    }

    return null;

}

module.exports = {validar_modo_pago}