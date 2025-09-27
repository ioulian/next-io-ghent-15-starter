import type { ToastOptions } from "react-toastify";

import { ToastContent } from "react-toastify";

/**
 * If you want named chunks, use: import(webpackChunkName: "toastify" ...)
 */
const toastify = () => import("./toastify");

/**
 * Shows success toast
 */
export const success = (content: ToastContent, options?: ToastOptions) => {
  return toastify().then((toast) => {
    toast.success(content, options);
  });
};

/**
 * Shows error toast
 */
export const error = (content: ToastContent, options?: ToastOptions) => {
  return toastify().then((toast) => {
    toast.error(content, options);
  });
};
