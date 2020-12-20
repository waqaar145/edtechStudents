import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const toastDefaultObject = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const toastTypes = [
  'info',
  'success',
  'warning',
  'error',
  'default',
  'dark'
]

export const Toast = (message, type, toastObject) => {
  const notify = (msg) => {
    if (toastTypes.indexOf(type) > -1) {
      return toast[type](msg, toastObject);
    }
    return toast(msg, toastObject);
  };
  return (
    <div>
      {notify(message)}
      <ToastContainer />
    </div>
  );
};
