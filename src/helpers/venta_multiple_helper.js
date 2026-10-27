const obtenerObjetoRecetaStock = () => {
  return {
    lejos: {
      od_idcodigo: 60367,
      od_esf: "",
      od_cil: "",
      od_eje: "",
      od_precio: 0,
      oi_idcodigo: "",
      oi_esf: "",
      oi_cil: "",
      oi_eje: "",
      oi_precio: "0",
      armazon_idcodigo: "",
      armazon_precio: "",
      tratamiento_idcodigo: "",
      tratamiento_precio: "0",
      distancia: "lejos",
      od_descuento: "0",
    },
    cerca: {
      od_idcodigo: 60367,
      od_esf: "",
      od_cil: "",
      od_eje: "",
      od_precio: 0,
      oi_idcodigo: "",
      oi_esf: "",
      oi_cil: "",
      oi_eje: "",
      oi_precio: "0",
      armazon_idcodigo: "",
      armazon_precio: "",
      tratamiento_idcodigo: "",
      tratamiento_precio: "0",
      distancia: "cerca",
      od_descuento: "0",
    },
  };
};
const obtenerObjetoMonofocalLaboratorio = () => {
  return {
    lejos: {
      od_idcodigo: 60367,
      od_esf: "",
      od_cil: "",
      od_eje: "",
      od_precio: 0,
      oi_idcodigo: "",
      oi_esf: "",
      oi_cil: "",
      oi_eje: "",
      oi_precio: "0",
      armazon_idcodigo: "",
      armazon_precio: "",
      tratamiento_idcodigo: "",
      tratamiento_precio: "0",
      distancia: "lejos",
      od_descuento: "0",
    },
    cerca: {
      od_idcodigo: 60367,
      od_esf: "",
      od_cil: "",
      od_eje: "",
      od_precio: 0,
      oi_idcodigo: "",
      oi_esf: "",
      oi_cil: "",
      oi_eje: "",
      oi_precio: "0",
      armazon_idcodigo: "",
      armazon_precio: "",
      tratamiento_idcodigo: "",
      tratamiento_precio: "0",
      distancia: "cerca",
      od_descuento: "0",
    },
  };
};

const obtenerObjetoMultifocalLaboratorio = () => {
  return {
    od_idcodigo: 60367,
    od_esf: "",
    od_cil: "",
    od_eje: "",
    od_precio: 0,
    oi_idcodigo: 37314,
    oi_esf: "",
    oi_cil: "",
    oi_eje: "",
    oi_precio: 0,
    armazon_idcodigo: "",
    armazon_precio: "0",
    tratamiento_idcodigo: "",
    tratamiento_precio: "0",
    od_descuento: "0",
    oi_descuento: "0",
  };
};

const obtenerObjetoLCStock = () => {
  return {
    od_idcodigo: "",
    od_esf: "",
    od_cil: "",
    od_eje: "",
    od_cantidad: "",
    od_total: "0",
    od_precio: "",
    oi_idcodigo: "",
    oi_esf: "",
    oi_cil: "",
    oi_eje: "",
    oi_cantidad: "",
    oi_total: "0",
    oi_precio: "",
    insumo_idcodigo: "",
    insumo_precio: "",
    insumo_total: "0",
  };
};

