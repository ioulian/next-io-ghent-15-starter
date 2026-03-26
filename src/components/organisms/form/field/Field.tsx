"use client";

import type {
  ComponentPropsWithRef,
  FC,
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormStateReturn,
} from "react-hook-form";

import { Children, cloneElement, isValidElement, useEffect, useId } from "react";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import { isFunction } from "@/types/type-guards";

import Checkbox from "@/components/atoms/form/collection/checkbox/Checkbox";
import Toggle from "@/components/atoms/form/collection/toggle/Toggle";
import Description from "@/components/atoms/form/description/Description";
import FieldError from "@/components/atoms/form/field-error/FieldError";
import Label from "@/components/atoms/form/label/Label";
import FormField from "@/components/molecules/form-field/FormField";
import { getAriaDescribedBy } from "@/components/molecules/form-field/FormField.utils";
import { BE_VALIDATION } from "@/components/organisms/form/Form.constants";

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

export type FormFieldProps<T extends FieldValues = FieldValues> = {
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
} & Omit<ComponentPropsWithRef<typeof FormField>, "children">;

/**
 * Wrapper for a formfield that will handle injection of required properties to children (input, select, ...).
 *
 * The wrapper also adds correct label, description and error messages for the current form element.
 */
const Field = <T extends FieldValues = FieldValues>({
  asFieldSet,
  name,
  label,
  description,
  inputWrapper: InputWrapper = BaseWrapper,
  options,
  required,
  children,
  disabled,
  ...props
  // eslint-disable-next-line sonarjs/cognitive-complexity
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

  const sharedProps = {
    id,
    isError: !!error,
    required,
    disabled,
    ...(describedBy && { "aria-describedby": describedBy }),
    "aria-invalid": !!error ? ("true" as const) : undefined,
  };

  const isCheckboxOrToggle =
    !isFunction(children) &&
    Children.count(children) === 1 &&
    Children.map(children, (child) => {
      return isValidElement(child) && (child.type === Checkbox || child.type === Toggle);
    });

  return (
    <FormField {...props} asFieldSet={asFieldSet}>
      {label && !isCheckboxOrToggle ? (
        <Label as={asFieldSet ? "legend" : "label"} htmlFor={asFieldSet ? undefined : id} required={required}>
          {label}
        </Label>
      ) : null}
      <InputWrapper>
        {isFunction(children) ? (
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
            {Children.map(children, (child) => {
              if (isValidElement(child)) {
                const newProps = {
                  ...child.props,
                  ...registerProps,
                  name,
                  ...sharedProps,
                };

                // For checkbox and toggle, we need to pass the label to the child as it's other design
                if (child.type === Checkbox || child.type === Toggle) {
                  return cloneElement(child, {
                    ...newProps,
                    children: label,
                    labelProps: {
                      required,
                    },
                  });
                }

                return cloneElement(child, newProps);
              }

              return null;
            })}
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
    </FormField>
  );
};

export default Field;
