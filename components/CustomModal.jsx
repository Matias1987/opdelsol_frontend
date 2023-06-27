import { Button, Modal } from "antd";
import React from "react";
const {  useState  } = React;;

export default function CustomModal(props){
  const [open, setOpen] = useState(false);

  const showModal = () => {
    
    if(typeof props.onOpen !== 'undefined'){
      props.onOpen();
    }

    if(typeof props.validateOpen !== 'undefined'){
      setOpen(props.validateOpen());
    }
    else{
      setOpen(true);
    }

    
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    props?.onCancel?.();
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" ghost  size="small"  onClick={showModal}>
        {props.openButtonText}
      </Button>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{children:"CERRAR"}}
        
        width={"80%"}
        title={props.title}
        open={open}
        onOk={()=>{ 
          props?.onOk?.(); 
          setOpen(false)}}
        onCancel={handleCancel}
        okText="CERRAR"
        destroyOnClose={true}
      >
        {props.children}
      </Modal>
    </>
  );
};
