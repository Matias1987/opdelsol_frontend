import PieChartVentasVendedorCat from "@/components/charts/PieChartVentasVendedorCat";
import FoodLoader from "@/components/etc/loader/foodLoader";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { ReloadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Flex, Progress, Row } from "antd";
import { useEffect, useState } from "react";

const VentasVendedor = ({ pIdUsuario }) => {
  const [idusuario, setIdUsuario] = useState(-1);
  const [datos_vendedor, setDatosVendedor] = useState(null);
  const [ventas_vendedor, setVentasVendedor] = useState(null);
  const [cant_ventas_dia, setCantVentasDia] = useState(0);
  const [ventas, setVentas] = useState([]);
  const [reload, setReload] = useState(false);
  const d = new Date();

  //const columns = [
  //    {dataIndex: 'usuario', title: "usuario"},
  //    {dataIndex: 'efectivo', title: "efectivo" , render:(_,{efectivo})=><div style={money_style}>{  currency_format(efectivo)  }</div>},
  //    {dataIndex: 'tarjeta', title: "tarjeta" , render:(_,{tarjeta})=><div style={money_style}>{  currency_format(tarjeta)  }</div>},
  //    {dataIndex: 'cheque', title: "cheque" , render:(_,{cheque})=><div style={money_style}>{  currency_format(cheque)  }</div>},
  //    {dataIndex: 'ctacte', title: "ctacte" , render:(_,{ctacte})=><div style={money_style}>{  currency_format(ctacte)  }</div>},
  //    {dataIndex: 'mutual', title: "mutual" , render:(_,{mutual})=><div style={money_style}>{  currency_format(mutual)  }</div>},
  //    {dataIndex: 'total', title: "total" , render:(_,{total})=><div style={money_style}>{   currency_format(total)  }</div>},
  //    { title: "", render:(_,{idusuario})=>{
  //        return <></>
  //    }},
  //]

  const columns = [
    { dataIndex: "idventa", title: "Nro." },
    { dataIndex: "cliente", title: "Cliente" },
    { dataIndex: "estado", title: "Estado" },
    { dataIndex: "tipo", title: "Tipo" },
  ];

  const load = (_) => {
    const _id = pIdUsuario ?? globals.obtenerUID();
    setIdUsuario(_id);
    //get user data
    fetch(get.detalle_usuario + _id)
      .then((resp) => resp.json())
      .then((resp) => {
        setDatosVendedor({
          nombre: resp.data.nombre,
          usuario: resp.data.usuario,
          contraseña: "***",
        });
      });
    let today = new Date();
    let target = 2_000_000;

    post_method(
      post.obtener_totales_ventas_vendedor_dia,
      {
        fecha: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        idsucursal: globals.obtenerSucursal(),
      },
      (response) => {
        let resp = response?.data || [];

        setVentas(
          resp.map((r) => ({
            usuario: r.usuario,
            monto: r.monto,
            per:
              r.monto >= target ? 100 : ((r.monto / target) * 100).toFixed(2),
          })),
        );
      },
    );
    post_method(
      post.obtener_ventas_dia_vendedor,
      {
        fecha: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        idsucursal: globals.obtenerSucursal(),
        idusuario: _id,
      },
      (response) => {
        let resp = response?.data || [];
        setCantVentasDia(resp.length);
      },
    );
  };

  const money_style = {
    textAlign: "right",
  };

  const _datos_vendedor = (_) =>
    datos_vendedor == null ? (
      <></>
    ) : (
      <>
        <Row
          style={{
            padding: "4px",
            border: "1px dotted #c9c9c9",
            padding: "4px",
            borderRadius: "6px",
          }}
        >
          <Col span={12}>
            <Avatar size={"large"} icon={<UserOutlined />}></Avatar>
            &nbsp;
            <span style={{ fontSize: "1.1em" }}>
              <b>{datos_vendedor.nombre}</b>
            </span>
          </Col>
          <Col span={12}>
            Cant. Ventas d&iacute;a: <b>{cant_ventas_dia}</b>
            &nbsp;
          </Col>
        </Row>
      </>
    );
  //const _ventas_vendedor = _=> (ventas_vendedor==null?<></>:<><Table dataSource={ventas_vendedor} columns={columns} /></>)

  useEffect(() => {
    load();
  }, [reload]);

  return (
    <>
      <Row>
        <Col span={24}>{_datos_vendedor()}</Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            padding: "4px",
            border: "1px dotted #c9c9c9",
            padding: "4px",
            borderRadius: "6px",
          }}
        >
          <Row>
            <Col span={24}>
              <i>Objetivo d&iacute;a 2 millones:</i>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {ventas.map((r) => (
                <>
                  <Row>
                    <Col span={18}>
                      <Progress
                        percent={r.per}
                        type="line"
                        percentPosition={{ align: "start", type: "outer" }}
                        size={[300, 14]}
                        strokeColor="#109618"
                        format={(percent) => (
                          <div>
                            <div
                              style={{ fontSize: "11px", fontWeight: "bold" }}
                            >
                              {r.usuario} {percent}%
                            </div>
                          </div>
                        )}
                      />
                    </Col>
                  </Row>
                </>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col
          span={12}
          style={{
            border: "1px dotted #c9c9c9",
            padding: "4px",
            borderRadius: "6px",
          }}
        >
          <Row>
            <Col span={24}>
              <span style={{ fontWeight: "400", fontStyle: "italic" }}>
                Objetivo Mensual Sucursal
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FoodLoader pReload={reload} />
            </Col>
          </Row>
        </Col>
        <Col
          span={12}
          style={{
            border: "1px dotted #c9c9c9",
            padding: "4px",
            borderRadius: "6px",
          }}
        >
          <Row>
            <Col span={24}>
              <span style={{ fontWeight: "400", fontStyle: "italic" }}>
                Ventas por Categor&iacute;a
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Flex align="center" justify="center">
                <PieChartVentasVendedorCat
                  idvendedor={idusuario}
                  reload={reload}
                />
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row
        style={{
          border: "1px dotted #c9c9c9",
          padding: "4px",
          borderRadius: "6px",
        }}
      >
        <Col span={24}>
        <Flex align="flex-end" justify="flex-end">
          <Button danger size="small" onClick={(_) => setReload(!reload)}>
            <ReloadOutlined /> Recargar
          </Button>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default VentasVendedor;
