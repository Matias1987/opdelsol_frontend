const Resfuerzo = props =>{

    return (
        <>
          <>
            <h3>{typeof props.title === "undefined" ? "Cobro" : props.title}</h3>
            <Row>
              <Col span={24}>{cliente_detalle()}</Col>
            </Row>
            <Row>
              <Col span={24}>{venta_detalle()}</Col>
            </Row>
            <Row>
              <Col span={24}>
                <ModoPagoV4
                  idventa={
                    typeof props.idventa === "undefined" ? -1 : props.idventa
                  }
                  mostrarSoloCtaCte={props.tipo != "ingreso"}
                  totalsHidden={
                    typeof props.totalsHidden === "undefined"
                      ? true
                      : props.totalsHidden
                  }
                  callback={onMPChange}
                  total={
                    dataVenta == null
                      ? 0
                      : parseFloat(dataVenta.subtotal) -
                        parseFloat(descuento) -
                        parseFloat(dataVenta.haber || 0)
                  }
                  ctacteHidden={
                    typeof props.ctacteHidden !== undefined
                      ? props.ctacteHidden
                      : false
                  }
                  tarjetaHidden={
                    typeof props.tarjetaHidden !== undefined
                      ? props.tarjetaHidden
                      : false
                  }
                  chequeHidden={
                    typeof props.chequeHidden !== undefined
                      ? props.chequeHidden
                      : false
                  }
                  mutualHidden={
                    typeof props.mutualHidden !== undefined
                      ? props.mutualHidden
                      : false
                  }
                />
              </Col>
            </Row>
    
            {estado_switch()}
    
            {props.tipo == "cuota" && mp != null ? (
              <Button
                type="primary"
                onClick={onCobrarClick}
                disabled={cobrarDisabled || mp.total < 1}
              >
                Cobrar
              </Button>
            ) : (
              <></>
            )}
    
            {dataVenta == null || mp == null ? (
              <></>
            ) : (
              <>
                <Row>
                  <Col span={24}>
                    <Divider />
    
                    {
                      //entrega para ventas sin deuda
                      parseFloat(dataVenta.subtotal) -
                        parseFloat(descuento) -
                        parseFloat(dataVenta.haber || 0) ==
                        0 &&
                      mp.total == 0 &&
                      (entrega || props.tipo == "entrega") ? (
                        <Button
                          onClick={onCobrarClick}
                          disabled={cobrarDisabled}
                          danger
                        >
                          Entrega
                        </Button>
                      ) : (
                        <></>
                      )
                    }
                    {
                      //resfuerzo con saldo 0 posterior
                      mp.total != 0 &&
                      (props.tipo == "resfuerzo" || props.tipo == "ingreso") ? (
                        <Button
                          onClick={onCobrarClick}
                          disabled={cobrarDisabled}
                          danger
                        >
                          Cobrar
                        </Button>
                      ) : (
                        <></>
                      )
                    }
                    {
                      //intento de entrega pero con saldo distinto a 0
                      props.tipo == "entrega" &&
                      parseFloat(dataVenta.subtotal) -
                        parseFloat(descuento) -
                        parseFloat(dataVenta.haber || 0) -
                        +mp.total !=
                        0 &&
                      mp.total != 0 ? (
                        <Button
                          onClick={onCobrarClick}
                          disabled={cobrarDisabled}
                          danger
                        >
                          Cobro Resfuerzo
                        </Button>
                      ) : (
                        <></>
                      )
                    }
                    {
                      //intento de entrega pero con saldo distinto a 0
                      props.tipo == "entrega" &&
                      parseFloat(dataVenta.subtotal) -
                        parseFloat(descuento) -
                        parseFloat(dataVenta.haber || 0) !=
                        0 &&
                      parseFloat(dataVenta.subtotal) -
                        parseFloat(descuento) -
                        parseFloat(dataVenta.haber || 0) -
                        +mp.total ==
                        0 ? (
                        <Button
                          onClick={onCobrarClick}
                          disabled={cobrarDisabled}
                          danger
                        >
                          Entrega
                        </Button>
                      ) : (
                        <></>
                      )
                    }
                    {props.tipo == "ingreso" && !entrega ? (
                      <>
                        &nbsp;
                        <Button
                          disabled={mp.total > 0 || cobrarDisabled}
                          type="primary"
                          onClick={enviarADepositoClick}
                        >
                          Enviar a dep&oacute;sito{" "}
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </>
            )}
          </>
          {/* informe x */}
          <Modal
            maskClosable={false}
            width={"800px"}
            title={"Recibo X"}
            open={informeOpen}
            onOk={() => {
              setInformeOpen(false);
            }}
            onCancel={onCloseInformePopup}
            destroyOnClose={true}
            footer={null}
          >
            <PrinterWrapper>
              <InformeX idcobro={idCobro} />
            </PrinterWrapper>
          </Modal>
        </>
      );
}

export default Resfuerzo