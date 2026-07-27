import { get } from "@/src/urls";

import { Space, Select, Spin, Col, Row } from "antd";
import { useState, useEffect } from "react";

const SubGroupSelect = ({
  callback,
  disabled,
  defIdFamilia,
  defIdSubfamilia,
  defIdGrupo,
  familiaEnabled,
  subFamiliaEnabled,
  grupoEnabled,
}) => {
  const familiaFetchUrl = get.familia_menu_opt; // "http://localhost:3000/api/v1/familia/menu/options/";
  const subfamiliaFetchUrl = get.optionsforfamilia; //"http://localhost:3000/api/v1/subfamilia/optionsforfamilia/";
  const grupoFetchUrl = get.optionsforsubfamilia; //"http://localhost:3000/api/v1/grupos/optionsforsubfamilia/";
  const subGrupoFetchUrl = get.optionsforgrupo; //"http://localhost:3000/api/v1/subgrupos/optionsforgrupo/";

  const [idFamilia, setIdFamilia] = useState(-1);
  const [idSubFamilia, setIdSubFamilia] = useState(-1);
  const [idGrupo, setIdGrupo] = useState(-1);
  const [idSubGrupo, setIdSubGrupo] = useState(-1);

  const [familiaOptions, setFamiliaOptions] = useState([]);
  const [subFamiliaOptions, setSubFamiliaOptions] = useState([]);
  const [grupoOptions, setGrupoOptions] = useState([]);
  const [subGrupoOptions, setSubGrupoOptions] = useState([]);

  const [familiaLoading, setFamiliaLoading] = useState(false);
  const [subFamiliaLoading, setSubFamiliaLoading] = useState(false);
  const [grupoLoading, setGrupoLoading] = useState(false);
  const [subGrupoLoading, setSubGrupoLoading] = useState(false);

  const loadFamilia = () => {
    setFamiliaLoading(true);
    fetch(familiaFetchUrl)
      .then((response) => response.json())
      .then((response) => {
        setFamiliaOptions(response.data);

        setFamiliaLoading(false);
        if (defIdFamilia && defIdFamilia > 0) {
          setIdFamilia(defIdFamilia);
          loadSubFamilia(defIdFamilia);
        }
      })
      .catch((error) => console.error(error));
  };

  const loadSubFamilia = (_idfamilia) => {
    setSubFamiliaLoading(true);

    fetch(subfamiliaFetchUrl + _idfamilia)
      .then((response) => response.json())
      .then((response) => {
        setSubFamiliaOptions(response.data);
        setSubFamiliaLoading(false);
        if (defIdSubfamilia && defIdSubfamilia > 0) {
          setIdSubFamilia(defIdSubfamilia);
          loadGrupo(defIdSubfamilia);
        }
      })
      .catch((error) => console.error(error));
  };

  const loadGrupo = (_idsubfamilia) => {
    setGrupoLoading(true);
    fetch(grupoFetchUrl + _idsubfamilia)
      .then((response) => response.json())
      .then((response) => {
        setGrupoOptions(response.data);
        setGrupoLoading(false);
        if (defIdGrupo && defIdGrupo > 0) {
          setIdGrupo(defIdGrupo);
          loadSubgrupo(defIdGrupo);
        }
      })
      .catch((error) => console.error(error));
  };

  const loadSubgrupo = (_idgrupo) => {
    setSubGrupoLoading(true);
    fetch(subGrupoFetchUrl + _idgrupo)
      .then((response) => response.json())
      .then((response) => {
        setSubGrupoOptions(response.data);
        setSubGrupoLoading(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadFamilia();
  }, []);

  return (
    <>
      <Row gutter={2}>
        <Col>
          <Select
            prefix={<span style={{ color: "#536872" }}>Familia: </span>}
            size="small"
            disabled={
              (typeof disabled === "undefined" ? false : disabled) ||
              (typeof familiaEnabled === "undefined" ? false : !familiaEnabled)
            }
            style={{ width: "200px", overflow: "hidden" }}
            value={idFamilia == -1 ? "Seleccione..." : idFamilia}
            loading={familiaLoading}
            onChange={(value) => {
              setIdFamilia(value);
              setIdSubFamilia(-1);
              setIdGrupo(-1);
              setIdSubGrupo(-1);

              loadSubFamilia(value);
              callback(-1);
            }}
            options={familiaOptions}
          />
        </Col>
        {idFamilia == -1 ? (
          <></>
        ) : (
          <Col>
            <Select
              size="small"
              disabled={
                (typeof disabled === "undefined" ? false : disabled) ||
                (typeof subFamiliaEnabled === "undefined"
                  ? false
                  : !subFamiliaEnabled)
              }
              prefix={<span style={{ color: "#536872" }}>Subfamilia: </span>}
              style={{ width: "200px", overflow: "hidden" }}
              loading={subFamiliaLoading}
              options={subFamiliaOptions}
              placeholder={"Select"}
              value={idSubFamilia < 0 ? "Seleccione: " : idSubFamilia}
              onChange={(value) => {
                setIdSubFamilia(value);
                setIdGrupo(-1);
                setIdSubGrupo(-1);

                loadGrupo(value);
                callback(-1);
              }}
            />
          </Col>
        )}
        {idSubFamilia == -1 ? (
          <></>
        ) : (
          <Col>
            <Select
              size="small"
              disabled={
                (typeof disabled === "undefined" ? false : disabled) ||
                (typeof grupoEnabled === "undefined" ? false : !grupoEnabled)
              }
              prefix={
                <span style={{ color: "#536872", overflow: "hidden" }}>
                  Grupo:{" "}
                </span>
              }
              style={{ width: "200px" }}
              loading={grupoLoading}
              options={grupoOptions}
              placeholder={"Select"}
              value={idGrupo < 0 ? "Seleccione: " : idGrupo}
              onChange={(value) => {
                setIdGrupo(value);
                setIdSubGrupo(-1);
                loadSubgrupo(value);
                callback(-1);
              }}
            />
          </Col>
        )}
        {idGrupo == -1 ? (
          <></>
        ) : (
          <Col>
            <Select
              labelInValue
              size="small"
              disabled={typeof disabled === "undefined" ? false : disabled}
              prefix={<span style={{ color: "#536872" }}>SubGrupo: </span>}
              style={{ width: "250px", overflow: "hidden" }}
              loading={subGrupoLoading}
              options={subGrupoOptions}
              placeholder={"Seleccione"}
              value={idSubGrupo < 0 ? "Seleccione: " : idSubGrupo}
              onChange={(value) => {
                setIdSubGrupo(value.key);
                callback(value.key, value.label);
              }}
            />
          </Col>
        )}
      </Row>
    </>
  );
};

export default SubGroupSelect;
