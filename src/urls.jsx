const base_url = "http://localhost:3000/api/v1/"
const post = {
    insert:{
        familia: base_url + "",
        subfamilia: base_url + "",
        grupo: base_url + "",
        subgrupo: base_url + "",
        codigo: base_url + "",
        stock: base_url + "",
        envio: base_url + "",
        factura: base_url + "",
        proveedor: base_url + "proveedores/",
        sucursal: base_url + "",
    },
    update:{
        familia: base_url + "",
        subfamilia: base_url + "",
        grupo: base_url + "",
        subgrupo: base_url + "",
        codigo: base_url + "",
        stock: base_url + "",
        envio: base_url + "",
        factura: base_url + "",
        proveedor: base_url + "",
        sucursal: base_url + "",
    },
}

module.exports = {
    post,
}