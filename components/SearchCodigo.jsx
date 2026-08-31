import { Button, Table, Input, Row, Col } from "antd";
import { useEffect, useState } from "react";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { get } from "@/src/urls";
import { CloseOutlined } from "@ant-design/icons";

const SearchCodigo = (props) => {
  const { suggestions } = props;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
  const [useRowSelect, setUseRowSelect] = useState(false);

  const selected_style = {
    fontWeight: 600,
    color: "#000877",
    fontSize: "1.1em",
  };
  const normal_style = { fontWeight: 400, color: "#333333", fontSize: "1em" };

  useEffect(() => {
    if (props?.useRowSelect) {
      setUseRowSelect(true);
    }
  }, []);

  const onSearch = () => {
    if (searchValue.trim().length < 1) {
      return;
    }
    setLoading(true);
    fetch(get.search_codigos + searchValue)
      .then((response) => response.json())
      .then((response) => {
        /*
            this returns rows results from search
            */
        setDataSource(
          response.data.map((row) => ({
            key: row.idcodigo,
            codigo: row.codigo,
            descripcion: row.descripcion,
            idcodigo: row.idcodigo,
          })),
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const _suggestions = (_) => (
    <>
      {typeof suggestions === "undefined" ? (
        <></>
      ) : (
        suggestions.map((s) =>
          (s || "").trim().length < 1 ? (
            <></>
          ) : (
            <Button
              type="link"
              onClick={() => {
                setSearchValue(s);
              }}
            >
              <i>{s}</i>
            </Button>
          ),
        )
      )}
    </>
  );

  return (
    <>
      {(suggestions || []).length < 1 ? (
        <></>
      ) : (
        <Row>
          <Col
            span={2}
            style={{ fontSize: "0.75em", padding: "1em", textAlign: "right" }}
          >
            Sugerencias:
          </Col>
          <Col span={22} style={{ padding: "1em" }}>
            {_suggestions()}
          </Col>
        </Row>
      )}
      <Row style={{ marginBottom: "4px" }}>
        <Col span={24}>
          <Input
            value={searchValue}
            addonAfter={
              <>
                {(searchValue ?? "").length > 0 ? (
                  <Button
                    danger
                    size="small"
                    type="link"
                    onClick={(_) => {
                      setSearchValue("");
                    }}
                  >
                    <CloseOutlined />{" "}
                  </Button>
                ) : (
                  <></>
                )}
                <Button size="small" type="link" onClick={onSearch}>
                  <SearchOutlined />
                </Button>
              </>
            }
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            addonBefore={
              <div style={{ color: "red" }}>
                Buscar por código:&nbsp;&nbsp;&nbsp;
              </div>
            }
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  if (!useRowSelect) {
                    return;
                  }
                  //callback?.(record);
                  setSelectedId(record.idcodigo);
                  props.callback(record.idcodigo, record);
                },
              };
            }}
            pagination={false}
            size="small"
            scroll={{ y: "200px" }}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            }
            loading={loading}
            dataSource={dataSource}
            columns={[
              {
                title: "Codigo",
                dataIndex: "codigo",
                render: (_, { idcodigo, codigo }) => (
                  <div
                    style={
                      selectedId === idcodigo ? selected_style : normal_style
                    }
                  >
                    {codigo}
                  </div>
                ),
              },
              {
                title: "Descripcion",
                dataIndex: "descripcion",
                render: (_, { idcodigo, descripcion }) => (
                  <div
                    style={
                      selectedId === idcodigo ? selected_style : normal_style
                    }
                  >
                    {descripcion}
                  </div>
                ),
              },

              {
                title: "",
                dataIndex: "idcodigo",
                render: (_, { idcodigo }) => {
                  return useRowSelect ? (
                    <></>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          props.callback(idcodigo);
                        }}
                      >
                        <PlusOutlined />
                      </Button>
                    </>
                  );
                },
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default SearchCodigo;
