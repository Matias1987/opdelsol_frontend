const { default: globals } = require("../globals")
const { post } = require("../urls")
const { post_method } = require("./post_helper")

const registrar_evento = (tipo, detalle, ref_id) => {
    const date = new Date()
    const data = {
        fkusuario: globals.obtenerUID(),
        fksucursal: globals.obtenerSucursal(),
        fecha: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        tipo: tipo,
        detalle: detalle,
        refid: ref_id,
    }
    post_method(post.insert.evento,data,(resp)=>{console.log("evt added")})
}

const registrarVentaEntregada = (ref_id) => {
    registrar_evento("VENTA", "Cambio estado a ENTREGADO", ref_id)
}
const registrarVentaPendiente = (ref_id) => {
    registrar_evento("VENTA", "Cambio estado a PENDIENTE", ref_id)
}
const registrarVentaTerminado = (ref_id) => {
    registrar_evento("VENTA", "Cambio estado a TERMINADO", ref_id)
}
const registrarVentaAnulado = (ref_id) => {
    registrar_evento("VENTA", "Cambio estado a ANULADO", ref_id)
}

module.exports = {registrar_evento,registrarVentaEntregada,registrarVentaPendiente,registrarVentaTerminado,registrarVentaAnulado,}