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

const validar_tipo = (arr, _root, field, aditional_fields) =>
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

        if(typeof aditional_fields !== 'undefined'){
        
            /**
             * check if additional fields are empty!
             * the default value of the aditional items should be an empty string... (TO DO!)
             */
            for(let i=0;i<aditional_fields.length;i++){
                if(_root[field][aditional_fields[i]].trim().length()<1)
                {
                    return [...arr,{res: -2, msg: "Campo vacio para " +  aditional_fields[i]}]
                }
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
            case 2: //receta stock
            //alert("tipo 2 " + venta.productos["lejos_od_visible"] + " " + venta.productos["lejos_od"])
                _result = validar_tipo(_result,venta.productos,'lejos_od',['eje'])
                _result = validar_tipo(_result,venta.productos,'lejos_oi',['eje'])
                _result = validar_tipo(_result,venta.productos,'lejos_armazon')
                _result = validar_tipo(_result,venta.productos,'lejos_tratamiento')
                _result = validar_tipo(_result,venta.productos,'cerca_od',['eje'])
                _result = validar_tipo(_result,venta.productos,'cerca_oi',['eje'])
                _result = validar_tipo(_result,venta.productos,'cerca_armazon')
                _result = validar_tipo(_result,venta.productos,'cerca_tratamiento')
            break; 
            case 5: //multif lab
                _result = validar_tipo(_result,venta.productos,'od',['eje','esf','cil'])
                _result = validar_tipo(_result,venta.productos,'oi',['eje','esf','cil'])
                _result = validar_tipo(_result,venta.productos,'armazon')
                _result = validar_tipo(_result,venta.productos,'tratamiento')
            break;
            case 4://monof lab
                _result = validar_tipo(_result,venta.productos,'lejos_od',['eje','esf','cil'])
                _result = validar_tipo(_result,venta.productos,'lejos_oi',['eje','esf','cil'])
                _result = validar_tipo(_result,venta.productos,'lejos_armazon')
                _result = validar_tipo(_result,venta.productos,'lejos_tratamiento')
                _result = validar_tipo(_result,venta.productos,'cerca_od',['eje','esf','cil'])
                _result = validar_tipo(_result,venta.productos,'cerca_oi',['eje','esf','cil'])
                _result = validar_tipo(_result,venta.productos,'cerca_armazon')
                _result = validar_tipo(_result,venta.productos,'cerca_tratamiento')
            break;
            case 3://lc stock
                _result = validar_tipo(_result,venta.productos,'od', ['eje'])
                _result = validar_tipo(_result,venta.productos,'oi', ['eje'])
                _result = validar_tipo(_result,venta.productos,'insumo')
            break;
            case 6://lc lab
                _result = validar_tipo(_result,venta.productos,'od')
                _result = validar_tipo(_result,venta.productos,'oi')
                _result = validar_tipo(_result,venta.productos,'insumo')
            break;

        }
    }
    return _result;

    
}

module.exports = {validar_items_venta,validar_ventas_base}