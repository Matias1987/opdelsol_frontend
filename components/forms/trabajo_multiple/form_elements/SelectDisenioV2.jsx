import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select, Spin, Table } from "antd";
import { useEffect, useState } from "react";

const SelectDisenioV2 = ({ idgrupo, callback, style, idcliente }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState(null);
  const [descuento, setDescuento] = useState(null);
  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const columns = [
    {
      dataIndex: "label",
      title: "",
      width: "100%",
      render: (_, { label }) => (
        <span
          style={{ paddingLeft: "16px", fontWeight: "600", color: "#331801" }}
        >
          {label.toUpperCase().replace(/_/g, " ")}
        </span>
      ),
    },
  ];

  const onSelectBtnClick = () => {
    setModalSelectOpen(true);
  };

  const load_discounts = (idsubgrupo, callback1) => {
    //alert(JSON.stringify({ idsubgrupo: idsubgrupo, idcliente: idcliente || null }));
    post_method(
      post.descuentos_subgrupo_cliente,
      { idsubgrupo: idsubgrupo, idcliente: idcliente || null },
      (response) => {
        callback1?.(response);
      },
    );
  };

  const load = () => {
    setSelection(null);
    if (!idgrupo || +idgrupo < 0) {
      setData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const url = get.subgrupo_por_grupo_v2 + idgrupo;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const options = res.data.map((sg) => ({
          label: sg.grupo + " / " +  sg.nombre_corto,
          value: sg.idsubgrupo,
          precio: sg.precio_defecto_mayorista,
        }));
        setData(options);
        setLoading(false);
      });
    //... to do
  };

  useEffect(() => {
    load();
  }, [idgrupo]);

  const onChange = (val) => {
    setDescuento(null);
    setSelection(val);
    setLoading(true);
    load_discounts(val.value, (response) => {
      let dto = null;
      if (response && response?.length > 0) {
        dto = response[0];
        setDescuento(response[0]);
      }
      const selectedSubGrupo = data.find((d) => d.value === val.value);

      callback?.({
        idsubgrupo: val.value,
        descuento: dto ? dto?.porcentaje : 0,
        precio: selectedSubGrupo.precio,
        iddescuento: dto ? dto?.id_descuento : null,
      });
      setLoading(false);
    });
  };

  return +idgrupo > 0 ? (
    loading ? (
      <>
        <Spin />
      </>
    ) : (
      <>
        {selection ? (
          <div
            style={{ paddingLeft: "16px", paddingRight: "16px" ,  fontWeight: "600", color: "#460000" }}
          >
            {selection.label.toUpperCase().replace(/_/g, " ")}{" "}
            <Button
              danger
              type="link"
              onClick={(_) => {
                setSelection(null);
              }}
            >
              <CloseOutlined />
            </Button>
          </div>
        ) : (
          <>
            <Button type="link" onClick={onSelectBtnClick}>
              Seleccione...
            </Button>
          </>
        )}
        <Modal
          title={
            <div style={{ paddingRight: "50px" }}>
              <Input
                prefix="Búsqueda: "
                size="large"
                style={{ width: "100%" }}
                value={searchString}
                onChange={(e) => {
                  setSearchString(e.target.value ?? "");
                }}
                allowClear
              />{" "}
            </div>
          }
          footer={null}
          open={modalSelectOpen}
          width="800px"
          onCancel={(_) => {
            setModalSelectOpen(false);
          }}
        >
          <Table
            scroll={{ y: 400 }}
            dataSource={
              (searchString??"").length > 0
                ? data.filter((r) =>
                    r.label.toUpperCase().includes(searchString.toUpperCase()),
                  )
                : data
            }
            columns={columns}
            size="large"
            pagination={false}
            showHeader={false}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  onChange(record);
                  setModalSelectOpen(false);
                },
              };
            }}
          />
        </Modal>
      </>
    )
  ) : (
    <div style={{ padding: "6px" }}>
      <span
        style={{
          fontWeight: "600",
          color: "gray",
          fontStyle: "italic",
          fontSize: "11px",
        }}
      >
        Seleccione Tipo...
      </span>
    </div>
  );
};

export default SelectDisenioV2;
