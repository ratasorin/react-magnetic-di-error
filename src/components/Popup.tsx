import { User } from "@utils/user";
import { createPortal } from "react-dom";

const Popup = () => {
    return createPortal(<h1>{User.state()}</h1>, document.body);
}

export default Popup;