const obtenerObjetoLCLaboratorio = () => {
  return {
    od_idcodigo: "",
    od_esf: "",
    od_cil: "",
    od_eje: "",
    od_cantidad: "",
    od_total: "0",
    od_precio: "",
    oi_idcodigo: "",
    oi_esf: "",
    oi_cil: "",
    oi_eje: "",
    oi_cantidad: "",
    oi_total: "0",
    oi_precio: "",
    insumo_idcodigo: "",
    insumo_precio: "",
    insumo_total: "0",
  };
};
const parse_for_backcmp = (trabajos) => {
  let items = {
    lejos_od: null,
    lejos_oi: null,
    lejos_armazon: null,
    lejos_tratamiento: null,
    cerca_od: null,
    cerca_oi: null,
    cerca_armazon: null,
    cerca_tratamiento: null,
    lejos_od_visible: true,
    lejos_oi_visible: false,
    lejos_armazon_visible: false,
    lejos_tratamiento_visible: false,
    cerca_od_visible: false,
    cerca_oi_visible: false,
    cerca_armazon_visible: false,
    cerca_tratamiento_visible: false,
  };

  const lejos = trabajos.items.lejos;
  const cerca = trabajos.items.cerca;
  if (lejos) {
    if (lejos.od_idcodigo != "") {
      items["lejos_od"] = {
        idcodigo: lejos.od_idcodigo,
        tipo: "LEJOS_OD",
        codigo: "",
        eje: lejos.od_eje ?? "",
        esf: lejos.od_esf ?? "",
        cil: lejos.od_cil ?? "",
        precio: lejos.od_precio ?? "0",
        cantidad: 1,
      };
      items["lejos_od_visible"] = true;
    }
    if (lejos.oi_idcodigo != "") {
      items["lejos_oi"] = {
        idcodigo: lejos.od_idcodigo,
        tipo: "LEJOS_OI",
        codigo: "",
        eje: lejos.oi_eje ?? "",
        esf: lejos.oi_esf ?? "",
        cil: lejos.oi_cil ?? "",
        precio: lejos.oi_precio ?? "0",
        cantidad: 1,
      };

      items["lejos_oi_visible"] = true;
    }
    if (lejos.armazon_idcodigo != "") {
      items["lejos_armazon"] = {
        idcodigo: lejos.armazon_idcodigo,
        tipo: "LEJOS_ARMAZON",
        codigo: "",
        eje: "0",
        precio: lejos.armazon_precio ?? "0",
        cantidad: 1,
      };

      items["lejos_armazon_visible"] = true;
    }
    if (lejos.tratamiento_idcodigo != "") {
      items["lejos_tratamiento"] = {
        idcodigo: lejos.armazon_idcodigo,
        tipo: "LEJOS_TRATAMIENTO",
        codigo: "",
        eje: "0",
        precio: lejos.armazon_precio ?? "0",
        cantidad: 1,
      };

      items["lejos_tratamiento_visible"] = true;
    }
  }
  if (cerca) {
    if (cerca.od_idcodigo != "") {
      items["cerca_od"] = {
        idcodigo: cerca.od_idcodigo,
        tipo: "CERCA_OD",
        codigo: "",
        eje: cerca.eje ?? "",
        esf: cerca.esf ?? "",
        cil: cerca.cil ?? "",
        precio: cerca.precio ?? "0",
        cantidad: 1,
      };

      items["cerca_od_visible"] = true;
    }
    if (cerca.oi_idcodigo != "") {
      items["cerca_oi"] = {
        idcodigo: cerca.od_idcodigo,
        tipo: "CERCA_OI",
        codigo: "",
        eje: cerca.eje ?? "",
        esf: cerca.esf ?? "",
        cil: cerca.cil ?? "",
        precio: cerca.precio ?? "0",
        cantidad: 1,
      };

      items["cerca_oi_visible"] = true;
    }
    if (cerca.armazon_idcodigo != "") {
      items["cerca_armazon"] = {
        idcodigo: cerca.armazon_idcodigo,
        tipo: "CERCA_ARMAZON",
        codigo: "",
        eje: "0",
        precio: cerca.armazon_precio ?? "0",
        cantidad: 1,
      };

      items["cerca_armazon_visible"] = true;
    }
    if (cerca.tratamiento_idcodigo != "") {
      items["cerca_tratamiento"] = {
        idcodigo: cerca.armazon_idcodigo,
        tipo: "CERCA_TRATAMIENTO",
        codigo: "",
        eje: "0",
        precio: cerca.armazon_precio ?? "0",
        cantidad: 1,
      };

      items["cerca_tratamiento_visible"] = true;
    }
  }
  return items;
};

module.exports = {
  obtenerObjetoRecetaStock,
  obtenerObjetoMonofocalLaboratorio,
  obtenerObjetoMultifocalLaboratorio,
  obtenerObjetoLCStock,
  obtenerObjetoLCLaboratorio,
  parse_for_backcmp,
};
