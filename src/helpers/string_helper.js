//////

const parse_DMY_date = (_date) => {
    //date with format dd/mm/yyyy
    let parts = _date.split("-")
    return new Date(parts[2],parts[1]-1,parts[0])
}

const convertToWords = (value) => {
    const _analizeNumber = (_tem_str) =>
        {
            //alert("input -->> " + tem_str);
            //alert("input -->> length " + tem_str.toString().length);
            var tem_str = _tem_str.toString();
            var result = "";
            var _temp = 0;
            var resto = 0;
            var parsed = parseInt(tem_str);
            if (tem_str.length > 9)
            {
                _temp = parsed / 1000000000;
                resto = parsed % 1000000000;
                result += _analizeCentena(_temp) + " mil millones ";
            }
            else
            {
                if (tem_str.length > 6)
                {
                    _temp = parsed / 1000000;
                    resto = parsed % 1000000;
                    result += _analizeCentena(_temp.ToString()) + " millones ";
                }
                else
                {
                    if (tem_str.length > 3)
                    {
                        _temp = parsed / 1000;
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
                            alert("ss")
                            result += _analizeCentena(tem_str);
                        }
                    }
                }
            }
            console.log("-->> " + resto);
            if (resto > 0)
            {
                result += _analizeNumber_(resto);
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
                    _nmbr = value / 100;
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
                    _nmbr = value / 10;
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
                                    _number = _number.substring(1, _number.Length - 1);

                                    var _dec = parseInt(_number);

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

            var tem_str = _number.substring(1, _number.Length - 1);
            console.log(tem_str.length);

            if (tem_str.length > 0)
            {
                result += _analizeCentena(tem_str);
            }

            return result;

        }
	let integer_part = parseInt(value)
	let decimal_part = parseInt((value - parseFloat(integer_part)) * 100);
	
	alert("value " + value + " decimal_part " + decimal_part);

	var __temp = parseFloat(integer_part) + parseFloat(decimal_part) * 0.01;
    //alert(__temp)
	if (__temp < value)
	{
		decimal_part++;
	}
	else if (__temp > value)
	{
		decimal_part--;
	}

	//alert("value " + value + " decimal_part " + decimal_part);

	var str_int = _analizeNumber(integer_part);
	var str_flt = _analizeNumber(decimal_part);

	if (str_flt.length > 0)
	{
		return str_int + " PESOS CON " + str_flt + " CENTAVOS ";
	}
	else
	{
		return str_int + " PESOS";
	}



	
}




module.exports={parse_DMY_date, convertToWords}