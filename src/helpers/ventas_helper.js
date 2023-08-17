/**
 * VALIDAR CAMPOS VENTA!!!!! TO DO 
 */

const validar_ventas_base = (vta, total) => {

    if(vta.fkcliente==null)
    {
        alert("Cliente no seleccionado")
        return;
    }

    
    if(vta.mp!=null){
        if(vta.mp.total>total){
            alert("Saldo menor a 0")
            return
        }
    }

    
}

const validar_tipo = (arr, _root, field) =>
{
    if(_root[field + "_visible"])
    {
        if(_root[field] == null){
            return [...arr,{res: -2, msg: "Codigo nulo para " +  field}]
        }
        else{
            if(_root[field].codigo==null){
                return [...arr,{res: -2, msg: "Codigo nulo para " +  field}]
            }
        }
    }
    
    return arr
}

const validar_items_venta = (venta) => {
/**
 * Si un elemento esta visible hay que verificar que 
 * el el resto de los campos tenga valor!
 */
    

    var _result = []

    if(venta.productos ==null ){
        _result =  [..._result,{res: -1, msg: 'productos'}]
    }
    
    if(venta.productos!=null)
    {
        switch(+venta.tipo)
        {
            case 2: 
            alert("tipo 2 " + venta.productos["lejos_od_visible"] + " " + venta.productos["lejos_od"])
                _result = validar_tipo(_result,venta.productos,'lejos_od')
                _result = validar_tipo(_result,venta.productos,'lejos_oi')
                _result = validar_tipo(_result,venta.productos,'lejos_armazon')
                _result = validar_tipo(_result,venta.productos,'lejos_tratamiento')
                _result = validar_tipo(_result,venta.productos,'cerca_od')
                _result = validar_tipo(_result,venta.productos,'cerca_oi')
                _result = validar_tipo(_result,venta.productos,'cerca_armazon')
                _result = validar_tipo(_result,venta.productos,'cerca_tratamiento')
            break; 
            case 5:
                _result = validar_tipo(_result,venta.productos,'od')
                _result = validar_tipo(_result,venta.productos,'oi')
                _result = validar_tipo(_result,venta.productos,'armazon')
                _result = validar_tipo(_result,venta.productos,'tratamiento')
            break;
            case 4:
                _result = validar_tipo(_result,venta.productos,'lejos_od')
                _result = validar_tipo(_result,venta.productos,'lejos_oi')
                _result = validar_tipo(_result,venta.productos,'lejos_armazon')
                _result = validar_tipo(_result,venta.productos,'lejos_tratamiento')
                _result = validar_tipo(_result,venta.productos,'cerca_od')
                _result = validar_tipo(_result,venta.productos,'cerca_oi')
                _result = validar_tipo(_result,venta.productos,'cerca_armazon')
                _result = validar_tipo(_result,venta.productos,'cerca_tratamiento')
            break;
            case 3:
                _result = validar_tipo(_result,venta.productos,'od')
                _result = validar_tipo(_result,venta.productos,'oi')
                _result = validar_tipo(_result,venta.productos,'insumo')
            break;
            case 6:
                _result = validar_tipo(_result,venta.productos,'od')
                _result = validar_tipo(_result,venta.productos,'oi')
                _result = validar_tipo(_result,venta.productos,'insumo')
            break;

        }
    }
    return _result;

    
}

module.exports = {validar_items_venta,validar_ventas_base}