import IconViewSubgrupoSelector from "@/components/deposito/iconViewSubgrupoSelector";
import globals from "@/src/globals";
import { Card, Col, Row } from "antd";

const SeleccionSubgrupo = ({ callback }) => {
  return (

      <Row>
        <Col span={24}>
          <IconViewSubgrupoSelector
            idInicial={globals.familiaIDs.CRISTALES}
            tipoInicial={"familia"}
            nombreInicial={"CRISTALES"}
            callback={(id) => {
                if(!id)
                {
                    return
                }
                callback?.(id)}
            }
            disableAdd={true}
            vistaTabla={true}
          />
        </Col>
      </Row>


  );
};

export default SeleccionSubgrupo;