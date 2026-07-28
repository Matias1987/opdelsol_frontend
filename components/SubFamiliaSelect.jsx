import { get } from "@/src/urls";

import { Space, Select } from "antd";
import { useState, useEffect } from "react";

const SubFamiliaSelect = ({
  disabled,
  callback,
  defIdFamilia,
  familiaEnabled,
}) => {
  const familiaFetchUrl = get.familia_menu_opt;
  const subfamiliaFetchUrl = get.subfamilia_menu_opt;

  const [idFamilia, setIdFamilia] = useState(-1);
  const [idSubFamilia, setIdSubFamilia] = useState(-1);

  const [familiaOptions, setFamiliaOptions] = useState([]);
  const [subFamiliaOptions, setSubFamiliaOptions] = useState([]);

  const [familiaLoading, setFamiliaLoading] = useState(false);
  const [subFamiliaLoading, setSubFamiliaLoading] = useState(false);

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
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadFamilia();
  }, []);

  return (
    <>
      <Space wrap>
        <Select
          prefix={<span style={{ color: "#536872" }}>Familia: </span>}
          disabled={
            (typeof disabled === "undefined" ? false : disabled) ||
            (typeof familiaEnabled === "undefined" ? false : !familiaEnabled)
          }
          style={{ width: 240, overflow: "hidden" }}
          size="small"
          placeholder="Seleccione..."
          loading={familiaLoading}
          onChange={(value) => {
            setIdFamilia(value);
            setIdSubFamilia(-1);

            loadSubFamilia(value);

            callback(-1, "");
          }}
          options={familiaOptions}
          value={idFamilia}
        />
        {idFamilia == -1 ? (
          <></>
        ) : (
          <Select
            labelInValue
            size="small"
            prefix={<span style={{ color: "#536872" }}>SubFamilia: </span>}
            disabled={typeof disabled === "undefined" ? false : disabled}
            style={{ width: 240, overflow: "hidden" }}
            loading={subFamiliaLoading}
            options={subFamiliaOptions}
            placeholder={"Seleccione..."}
            value={idSubFamilia < 0 ? "" : idSubFamilia}
            onChange={(value) => {
              setIdSubFamilia(value);
              callback(value.key, value.label);
            }}
          />
        )}
      </Space>
    </>
  );
};

export default SubFamiliaSelect;
