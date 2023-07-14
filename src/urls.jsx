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
    //ventas: 
    venta_directa: local_base_url + "ventas/Directa",
    venta_lclab: local_base_url + "ventas/LCLab",
    venta_lcstock: local_base_url + "ventas/LCStock",
    venta_multilab: local_base_url + "ventas/MultifLab",
    venta_monoflab: local_base_url + "ventas/MonofLab",
    venta_recetastock: local_base_url + "ventas/RecetaStockV2",

}


const informes = {
    envio: local_base_url + "informes/envio/",
    codigos: local_base_url + "deposito/imprimir_codigos/",
    codigos_envio: local_base_url + "deposito/imprimir_codigos/",
}

const post = {
    login: remote_base_url + "usuarios/login/",
    codigo_por_codigo: remote_base_url + "codigos/porcodigo/",
    obtener_stock_ventas: remote_base_url + "stock/obtener_stock_ventas/",
    obtener_cliente_dni: remote_base_url + "clientes/getPorDNI/",
    cargar_envio: remote_base_url+"envio/cargarEnvio/",
    venta_estado_sucursal: remote_base_url+"ventas/venta_estado_sucursal/",
    
    search:{
        filtro_stock: remote_base_url + "stock/filtro_stock/",
    },
    insert:{
        stock_lote: remote_base_url + "stock/agregar_stock/lote/",
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
        baja_desperfecto: remote_base_url + "bajadesperfecto/",
        cliente: remote_base_url + "clientes/",
        medico: remote_base_url + "medicos/",
        mutual: remote_base_url + "mutuales/",
        venta: remote_base_url + "ventas/"
        
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
        incrementar_cantidad: remote_base_url + "stock/m/incrementar_cantidad/",
        descontar_cantidad_por_codigo: remote_base_url + "stock/m/descontar_cantidad_por_codigo/",
    },
}

const get = {
    lista_codigos_categoria: remote_base_url + "codigos/lista_por_categoria/", ///:idfamilia/:idsubfamilia/:idgrupo/:idsubgrupo
    lista_familia: remote_base_url + "familia/",
    lista_subgrupo: remote_base_url + "subgrupos/",
    lista_envio_stock: remote_base_url + "enviostock/",
    detalle_envio: remote_base_url + "envio/",
    lista_envios: remote_base_url + "envio/",
    envio_pendientes: remote_base_url + "envio/envio_pendientes/",
    detalle_stock: remote_base_url + "stock/detalle/",
    sucursales: remote_base_url + "sucursales/",
    search_codigos: remote_base_url + "codigos/search/",
    detalle_codigo: remote_base_url + "codigos/",
    lista_stock: remote_base_url + "stock/",
    lista_subfamilias: remote_base_url + "subfamilia/",
    buscar_stock: remote_base_url + "stock/search/",
    buscar_stock_envios: remote_base_url + "stock/search_stock_envio/",//idsucursal/idsucursal_destino/search_value
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
    cod_sin_stock_s: remote_base_url + "stock/cod_sin_stock_s/",
    stock_exists: remote_base_url + "stock/exists/", 

    obtener_stock_sucursal: remote_base_url + "stock/stock_sucursal/",//:idsucursal/:idcodigo
    stock_codigo_sucursales: remote_base_url + "stock/stock_sucursales/", //:idcodigo
    obtener_envios_codigo: remote_base_url + "envio/envio_codigo/",//:idcodigo

    obtener_lista_baja_desperfectos: remote_base_url + "bajadesperfecto/",

    detalle_factura: remote_base_url + "facturas/",//idfactura
    elementos_factura: remote_base_url + "facturas/elementos/",//idfactura

    obtener_detalle_subgrupo: remote_base_url + "subgrupos/",//subgrupoId

    //ventas
    obtener_stock_detalles_venta: remote_base_url + "stock/detalle_stock_venta/",//:idsucursal/:idcodigo

    cliente_por_id: remote_base_url + "clientes/",
    lista_clientes: remote_base_url + "clientes/",
    buscar_cliente: remote_base_url + "clientes/buscar/",

    lista_mutuales: remote_base_url + "mutuales/",
    obtener_mutual: remote_base_url + "mutuales/",//:idmutual
    buscar_mutual: remote_base_url + "mutuales/buscar/",//:value

    lista_medicos: remote_base_url + "medicos/",
    obtener_medico: remote_base_url + "medicos/",//:idmedico
    buscar_medico: remote_base_url + "medicos/buscar/",//:value

    venta: remote_base_url + "ventas/",//:idventa
    detalle_cliente: remote_base_url + "clientes/",
    get_venta_mp: remote_base_url + "get_venta_mp/",//idVenta


}

module.exports = {
    post,get,informes,remote_base_url,local_base_url,public_urls,
}