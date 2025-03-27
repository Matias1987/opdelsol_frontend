//RELEASE
//const remote_base_url = "http://54.174.39.15:3001/api/v1/"
//const local_base_url = "http://54.174.39.15:3000/v1/"

const { local_base_url, remote_base_url } = require("./config")

//TEST
//const remote_base_url = "http://54.174.39.15:3002/api/v1/"
//const local_base_url = "http://54.174.39.15:3003/v1/"

//LOCAL
//const remote_base_url = "http://localhost:3001/api/v1/"
//const local_base_url = "http://localhost:3000/v1/"

//const remote_base_url = "https://2a7b-186-123-181-180.ngrok-free.app/api/v1/";// "http://172.31.176.1:3001/api/v1/" //
//const local_base_url =  "https://clever-mice-tap.loca.lt/v1/"

//const token = "&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpYXQiOjE2ODI0NjEwMjksImV4cCI6MTY4MjQ2NDYyOX0.Unf5zmxNVQCJVD4qxSAcdcmsrs1s-q4h7Q0e2dYHHEo";
const public_urls = {
    auth: local_base_url + "usuario/auth/", 
    stock_admin: local_base_url + "admin/stock_sucursal_admin/",
    eventos_admin: local_base_url + "admin/eventos/",
    dashboard_admin : local_base_url + "admin/",
    dashboard_deposito : local_base_url + "deposito/",
    dashboard_deposito_min : local_base_url + "deposito/index_min",
    dashboard_venta : local_base_url + "ventas/",
    dashboard_caja : local_base_url + "caja/",
    dashboard_laboratorio : local_base_url + "laboratorio/",
    dashboard : local_base_url ,
    editar_multiplicadores : local_base_url + "deposito/stock/modificar_precios_categoria/",
    lista_subgrupos: local_base_url + "deposito/stock/listados/lista_subgrupos/",
    login: local_base_url + "usuario/login/login",
    nuevo_envio: local_base_url + "deposito/envio/nuevo_envio",
    lista_stock: local_base_url + "deposito/stock/listados/lista_stock",
    lista_stock_taller: local_base_url + "laboratorio/stock_taller",
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
    lista_operaciones_calibrado: local_base_url + "laboratorio/lista_operaciones_calibrado",
    lista_operaciones_pedidos: local_base_url + "laboratorio/lista_operaciones_pedidos",
    lista_operaciones_terminadas_taller: local_base_url + "laboratorio/lista_operaciones_terminadas_taller",

    transferencias: local_base_url + "caja/lista_transferencia_sucursal",

    arbol_codigos: local_base_url + "deposito/arbol_codigos",

    editar_precios: local_base_url + "deposito/stock/editar_precios",

    bajar_envios: local_base_url + "deposito/envio/descargar_envio",

    totales_venta_vendedores: local_base_url + "ventas/informes/t_ventas_v",

    ventas_medicos: local_base_url + "informes/medicos/ventas_medicos",

    ventas_vendedor: local_base_url + "ventas/informes/ventas_vendedor",

    lista_ventas_dia_vendedor: local_base_url + "admin/lista_ventas_dia",

    listausuarios: local_base_url + "admin/listausuarios",

    lista_control_stock: local_base_url + "deposito/control_stock/lista",
    
    nuevo_control_stock: local_base_url + "deposito/control_stock/carga",

    admin_sucursales: local_base_url + "admin/lista_sucursales",
    admin_medicos: local_base_url + "admin/lista_medicos",
    admin_tarjetas: local_base_url + "admin/lista_tarjetas",
    admin_bancos: local_base_url + "admin/lista_bancos",

    lista_codigos: local_base_url + "deposito/stock/listados/lista_codigos",

    imprimir_codigos: local_base_url + "deposito/imprimir_codigos",
    /*admin_sucursales: local_base_url + "",
    admin_sucursales: local_base_url + "",*/
    //admin prov
    dashboard_adm_prov: local_base_url + "admin/prov/",
    adm_prov_facturas: local_base_url + "admin/prov/facturas",
    adm_prov_cargar_factura: local_base_url + "admin/prov/cargar_factura",
    adm_prov_lista_prov: local_base_url + "admin/prov/lista_proveedores_adm",
    adm_prov_pagos: local_base_url + "admin/prov/pagos",
    adm_prov_remitos: local_base_url + "admin/prov/remitos",
    clientes_morosos: local_base_url + "caja/clientes_morosos",

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
    caja_exists: remote_base_url + "caja/exists/",
    totales_venta_vendedor: remote_base_url + "ventas/inf/v/totales_v/",
    totales_venta_sucursal: remote_base_url + "ventas/inf/v/lista_ventas_sucursal_mes/",
    totales_ventas_medicos: remote_base_url + "medicos/ventas_medico_totales/",
    lista_ventas_medico: remote_base_url + "medicos/ventas_medico/",
    obtener_caja_sucursal_dia: remote_base_url + "admin/obtener_caja_s_dia/",
    obtener_codigos_filtro: remote_base_url + "codigos/codigos_filtros/",
    obtener_totales_ventas_vendedor_dia: remote_base_url + "admin/obtener_totales_ventas_vendedor_dia/",
    obtener_ventas_dia_vendedor: remote_base_url + "admin/obtener_ventas_dia_vendedor/",
    gr_ventas_dia_totales: remote_base_url + "admin/gr/ventas_dia_totales/",
    eventos: remote_base_url + "evt/get/",
    obtener_grilla_stock: remote_base_url + "stock/obtener_grilla_stock/",
    totales_stock_ventas_periodo: remote_base_url + "admin/inf/stock/ventas/periodo/",
    obtener_ventas_taller: remote_base_url + "tl/",
    obtener_items_ventas_taller: remote_base_url + "tl/items/op/",
    lista_anotaciones: remote_base_url + "anot/lista/anot/",

    lista_tag: remote_base_url + "tag/lista/",
    lista_categoria_tag: remote_base_url + "tag/categoria/lista/",
    lista_tags_codigo: remote_base_url + "tag/lista/tag/codigo/",
    rem_t_c: remote_base_url + "tag/rem/tag/cod/",
    obtener_ventas_subgrupo: remote_base_url + "ventas/obtener/ventas/subgrupo/",
    obtener_uso_items_adic_subgrupo_periodo: remote_base_url + "adic/obtener/uso/items/adic/subgrupo/periodo/",
    obtener_lista_ventas_sucursal_periodo: remote_base_url + "admin/obtener/ventas/sucursal/periodo/",

    desactivar_tarjeta: remote_base_url + "tarjetas/de/t/",
    desactivar_banco: remote_base_url + "bancos/de/b/",
    desactivar_medico: remote_base_url + "medicos/d/m/",


    ficha_proveedor: remote_base_url + "proveedores/prov/ficha/",

    user_credentials: remote_base_url + "usuarios/perm/u/s/",

    obtener_factura_por_nro: remote_base_url + "facturas/detalle/factura/nro",

    obtener_subfamilias_de_familias: remote_base_url + "subfamilia/obtener/subfamilias/familias/",

    buscar_stock_envios: remote_base_url +  "envio/search/stock/for/envio/", //"stock/search_stock_envio/",//idsucursal/idsucursal_destino/search_value
    
    obtener_facturas_filtros: remote_base_url + "facturas/obtener/fact/uras/filtros/",

    o_c_m: remote_base_url + "clientes/g/cl/m/",

    
    tarea_g: remote_base_url + "t//t/g/",

    sorteo_get: remote_base_url + "srt/srt/",
    sorteo_get_participantes: remote_base_url + "srt/get/p/dis/",

    upload_image:  remote_base_url + "img/upload/",
    register_image:  remote_base_url +"img/register/",
    obtener_images:  remote_base_url +"img/",

    search:{
        filtro_stock: remote_base_url + "stock/filtro_stock/",
    },
    insert:{
        optica: remote_base_url + "op/",
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
        session: remote_base_url + "usuarios/adds/",
        llamada_cliente: remote_base_url + "llamadas/",
        evento: remote_base_url+"evt/",
        item_adicional: remote_base_url + "adic/",
        control_stock: remote_base_url + "cs/",
        u_permisos_a_u: remote_base_url + "usuarios/perm/u/a/m/",
        usuario: remote_base_url + "usuarios/",
        pedido: remote_base_url + "tl/ped/",
        anotacion: remote_base_url + "anot/",
        tag: remote_base_url + "tag/",
        categoria_tag: remote_base_url + "tag/categoria/",
        tag_codigo: remote_base_url + "tag/tag/codigo/",
        banco: remote_base_url + "bancos/",
        tarjeta: remote_base_url + "tarjetas/",
        cm_proveedor: remote_base_url + "proveedores/agregar/cm/proveedor/",
        pago_proveedor: remote_base_url + "proveedores/agregar/pago/proveedor/",
        tarea_: remote_base_url + "t/t/add/",
        registrar_cambio_venta_item: remote_base_url + "cb/add/cambio/item/",
        generar_sorteo: remote_base_url + "srt/gen/",
    },
    update:{
        optica: remote_base_url + "op/mod/",
        familia: remote_base_url + "familia/",
        subfamilia: remote_base_url + "subfamilia/",
        grupo: remote_base_url + "grupos/",
        subgrupo: remote_base_url + "subgrupos/",
        subgrupo_2: remote_base_url + "subgrupos/m/modif_sg/",
        codigo: remote_base_url + "codigo/",
        stock: remote_base_url + "stock/",
        envio: remote_base_url + "envio/",
        factura: remote_base_url + "facturas/",
        proveedor: remote_base_url + "proveedores/",
        sucursal: remote_base_url + "sucursales/edit/",
        modificar_multiplicador: remote_base_url + "subgrupos/modificar_multiplicador/",
        incrementar_cantidad: remote_base_url + "stock/m/incrementar_cantidad/",
        descontar_cantidad_por_codigo: remote_base_url + "stock/m/descontar_cantidad_por_codigo/",
        cambiar_venta_sucursal_deposito: remote_base_url +"ventas/cambiar_venta_sucursal_deposito/",
        inc_cantidades_stock_venta: remote_base_url +"ventas/inc_cantidades_stock_venta/",
        desc_cantidades_stock_venta: remote_base_url +"ventas/desc_cantidades_stock_venta/",
        modificar_precios_defecto_subgrupo: remote_base_url + "subgrupos/modificar_precios_defecto/",
        modificar_cantidad_categoria: remote_base_url + "stock/m/modificar_cantidad_categoria/",
        verificar_cantidades_productos: remote_base_url + "stock/verificar_cantidades_productos/",

        bloquear_cliente: remote_base_url + "clientes/bloquear/",
        update_perm_request_status: remote_base_url + "usuarios/update_s/",
        update_cliente: remote_base_url + "clientes/edit_c/",
        editar_codigo: remote_base_url + "codigos/editar_c/",
        modificar_cantidad_stock: remote_base_url + "stock/modificar_cantidad/",

        cambiar_destinatario: remote_base_url + "ventas/cambiar_destinatario/",
        cambiar_responsable: remote_base_url + "ventas/cambiar_responsable/",

        anular_cobros: remote_base_url + "cobros/anular_cobro/",
        anular_carga_manual: remote_base_url + "cargamanual/anular/",
        modificar_carga_manual: remote_base_url + "cargamanual/update/",

        modificar_cantidad_lista: remote_base_url + "stock/modificar_cantidad_lista/",

        editar_lote_codigos: remote_base_url + "codigos/editar_lote/",

        marcar_como_calibrando: remote_base_url + "tl/c/est/dep/cal/",
        marcar_como_terminado: remote_base_url + "tl/c/est/dep/ter/",
        editar_cantidad_ideal: remote_base_url + "codigos/cod/editar/stock/ideal/",
        mover_subgrupos:remote_base_url + "subgrupos/m/v/sg/",
        mover_grupos: remote_base_url + "grupos/mover/",
        cl_a_f_l:remote_base_url+"cl/a/f/l/",
        sorteo_set_ganador: remote_base_url + "srt/set/wn/",
    },
}

