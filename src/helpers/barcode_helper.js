const regex_format = /^SL[0-9]+$/

const exec_barcode_pattern = (str) => regex_format.exec(str)

const is_barcode_pattern = (str) => regex_format.exec(str) !== null

const get_barcode_from_id = (str) => {
    var r = "";
	for(let i=0;i<6;i++){
		r = (i < str.length ? str.charAt(str.length -1 -i) : "0") + r ;
	}
	return "SL"+r;
}
const get_barcode_from_id2 = (id) => {
	return "SL"+id;
}

const regex_get_id_if_match = (str) => {
    if(regex_format.exec !== null){
        const t = /[0-9]+/.exec(str)
        if(t!==null){
            return parseInt(t[0])
        }
    }
    return -1;
}
module.exports = {
    regex_format,
    exec_barcode_pattern,
    is_barcode_pattern,
    regex_get_id_if_match,
    get_barcode_from_id,
    get_barcode_from_id2
}