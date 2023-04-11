const base_url = "http://localhost:3000/api/v1/"

const post = {
    insert:{
        familia: base_url + "familia/",
        subfamilia: base_url + "subfamilia/",
        grupo: base_url + "grupos/",
        subgrupo: base_url + "subgrupos/",
        codigo: base_url + "codigos/",
        stock: base_url + "stock/",
        envio: base_url + "envio/",
        factura: base_url + "facturas/",
        proveedor: base_url + "proveedores/",
        sucursal: base_url + "sucursales/",
    },
    update:{
        familia: base_url + "familia/",
        subfamilia: base_url + "subfamilia/",
        grupo: base_url + "grupos/",
        subgrupo: base_url + "subgrupos/",
        codigo: base_url + "codigo/",
        stock: base_url + "stock/",
        envio: base_url + "envio/",
        factura: base_url + "facturas/",
        proveedor: base_url + "proveedores/",
        sucursal: base_url + "sucursales/",
    },
}

const get = {
    lista_envio_stock: base_url + "enviostock/",
    detalle_envio: base_url + "envio/",
}

module.exports = {
    post,get
}