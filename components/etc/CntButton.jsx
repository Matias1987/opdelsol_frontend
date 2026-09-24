import { Button } from "antd";
import { useNetworkStatus } from "../providers/NetworkContext";

const ConnectedButton = (props) => {
  const { isOnline } = useNetworkStatus();
  return (
    <Button {...props} disabled={!isOnline || props.disabled}>
      {props.children}
    </Button>
  );
};

export default ConnectedButton;
