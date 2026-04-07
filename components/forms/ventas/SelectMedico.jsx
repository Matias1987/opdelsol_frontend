import { useEffect, useState } from "react";
import MedicoForm from "./MedicoForm";
import CustomModal from "@/components/CustomModal";
import { Button, Input, Spin, Table, Modal } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { get } from "@/src/urls";
import { agregar_medico_ventas, id_sinreceta } from "@/src/config";

export default function SelectMedico({
  medicoRequired,
  pIdMedico,
  openButtonText,
  callback,
}) {
  const [idMedico, setIdMedico] = useState(-1);
  const [medicos, setMedicos] = useState([]);
  const [dataMedico, setDataMedico] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [popupAddOpen, setPopupAddOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    const url = get.lista_medicos;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setMedicos(
          response.data.map((r) => ({
            nombre: r.nombre,
            matricula: r.matricula,
            idmedico: r.idmedico,
          })),
        );
        if ("undefined" !== typeof medicoRequired && medicoRequired == false) {
          setIdMedico(id_sinreceta);
          onMedicoSelected(id_sinreceta);
        }
        if (pIdMedico) {
          setIdMedico(pIdMedico);
          onMedicoSelected(pIdMedico);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  const onSearch = (value) => {
    const url = get.buscar_medico;
    const _value = encodeURIComponent(value);
    setLoading(true);
    fetch(url + _value)
      .then((response) => response.json())
      .then((response) => {
        setMedicos(
          response.data.map((r) => ({
            nombre: r.nombre,
            matricula: r.matricula,
            idmedico: r.idmedico,
          })),
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onMedicoSelected = (id) => {
    //load details
    setIdMedico(id);
    fetch(get.obtener_medico + id)
      .then((response) => response.json())
      .then((response) => {
        setDataMedico({
          nombre: response.data[0].nombre,
          idmedico: response.data[0].idmedico,
          matricula: response.data[0].matricula,
        });
        callback?.(id);
      });
  };

  const show_details = () =>
    dataMedico === null ? (
      <Spin />
    ) : (
      <>
        <span style={{ fontWeight: "600", color: "#001646" }}>Medico:</span>{" "}
        <b>{dataMedico.nombre}</b> - <b>{dataMedico.matricula}</b> &nbsp;
        <Button
          size="small"
          style={{ color: "red" }}
          type="ghost"
          onClick={() => {
            setIdMedico(-1);
            setDataMedico(null);
            callback?.(null);
          }}
        >
          <CloseOutlined size={"small"} />
        </Button>
      </>
    );

  const columns = [{ dataIndex: "nombre", title: "Nombre" }];
  return idMedico == -1 ? (
    <>
      <CustomModal
        width="700px"
        openButtonText={
          typeof openButtonText === "undefined"
            ? "Seleccione Médico"
            : openButtonText
        }
        title="Seleccionar Médico"
      >
        <Input.Search prefix="Buscar: " size="small" onSearch={onSearch} />
        &nbsp;
        <br />
        <Table
          onRow={(record, index) => ({
            onClick: (e) => {
              onMedicoSelected(record.idmedico);
            },
          })}
          title={(_) => (
            <>
              Lista de M&eacute;dicos&nbsp;&nbsp;
              <Button
                size="small"
                disabled={agregar_medico_ventas == 0}
                onClick={(_) => {
                  setPopupAddOpen(true);
                }}
              >
                <PlusOutlined /> Agregar
              </Button>
            </>
          )}
          size="small"
          scroll={{ y: "500px" }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          columns={columns}
          dataSource={medicos}
        />
      </CustomModal>
      <Modal
        destroyOnClose
        width={"800px"}
        title="Agregar Médico"
        open={popupAddOpen}
        onCancel={(_) => {
          setPopupAddOpen(false);
        }}
      >
        <MedicoForm
          callback={(_) => {
            setReload(!reload);
            setPopupAddOpen(false);
          }}
        />
      </Modal>
    </>
  ) : (
    show_details()
  );
}
