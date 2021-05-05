import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ReactToastifyEmitter = (data, position) => {
  toast.dark(data, {
    position: position || "bottom-left",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
