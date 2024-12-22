import { ToastContent } from "react-toastify";

/**
 * If you want named chunks, use: import(webpackChunkName: "toastify" ...)
 */
const toastify = () => import("./toastify");

/**
 * Shows success toast
 */
export const success = (content: ToastContent) => {
  return toastify().then((toast) => {
    toast.success(content);
  });
};

/**
 * Shows error toast
 */
export const error = (content: ToastContent) => {
  return toastify().then((toast) => {
    toast.error(content);
  });
};
