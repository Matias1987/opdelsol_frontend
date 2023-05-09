//const remote_base_url = "http://54.90.66.197:3001/api/v1/"
//const local_base_url = "http://54.90.66.197:3000/v1/"
const remote_base_url = "http://localhost:3001/api/v1/"
const local_base_url = "http://localhost:3000/v1/"
const token = "&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpYXQiOjE2ODI0NjEwMjksImV4cCI6MTY4MjQ2NDYyOX0.Unf5zmxNVQCJVD4qxSAcdcmsrs1s-q4h7Q0e2dYHHEo";
const public_urls = {
    dashboard_deposito : local_base_url + "deposito/",
    dashboard_venta : local_base_url + "ventas/",
    dashboard_caja : local_base_url + "caja/",
    dashboard : local_base_url ,
    editar_multiplicadores : local_base_url + "deposito/stock/modificar_precios_categoria/",
    lista_subgrupos: local_base_url + "deposito/stock/listados/lista_subgrupos/",
    login: local_base_url + "usuario/login/login",
    nuevo_envio: local_base_url + "deposito/envio/nuevo_envio",
    lista_stock: local_base_url + "deposito/stock/listados/lista_stock",

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
        modificar_cantidad: remote_base_url + "stock/m/modificar_cantidad/",

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
    detalle_codigo: remote_base_url + "codigos/",
    lista_stock: remote_base_url + "stock/",
    lista_subfamilias: remote_base_url + "subfamilia/",
    buscar_stock: remote_base_url + "stock/search/",
    lista_grupos: remote_base_url + "grupos/",
    lista_codigos: remote_base_url + "codigos/",
    check_login: remote_base_url + "usuarios/l/checklogin/",
    logout: remote_base_url + "usuarios/l/logout/",
    familia_menu_opt: remote_base_url + "familia/menu/options/",
    subfamilia_menu_opt: remote_base_url + "subfamilia/optionsforfamilia/",
    lista_proveedores: remote_base_url + "proveedores/",
    lista_stock_porsubgrupo: remote_base_url + "stock/porsubgrupo",
    lista_facturas: remote_base_url + "facturas/",
    optionsforfamilia: remote_base_url + "subfamilia/optionsforfamilia/",
    optionsforsubfamilia: remote_base_url + "grupos/optionsforsubfamilia/",
    optionsforgrupo: remote_base_url + "subgrupos/optionsforgrupo/",
    codigosOptSubgrupo: remote_base_url + "codigos/optforsubgrupo/",
    sucursal_details: remote_base_url + "sucursales/",

}

module.exports = {
    post,get,informes,remote_base_url,local_base_url,public_urls,
}