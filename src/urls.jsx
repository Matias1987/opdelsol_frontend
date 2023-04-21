const remote_base_url = "http://localhost:3000/api/v1/"
const local_base_url = "http://localhost:3001/v1/"

const public_urls = {
    dashboard_deposito : local_base_url + "deposito/",
    dashboard_venta : local_base_url + "ventas/",
    dashboard_caja : local_base_url + "caja/",
    dashboard : local_base_url ,
    editar_multiplicadores : local_base_url + "deposito/stock/modificar_precios_categoria/",
    lista_subgrupos: local_base_url + "deposito/stock/listados/lista_subgrupos/"

}


const informes = {
    envio: local_base_url + "informes/envio/",
    codigos: local_base_url + "deposito/imprimir_codigos/",
    codigos_envio: local_base_url + "deposito/imprimir_codigos/",
}

const post = {
    login: remote_base_url + "usuarios/login/",
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
        modificar_multiplicador: remote_base_url + "subgrupos/modificar_multiplicador/",
    },
}

const get = {
    lista_familia: remote_base_url + "familia/",
    lista_subgrupo: remote_base_url + "subgrupos/",
    lista_envio_stock: remote_base_url + "enviostock/",
    detalle_envio: remote_base_url + "envio/",
    lista_envios: remote_base_url + "envio/",
    detalle_stock: remote_base_url + "stock/detalle/",
    sucursales: remote_base_url + "sucursales/",
    search_codigos: remote_base_url + "codigos/search/",
    detalle_codigo: remote_base_url + "codigos/"
}

module.exports = {
    post,get,informes,remote_base_url,local_base_url,public_urls,
}