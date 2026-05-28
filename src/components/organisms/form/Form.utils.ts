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
import Reset from "./reset/Reset";
import Submit from "./submit/Submit";

export const { fieldContext, formContext, useFormContext, useFieldContext } = createFormHookContexts();

// If you want to change values here, you can extend the form:
// https://tanstack.com/form/latest/docs/framework/react/guides/form-composition#extending-custom-appform
export const { useAppForm, useTypedAppFormContext } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    InputText,
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
    Submit,
    Reset,
  },
});

export const focusOnFirstError = () => {
  const invalidInput = document.querySelector('[aria-invalid="true"]') as HTMLInputElement | null;
  invalidInput?.focus();
};
