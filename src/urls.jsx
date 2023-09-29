//const remote_base_url = "http://54.90.66.197:3001/api/v1/"
//const remote_base_url = "http://54.90.66.197:3001/api/v1/"
//const local_base_url = "http://54.90.66.197:3000/v1/"
//const local_base_url = "http://gestion.opticadelsol.com/v1/"
const remote_base_url = "http://localhost:3001/api/v1/"
const local_base_url = "http://localhost:3000/v1/"
//const token = "&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpYXQiOjE2ODI0NjEwMjksImV4cCI6MTY4MjQ2NDYyOX0.Unf5zmxNVQCJVD4qxSAcdcmsrs1s-q4h7Q0e2dYHHEo";
const public_urls = {
    dashboard_admin : local_base_url + "admin/",
    dashboard_deposito : local_base_url + "deposito/",
    dashboard_venta : local_base_url + "ventas/",
    dashboard_caja : local_base_url + "caja/",
    dashboard_laboratorio : local_base_url + "laboratorio/",
    dashboard : local_base_url ,
    editar_multiplicadores : local_base_url + "deposito/stock/modificar_precios_categoria/",
    lista_subgrupos: local_base_url + "deposito/stock/listados/lista_subgrupos/",
    login: local_base_url + "usuario/login/login",
    nuevo_envio: local_base_url + "deposito/envio/nuevo_envio",
    lista_stock: local_base_url + "deposito/stock/listados/lista_stock",
    modo: local_base_url + "Modo",
    //ventas: 
    venta_directa: local_base_url + "ventas/Directa",
    venta_lclab: local_base_url + "ventas/LCLab",
    venta_lcstock: local_base_url + "ventas/LCStock",
    venta_multilab: local_base_url + "ventas/MultifLab",
    venta_monoflab: local_base_url + "ventas/MonofLab",
    venta_recetastock: local_base_url + "ventas/RecetaStockV2",
    //caja
    lista_caja: local_base_url + "caja/lista_caja",
    caja_diaria: local_base_url + "caja/caja_diaria",
    cargar_gasto: local_base_url + "caja/CargaGasto/",
    lista_gastos: local_base_url + "caja/ListaGastos/",
    lista_cobros_sucursal: local_base_url + "caja/ListaCobros/",
    cierre_caja: local_base_url + "caja/",
    inicio_caja: local_base_url + "caja/",
    caja_admin: local_base_url + "caja/panelCajaAdmin/",
    listado_caja: local_base_url + "caja/",
    ventas_ingresadas: local_base_url + "caja/ventas_ingresadas",
    ventas_pendientes: local_base_url + "caja/ventas_pendientes",
    ventas_pendientes_lab: local_base_url + "caja/ventas_en_laboratorio",
    ventas_terminadas: local_base_url + "caja/ventas_terminadas",
    ventas_entregadas: local_base_url + "caja/ventas_entregadas",
    ventas_anuladas: local_base_url + "caja/ventas_anuladas",
    
    lista_clientes_caja: local_base_url + "caja/ListaClientesCaja",

    lista_clientes_ventas: local_base_url + "ventas/listados/ListaClientesVentas",
    //laboratorio
    lista_operaciones_laboratorio: local_base_url + "laboratorio/lista_operaciones_laboratorio",

    transferencias: local_base_url + "caja/lista_transferencia_sucursal",

    arbol_codigos: local_base_url + "deposito/arbol_codigos",

    editar_precios: local_base_url + "deposito/stock/editar_precios",
    

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
    obtener_lista_cobros: remote_base_url+"cobros/lista/",
    cambiar_estado_venta: remote_base_url + "ventas/cambiar_estado/",
    
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
        venta: remote_base_url + "ventas/",
        cobro: remote_base_url + "cobros/",
        carga_manual: remote_base_url + "cargamanual/",
        gasto: remote_base_url + "gastos/",
        caja: remote_base_url + "caja/",
        transferencia: remote_base_url + "transferencias/",
        destinatario: remote_base_url + "cliente/destinatario/",
        mensajes: remote_base_url + "mensajes/",
        pagare: remote_base_url + "pagares/",
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
        cambiar_venta_sucursal_deposito: remote_base_url +"ventas/cambiar_venta_sucursal_deposito/",
        inc_cantidades_stock_venta: remote_base_url +"ventas/inc_cantidades_stock_venta/",
        desc_cantidades_stock_venta: remote_base_url +"ventas/desc_cantidades_stock_venta/",
        modificar_precios_defecto_subgrupo: remote_base_url + "subgrupos/modificar_precios_defecto/",
        modificar_cantidad_categoria: remote_base_url + "stock/m/modificar_cantidad_categoria/",
        verificar_cantidades_productos: remote_base_url + "stock/verificar_cantidades_productos/",

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
    descripcion_cat_subgrupo: remote_base_url + "subgrupos/descripcion_cat_subgrupo/",//:subgrupoId

    obtener_stock_sucursal: remote_base_url + "stock/stock_sucursal/",//:idsucursal/:idcodigo
    stock_codigo_sucursales: remote_base_url + "stock/stock_sucursales/", //:idcodigo
    obtener_envios_codigo: remote_base_url + "envio/envio_codigo/",//:idcodigo

    obtener_lista_baja_desperfectos: remote_base_url + "bajadesperfecto/",

    detalle_factura: remote_base_url + "facturas/",//idfactura
    elementos_factura: remote_base_url + "facturas/elementos/",//idfactura

    obtener_detalle_subgrupo: remote_base_url + "subgrupos/",//subgrupoId

    //ventas
    obtener_stock_detalles_venta: remote_base_url + "stock/detalle_stock_venta/",//:idsucursal/:idcodigo

    //clientes
    cliente_por_id: remote_base_url + "clientes/",
    lista_clientes: remote_base_url + "clientes/",
    operaciones_cliente: remote_base_url + "clientes/operaciones/",
    buscar_cliente: remote_base_url + "clientes/buscar/",
    saldo_ctacte: remote_base_url + "clientes/saldo/ctacte/",//:idcliente
    actualizar_saldo_en_cobro: remote_base_url + "clientes/actualizar_saldo_en_cobro/",//:idcobro

    bloquear_cliente: remote_base_url + "clientes/bloquear/",//:idcliente
    desbloquear_cliente: remote_base_url + "clientes/desbloquear/",//:idcliente

    lista_mutuales: remote_base_url + "mutuales/",
    obtener_mutual: remote_base_url + "mutuales/",//:idmutual
    buscar_mutual: remote_base_url + "mutuales/buscar/",//:value

    lista_medicos: remote_base_url + "medicos/",
    obtener_medico: remote_base_url + "medicos/",//:idmedico
    buscar_medico: remote_base_url + "medicos/buscar/",//:value

    venta: remote_base_url + "ventas/",//:idventa
    detalle_cliente: remote_base_url + "clientes/",
    get_venta_mp: remote_base_url + "ventas/get_venta_mp/",//idVenta
    get_venta_mp_ctacte: remote_base_url + "ventas/get_venta_mp_ctacte/",//idVenta
    
    obtener_venta_items: remote_base_url + "ventas/get_venta_items/",//idventa

    actualizar_saldo_cliente: remote_base_url + "clientes/actualizar_saldo_cliente/",//clienteId
    
    //cobros
    detalle_cobro: remote_base_url + "cobros/",//idcobro
    lista_mp_cobro: remote_base_url + "cobros/mp/",//idcobro

    //gastos
    conceptos_gasto: remote_base_url + "conceptogastos/",
    lista_gastos_sucursal: remote_base_url + "gastos/g_s/",//:idsucursal
    lista_gastos_caja: remote_base_url + "gastos/g_c/",//:idcaja

    //caja
    caja: remote_base_url + "caja/c/",//idsucursal
    cerrar_caja: remote_base_url + "caja/cerrar/",//idcaja
    informe_caja: remote_base_url + "caja/inf/",
    lista_caja_sucursal: remote_base_url + "caja/lista/",
    caja_id: remote_base_url + "caja/",//idsucursal

    //tarjetas
    lista_tarjetas: remote_base_url + "tarjetas/", 

    lista_bancos: remote_base_url + "bancos/",

    stock_full: remote_base_url + "stock/get/subgrupos/full/list/",

    //transferencias

    transferencias_enviadas: remote_base_url + "transferencias/enviadas/",//idsucursal
    transferencias_recibidas: remote_base_url + "transferencias/recibidas/",//idsucursal

    detalle_usuario: remote_base_url + "usuarios/",//:idusuario

    obtener_lista_cobros_admin: remote_base_url + "admin/obtener_lista_cobros_admin/",
    obtener_lista_envios_admin: remote_base_url + "admin/obtener_lista_envios_admin/",
    obtener_lista_gastos_admin: remote_base_url + "admin/obtener_lista_gastos_admin/",
    obtener_lista_ventas_admin: remote_base_url + "admin/obtener_lista_ventas_admin/",

    mensajes: remote_base_url + "mensajes/",

    obtener_pagare: remote_base_url + "ventas/obtener_datos_pagare/",
    obtener_pagares_cliente: remote_base_url + "ventas/obtener_lista_pagares/",

}

module.exports = {
    post,get,informes,remote_base_url,local_base_url,public_urls,
}
