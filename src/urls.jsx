const remote_base_url = "http://localhost:3000/api/v1/"
const local_base_url = "http://localhost:3001/v1/"

const informes = {
    envio: local_base_url + "informes/envio/",
}

const post = {
    insert:{
        familia: remote_base_url + "familia/",
        subfamilia: remote_base_url + "subfamilia/",
        grupo: remote_base_url + "grupos/",
        subgrupo: remote_base_url + "subgrupos/",
        codigo: remote_base_url + "codigos/",
        stock: remote_base_url + "stock/",
        envio: remote_base_url + "envio/",
        factura: remote_base_url + "facturas/",
        proveedor: remote_base_url + "proveedores/",
        sucursal: remote_base_url + "sucursales/",
    },
    update:{
        familia: remote_base_url + "familia/",
        subfamilia: remote_base_url + "subfamilia/",
        grupo: remote_base_url + "grupos/",
        subgrupo: remote_base_url + "subgrupos/",
        codigo: remote_base_url + "codigo/",
        stock: remote_base_url + "stock/",
        envio: remote_base_url + "envio/",
        factura: remote_base_url + "facturas/",
        proveedor: remote_base_url + "proveedores/",
        sucursal: remote_base_url + "sucursales/",
    },
}

const get = {
    lista_envio_stock: remote_base_url + "enviostock/",
    detalle_envio: remote_base_url + "envio/",
    detalle_stock: remote_base_url + "stock/detalle/",
    sucursales: remote_base_url + "sucursales/",
    search_codigos: remote_base_url + "codigos/search/",
    detalle_codigo: remote_base_url + "codigos/"
}

module.exports = {
    post,get,informes,remote_base_url,local_base_url,
}