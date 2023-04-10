import { Button, Modal } from "antd";
import React from "react";
const {  useState  } = React;;

export default function CustomModal(props,{children}){
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.openButtonText}
      </Button>
      <Modal
        title={props.title}
        open={open}
        onOk={()=>{ props.onOk(); setOpen(false)}}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </>
  );
};