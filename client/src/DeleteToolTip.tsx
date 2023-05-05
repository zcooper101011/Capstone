import { Tooltip } from "react-bootstrap";

const DeleteTooltip = (props:any) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to Delete Row
    </Tooltip>
  );

  export default DeleteTooltip