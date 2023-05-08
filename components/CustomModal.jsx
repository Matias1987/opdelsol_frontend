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
    /*if(props.onCancel !== typeof 'undefined'){
      onCancel();
    }*/
    setOpen(false);
  };
  return (
    <>
      <Button type="primary"  size="small"  onClick={showModal}>
        {props.openButtonText}
      </Button>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{children:"CERRAR"}}
        
        width={"80%"}
        title={props.title}
        open={open}
        onOk={()=>{ props.onOk(); setOpen(false)}}
        onCancel={handleCancel}
        okText="CERRAR"
        
      >
        {props.children}
      </Modal>
    </>
  );
};
