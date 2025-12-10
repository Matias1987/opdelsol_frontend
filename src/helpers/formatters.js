module.exports = {
    formatFloat: (number) => {
        return parseFloat(number).toLocaleString('de-DE', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2});
    } ,
}