const get = {
    opticas: remote_base_url + "op/",
    obtener_usuarios_permisos: remote_base_url + "usuarios/l/a/s/obtener_usuarios_permisos/",
    lista_codigos_categoria: remote_base_url + "codigos/lista_por_categoria/", ///:idfamilia/:idsubfamilia/:idgrupo/:idsubgrupo
    lista_familia: remote_base_url + "familia/",
    lista_subgrupo: remote_base_url + "subgrupos/listado/subgrupos/",
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

    detalle_factura: remote_base_url + "facturas/df/",//idfactura
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
    saldo_ctacte_optica:remote_base_url + "op/obtener/saldo/cliente/optica/",
    actualizar_saldo_en_cobro: remote_base_url + "clientes/actualizar_saldo_en_cobro/",//:idcobro

    
    desbloquear_cliente: remote_base_url + "clientes/desbloquear/",//:idcliente

    lista_mutuales: remote_base_url + "mutuales/",
    obtener_mutual: remote_base_url + "mutuales/",//:idmutual
    buscar_mutual: remote_base_url + "mutuales/buscar/",//:value

    lista_medicos: remote_base_url + "medicos/",
    lista_medicos_opt: remote_base_url + "medicos/o/p/t/",
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
    caja_abierta: remote_base_url + "caja/caja_abierta/",
    

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

    obtener_categorias_productos_venta: remote_base_url + "ventas/obtener_categorias_productos_venta/",

    obtener_interes_cuota: remote_base_url + "ic/",

    obtener_localidades_provincia: remote_base_url + "localidad/obtener_localidades_provincia/",

    obtener_provincias: remote_base_url + "localidad/obtener_provincias/",

    cliente_ventas_gral: remote_base_url + "clientes/ventas_gral/",

    check_session: remote_base_url + "usuarios/checks/",

    lista_request: remote_base_url + "usuarios/l/sessions/",

    admin_totales_sucursal: remote_base_url + "admin/resumen_op_sucursal/",//:idcaja

    lista_subgrupos_subfamilia: remote_base_url + "subgrupos/subgrupos_subfamilia/",

    lista_llamadas_cliente: remote_base_url + "llamadas/",

    lista_usuarios: remote_base_url + "usuarios/",

    carga_manual: remote_base_url + "cargamanual/",

    items_adicional_venta: remote_base_url + "adic/",

    obtener_lista_controles: remote_base_url + "cs/",

    anular_envio: remote_base_url + "envio/anular/envio/",

    obtener_anotaciones: remote_base_url + "anot/",
    obtener_anotacion: remote_base_url + "anot/",//:idanotacion

    detalle_proveedor: remote_base_url + "proveedores/",

    listado_subgrupos_filtros: remote_base_url + "subgrupos/listado/subgrupos/fitros/",

    obtener_optica: remote_base_url + "op/",//:idoptica

    default_product_image: remote_base_url + "img/def/",

    
}

module.exports = {
    post,get,informes,public_urls,local_base_url
}
