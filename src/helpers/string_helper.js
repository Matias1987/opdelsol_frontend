//////

//s is from space
const reg_only_numbers_and_letters_s = /^[a-zA-Z\s0-9\.ñÑáéíóúÁÉÍÓÚ]+$/

const reg_only_letters_s = /^[a-zA-Z\s]+$/

const reg_only_numbers_dec_s = /^[\.\s0-9]+$/

const reg_only_numbers_dec = /^[0-9\.]+$/

const reg_only_numbers_int = /^[0-9]+$/

const validate_esf_cil_eje = (value) => /^[\-\+]?[0-9\.]*$/.test((value||"").trim())

const validate_only_numbers_and_letters = (value) => {
    return reg_only_numbers_and_letters_s.test((value||"").toString().trim()) 
}

const validate_signed_number = (value) => {
    const _v = ((value||"").toString()).trim()
    return (/^(\+|\-)?[\.0-9]+$/).test(_v) ?  _v : "0"
}

const parse_int_string = (value) => {
    return (value||"").toString().length <1 ? 0 : parseInt(value)
}

const parse_float_string = (value) => {
    return (value||"").toString().length <1 ? 0 : parseFloat(value)
}

const round_float = (value, base=10) => {
    return Math.round(Math.trunc(value / base)) * base
}

const currency_format = (value) => {
    return parseFloat(value).toLocaleString()
}

const current_date = (separator="-") => {
    const date = new Date()
    return `${date.getDate().toString()}${separator}${(date.getMonth()+1).toString()}${separator}${date.getFullYear().toString()}`

}
const current_date_ymd = (separator="-") => {
    const date = new Date()
    return `${date.getFullYear().toString()}${separator}${(date.getMonth()+1).toString()}${separator}${date.getDate().toString()}`

}
const format_date = (date, separator="-") => {
    return `${date.getDate().toString()}${separator}${(date.getMonth()+1).toString()}${separator}${date.getFullYear().toString()}`

}

const parse_DMY_date = (_date) => {
    //date with format dd/mm/yyyy
    let parts = _date.split("-")
    return new Date(parts[2],parts[1]-1,parts[0])
}

const convertToWords = (value, centavos=true) => {
    //#region
    const unidades = [
        "uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve",
     ];

    const decenas = [
            "diez","veinte","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa",
        ];

    const diez_y = [ "once", "doce", "trece", "catorce", "quince", "dieciseis", "diecisiete", "dieciocho", "diecinueve" ];

    const centenas = [
            "ciento","doscientos","trescientos","cuatrocientos","quinientos","seiscientos","setecientos","ochocientos","novecientos",
        ];

    //endregion    
    const _analizeNumber = (_tem_str) =>
        {
            var tem_str = _tem_str.toString();
            var result = "";
            var _temp = 0;
            var resto = 0;
            var parsed = parseInt(tem_str);
            if (tem_str.length > 9)
            {
                _temp = Math.trunc(parsed / 1000000000);
                resto = parsed % 1000000000;
                result += _analizeCentena(_temp) + " mil millones ";
            }
            else
            {
                if (tem_str.length > 6)
                {
                    _temp = Math.trunc(parsed / 1000000);
                    resto = parsed % 1000000;
                    result += _analizeCentena(_temp.toString()) + " millones ";
                }
                else
                {
                    if (tem_str.length > 3)
                    {
                        
                        _temp = Math.trunc(parsed / 1000);
                        resto = parsed % 1000;
                        if (_temp == 1)
                        {
                            result = "mil ";
                        }
                        else
                        {
                            result += _analizeCentena(_temp) + " mil ";
                        }

                    }
                    else
                    {
                        if (tem_str.length > 0)
                        {
                            
                            result += _analizeCentena(tem_str);
                        }
                    }
                }
            }
           
            if (resto > 0)
            {
                result += _analizeNumber(resto);
            }
            
            return result;
        }

    const  _analizeCentena = (__number) =>
        {
            var _number = __number.toString()
            var result = "";
            var value = parseInt(_number);
            var _nmbr = 0;
            switch (_number.length)
            {
                case 3:
                    _nmbr = Math.trunc(value / 100);
                    if (_nmbr != 0)
                    {
                        if (_nmbr == 1 && value == 100)
                        {
                            result = "cien ";
                        }
                        else
                        {
                            result = centenas[_nmbr - 1] + " ";
                        }
                    }
                    break;
                case 2:
                    _nmbr = Math.trunc(value / 10);
                    if (_nmbr != 0)
                    {
                        if (_nmbr == 2 && value > 20)
                        {
                            result = "veinti";
                        }
                        else
                        {
                            if (_nmbr == 1)
                            {
                                if (value > 10)
                                {
                                  
                                    //_number = _number.substring(1, _number.length);
                        
                                    //var _dec = parseInt(_number);

                                    var _dec = value - 10;

                                    _number=_dec.toString()
                 
                                    result = diez_y[_dec - 1];
                                }
                                else
                                {
                                    result = "diez";
                                }
                            }
                            else
                            {
                                result = decenas[_nmbr - 1];
                                if (value % 10 > 0)
                                {
                                    result += " y ";
                                }    
                            }
                        }
                    }
                    break;
                case 1:
                    
                    _nmbr = value / 1;
                    if (_nmbr != 0)
                    {

                        result = unidades[_nmbr - 1] + " ";
                    }
                    break;
            }


            if(_number.length>1)
            {
                var tem_str = _number.substring(1, _number.length);
               
                if (tem_str.length > 0)
                {
                    result += _analizeCentena(tem_str);
                }
             }
           
            return result;

        }
	let integer_part = parseInt(value)
	let decimal_part = parseInt((value - parseFloat(integer_part)) * 100);
	
	var __temp = parseFloat(integer_part) + parseFloat(decimal_part) * 0.01;
    
	if (__temp < value)
	{
		decimal_part++;
	}
	else if (__temp > value)
	{
		decimal_part--;
	}

	
	var str_int = _analizeNumber(integer_part);
	var str_flt = _analizeNumber(decimal_part);

    const show_cents = typeof centavos === 'undefined' ? true : centavos;

	if (str_flt.length > 0 && show_cents)
	{
		return str_int + " PESOS CON " + str_flt + " CENTAVOS ";
	}
	else
	{
		return  str_int.toUpperCase() + " PESOS";
	}



	
}

  const convertInputToUpper = (event) => {
    const { target } = event;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    // Preserve the cursor position
    const { selectionStart, selectionEnd } = target;
    target.value = target.value.toUpperCase();
    target.setSelectionRange(selectionStart, selectionEnd);
  };



module.exports={
    validate_esf_cil_eje,
    parse_int_string,
    parse_float_string,
    round_float,
    current_date_ymd,
    parse_DMY_date, 
    convertToWords, 
    current_date, 
    format_date, 
    currency_format,
    validate_signed_number,
    validate_only_numbers_and_letters,
    convertInputToUpper,
    reg_only_letters_s,
    reg_only_numbers_and_letters_s,
    reg_only_numbers_dec,
    reg_only_numbers_dec_s,
    reg_only_numbers_int,
}