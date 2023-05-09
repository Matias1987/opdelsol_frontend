import { Button, Modal } from "antd";
import React from "react";
const {  useState  } = React;;

export default function CustomModal(props){
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    if(typeof props.onCancel !==  'undefined'){
      props.onCancel();
    }
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
        onOk={()=>{ 
          if(typeof props.onOk !== 'undefined'){
            props.onOk(); 
          }
          setOpen(false)}}
        onCancel={handleCancel}
        okText="CERRAR"
      >
        {props.children}
      </Modal>
    </>
  );
};
