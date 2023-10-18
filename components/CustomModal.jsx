import style_colors from "@/src/style_colors";
import { Button, Modal } from "antd";
import React from "react";
const {  useState  } = React;;
/**
 * 
 * @param onOpen function to be called before setting open to true 
 * @param validateOpen the popups opens according to the value returned by this function 
 * @param onCancel function to be called on cancel action 
 * @param onOk function to be called on OK action 
 * @param openButtonText text for the button to show 
 * @param okButtonProps button ok props
 * @param okText
 * @param block
 * @returns 
 */
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
      <Button  type="link" ghost  size="small"  onClick={showModal} block={typeof props.block !== 'undefined'}>
        {props.openButtonText}
      </Button>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={(typeof props.okButtonProps === 'undefined') ? {children:"CERRAR"} : props.okButtonProps}
        
        width={"80%"}
        title={<><h3>{props.title}</h3></>}
        open={open}
        onOk={()=>{ 
          props?.onOk?.(); 
          setOpen(false)}}
        onCancel={handleCancel}
        okText= {typeof props.okText === 'undefined' ? "CERRAR": props.okText}
        destroyOnClose={true}
      >
        {props.children}
      </Modal>
    </>
  );
};
