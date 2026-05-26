import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import InputBooleanCheckbox from "./field/InputBooleanCheckbox";
import InputBooleanToggle from "./field/InputBooleanToggle";
import InputCheckbox from "./field/InputCheckbox";
import InputPassword from "./field/InputPassword";
import InputRadio from "./field/InputRadio";
import InputRichText from "./field/InputRichText";
import InputText from "./field/InputText";
import InputTextArea from "./field/InputTextArea";
import InputToggle from "./field/InputToggle";
import InputField from "./input-field/InputField";
import Submit from "./submit/Submit";

export const { fieldContext, formContext, useFormContext, useFieldContext } = createFormHookContexts();

export const { useAppForm, useTypedAppFormContext } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputText,
    InputField,
    InputPassword,
    InputTextArea,
    InputBooleanCheckbox,
    InputCheckbox,
    InputRadio,
    InputBooleanToggle,
    InputToggle,
    InputRichText,
  },
  formComponents: {
    // NextButton,
    Submit,
  },
});

export const focusOnFirstError = () => {
  const invalidInput = document.querySelector('[aria-invalid="true"]') as HTMLInputElement | null;
  invalidInput?.focus();
};
