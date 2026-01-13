import { Button, Col, DatePicker, Input, Row, Tabs, TimePicker } from "antd"
import SelectCliente from "./SelectCliente"
import { useRef, useState } from "react";
import Sobre from "./sobre/Sobre";

const VentaBaseV2 = props => {

    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);


    const initialItems = [
        { 
            label: 'Sobre 1', 
            children: <>
            <Sobre>
                {props.children}
            </Sobre>
            </>, 
            key: '1', 
            closable: false, },
        
    ];

    const onChange = newActiveKey => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = targetKey => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter(item => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    return <>
        <Row className="table-row-dark" style={{ padding: ".9em" }}>
            <Col span={24} >
                <SelectCliente openButtonText={<span style={{ color: "#3300CC" }}>&nbsp;*Seleccione Cliente</span>} callback={(value) => { onChange("fkcliente", value) }} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Tabs
                    type="editable-card"
                    onChange={onChange}
                    activeKey={activeKey}
                    onEdit={onEdit}
                    items={items}
                />
            </Col>
        </Row>
        <Row>
            <Col span={24}>

                <ModoPagoV4
                    total={typeof props !== 'undefined' ? props.total : "0"}
                    callback={(value) => { onChange("mp", value) }}
                    tarjetaHidden={false}
                    ctacteHidden={false}
                    chequeHidden={false}
                    mutualHidden={false}
                />
            </Col>
        </Row>
        <Row>
            {
                props.ocultarFechaRetiro ? <></>
                    :
                    <>
                        <Col span="12">
                            <DatePicker locale={esES} format={"DD-MM-YYYY"} onChange={(value) => { onChange("fechaRetiro", value.format("DD-MM-YYYY")) }} />
                        </Col>
                        <Col span="12">
                            <TimePicker format={'HH:mm'} onChange={(value, timeString) => { onChange("horaRetiro", timeString) }} />
                        </Col>
                    </>

            }
            <Col span="24">
                <Input.TextArea rows={2} onChange={(e) => { onChange("comentarios", e.target.value) }} />
            </Col>
            <Col span={24}>
                <Button style={{ borderRadius: "16px" }} size="large" disabled={!btnEnabled} type="primary" block onClick={finalizar_venta}>Imprimir Sobre</Button>
            </Col>
        </Row>
    </>
}

export default VentaBaseV2;