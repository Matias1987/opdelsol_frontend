/**
 * VALIDAR CAMPOS VENTA!!!!! TO DO 
 */

//const { post } = require("../urls")
/*import globals from "../globals";
import {post} from "../urls";

import {registrar_evento} from "./evento_helper";
import {validar_modo_pago} from "./pago_helper";
import {post_method} from "./post_helper";*/

const { default: globals } = require("../globals");
const { post } = require("../urls");
const { registrar_evento } = require("./evento_helper");
const { validar_modo_pago } = require("./pago_helper");
const { post_method } = require("./post_helper");
const { validate_only_numbers_and_letters } = require("./string_helper");


const validar_tipo = (arr, _root, field, aditional_fields) =>
{
    //alert(JSON.stringify(_root))
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
            //alert("root: " + JSON.stringify(_root  ) + "  " + JSON.stringify(aditional_fields) + " field: " + field)
            for(let i=0;i<aditional_fields.length;i++){

                if(_root[field][aditional_fields[i]].trim().length<1)
                {
                    return [...arr,{res: -2, msg: "Error: Campo vacio para   " +  aditional_fields[i] + "     " + field}]
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
                _result = validar_tipo(_result,venta.productos,'od', [])
                _result = validar_tipo(_result,venta.productos,'oi', [])
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
/**
 * 
 * @param {*} v 
 * @param {*} productos 
 * @param {*} total 
 * @param {*} subTotal 
 * @param {*} tipo_vta 
 * @param {*} validate_items 
 * @param {*} callbackOnComplete 
 * @param {*} options array: [ignore_fecha_retiro]
 * @returns void
 */
const submit_venta = (v, productos,total,subTotal, tipo_vta, validate_items, callbackOnComplete, options, callbackOnFailValidation) => {

    const ignore_fecha_retiro = options?.ignore_fecha_retiro||null

    if(ignore_fecha_retiro == null)
    {
        if(v.fechaRetiro==null)
        {
            alert("Fecha de retiro no seleccionada")
            callbackOnFailValidation?.()
            return false
        }
    }

    if(productos==null)
    {
        alert("Sin Productos")
        callbackOnFailValidation?.()
        return false
    }

    if(v.fkcliente==null)
    {
        alert("Cliente no seleccionado")
        callbackOnFailValidation?.()
        return false;
    }

    if(v.fkmedico==null){
        alert("Medico no seleccionado")
        callbackOnFailValidation?.()
        return false
    }

    
    if(v.mp!=null){
        if(v.mp.total>total){
            alert("Saldo menor a 0")
            callbackOnFailValidation?.()
            return false
        }
    }

    if((v.comentarios.length||"")>0)
    {
        if(!validate_only_numbers_and_letters(v.comentarios))
        {
            alert("Comentarios sólo acepta letras, números, y el punto.")
            callbackOnFailValidation?.()
            return false
        }
    }

    globals.obtenerCajaAsync((result)=>{

        if(result===null)
        {
            alert("Caja cerrada o Desactualizada")
            callbackOnFailValidation?.()
            return false;
        }

        const __venta = {
            ...v, 
            json_items: JSON.stringify(productos),
            productos:productos, 
            tipo:tipo_vta, 
            total: total,
            subtotal: subTotal,
            fkcaja: result.idcaja,
        }
    
        const _res1 = validar_modo_pago(__venta.mp)

        if(_res1!=null){
            alert("Error. "+_res1.msg)
            callbackOnFailValidation?.()
            return  false
        }

        //it may not be neccessary to validate the items... 
        if(validate_items)
        {
            const _res = validar_items_venta(__venta)
            
            if(_res.length>0){
                //only show 1 error per try 
                alert(_res[0].msg)
                callbackOnFailValidation?.()
                return false
            }
        }
        /**
         * validar cantidad stock 
         */
        //alert(JSON.stringify(productos))
        {
            post_method(post.update.verificar_cantidades_productos,{productos: productos, idsucursal: globals.obtenerSucursal(),tipo:tipo_vta},(_response)=>{
                
                if(_response?.data?.error == 1){
                    alert("Error, cantidad insuficiente codigo: " + _response?.data?.ref?.codigo)
                    callbackOnFailValidation?.()
                    return false
                }
                else
                {
                    if(confirm("Confirmar Venta"))
                    {
                        post_method(post.insert.venta,__venta,(response)=>{
                            //THIS SHOULD NOT BE HERE! but it is
                            post_method(post.update.desc_cantidades_stock_venta,{idventa: response.data, idsucursal: globals.obtenerSucursal()},()=>{
                                console.log("Cantidades descontadas? ...")
                            })

                            registrar_evento("VENTA", "Venta Generada $" + total, response.data)
            
                            callbackOnComplete?.(response.data)
                                
                            })

                        return true
                    }

                    callbackOnFailValidation?.()
                    return false

                }
                
            })
        }
    });
    
}


module.exports = {validar_items_venta,submit_venta}