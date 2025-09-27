import iconVariantDanger from "@tabler/icons/outline/alert-circle.svg";
import iconVariantSuccess from "@tabler/icons/outline/circle-check.svg";
import { createRoot } from "react-dom/client";
import { toast, ToastContainer, ToastContent, ToastOptions } from "react-toastify/unstyled";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";

import "./Toast.css";

// DO NOT import this file directly, (it works), but it's better to load it on demand by using functions inside `notify.ts`

const TOAST_ROOT_ID = "toast-root" as const;

const setup = () => {
  const foundElement = document.getElementById(TOAST_ROOT_ID);

  if (!foundElement) {
    const element = document.createElement("div");
    element.setAttribute("id", TOAST_ROOT_ID);
    document.body.append(element);
    const root = createRoot(element);
    root.render(<ToastContainer position="top-right" toastClassName="c-toast" />);
  }
};

export const success = (content: ToastContent, options?: ToastOptions) => {
  setup();
  toast.success(content, {
    icon: <SvgSprite src={iconVariantSuccess} />,
    ...options,
  });
};

export const error = (content: ToastContent, options?: ToastOptions) => {
  setup();
  toast.error(content, {
    icon: <SvgSprite src={iconVariantDanger} />,
    ...options,
  });
};
