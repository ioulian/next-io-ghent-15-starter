"use client";

import {
  Children,
  cloneElement,
  ComponentPropsWithRef,
  FC,
  isValidElement,
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useId,
} from "react";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
  UseFormStateReturn,
} from "react-hook-form";

import Description from "@/components/atoms/form/description/Description";
import FieldError from "@/components/atoms/form/field-error/FieldError";
import Label from "@/components/atoms/form/label/Label";
import { getAriaDescribedBy } from "@/components/molecules/form-field/utils";
import { BE_VALIDATION } from "@/components/organisms/form/constants";

import { formField } from "./FormField.styles";

const BaseWrapper: FC<PropsWithChildren> = ({ children }) => children;

type RenderProps<T extends FieldValues = FieldValues> = (props: {
  field: ControllerRenderProps<T, FieldPath<T>>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<T>;
  props: {
    "aria-describedby"?: string;
    "aria-invalid"?: "false" | "true";
    isError?: boolean;
    id: string;
  };
}) => ReactElement;

type FormFieldProps<T extends FieldValues = FieldValues> = {
  /**
   * Render this field as a toggle (toggle or checkbox), meaning it will put the input first and label next on the same line
   */
  isToggle?: boolean;

  /**
   * Setting this option to `true` will render `<fieldset>` as a wrapper, this should be used when using multiple radio buttons or checkboxes
   */
  asFieldSet?: boolean;

  /**
   * Options to pass to react-hook-form
   */
  options?: RegisterOptions<T, FieldPath<T>>;

  /**
   * Will render asterisk on label and mark field as required. Will NOT validate!
   */
  required?: boolean;

  /**
   * Name of the input field inside. Will inject it into children
   */
  name: Path<T>;

  /**
   * Label of the form field
   */
  label?: ReactNode;

  /**
   * Will hide formfield from view, usefull when using hidden input fields
   */
  isHidden?: boolean;

  /**
   * Description of the form field
   */
  description?: ReactNode;

  /**
   * Renders a wrapper around input field, useful if you want more control of the styling of the input (third party libraries, multi-radio/checkboxes)
   */
  inputWrapper?: FC<PropsWithChildren>;
  disabled?: boolean;
  /**
   * Normal children or render function (use this for third party components, or if you want more control of the data flow)
   */
  children?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ReactElement<any, JSXElementConstructor<any>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ReactElement<any, JSXElementConstructor<any>>[]
    | RenderProps<T>;
} & Omit<ComponentPropsWithRef<"div" | "fieldset">, "children">;

/**
 * Wrapper for a formfield that will handle injection of required properties to children (input, select, ...).
 *
 * The wrapper also adds correct label, description and error messages for the current form element.
 */
const FormField = <T extends FieldValues = FieldValues>({
  asFieldSet,
  isToggle,
  name,
  label,
  description,
  inputWrapper: InputWrapper = BaseWrapper,
  options,
  required,
  isHidden,
  children,
  disabled,
  ...props
}: FormFieldProps<T>) => {
  const { register, unregister, control, formState, getFieldState } = useFormContext<T>();
  const t = useTranslations();
  const descriptionId = useId();
  const errorId = useId();
  const id = useId();

  useEffect(() => {
    return () => {
      unregister(name);
    };
  }, [unregister, name]);

  const { error } = getFieldState(name, formState);
  const registerProps = register(name, { ...options, shouldUnregister: true });
  const describedBy = getAriaDescribedBy(!!error && errorId, !!description && descriptionId);

  const Component = asFieldSet ? "fieldset" : "div";

  const sharedProps = {
    id,
    isError: !!error,
    required,
    disabled,
    ...(describedBy && { "aria-describedby": describedBy }),
    "aria-invalid": !!error ? ("true" as const) : undefined,
  };

  return (
    <Component
      // The following implementation will give ts error, we inline the logic
      // {...addClassNameToProps(props, formField({ isHidden, isDisabled: disabled, isToggle }))}
      className={clsx(formField({ isHidden, isDisabled: disabled, isToggle }), props.className)}
    >
      {label ? (
        <Label
          as={asFieldSet ? "legend" : "label"}
          htmlFor={asFieldSet ? undefined : id}
          required={required}
        >
          {label}
        </Label>
      ) : null}
      <InputWrapper>
        {typeof children === "function" ? (
          <Controller<T>
            control={control}
            name={name}
            shouldUnregister
            render={(args) => {
              return children({
                ...args,
                props: {
                  ...sharedProps,
                },
              });
            }}
          />
        ) : (
          <>
            {Children.map(children, (child) =>
              isValidElement(child)
                ? cloneElement(child, {
                    ...child.props,
                    ...registerProps,
                    name,
                    ...sharedProps,
                  })
                : /* c8 ignore next */
                  null,
            )}
          </>
        )}
      </InputWrapper>
      {error ? (
        <FieldError id={errorId}>
          {error.type === BE_VALIDATION
            ? // @ts-expect-error FIXME
              t(`common.form.validationErrors.${error.message}`)
            : // @ts-expect-error FIXME
              t(error.message)}
        </FieldError>
      ) : null}
      {description ? <Description id={descriptionId}>{description}</Description> : null}
    </Component>
  );
};

export default FormField;
