import type { FieldProps } from "@/components/organisms/form/field/Field.types";
import type { ComponentPropsWithRef, FC, ReactNode } from "react";

import { cloneElement, isValidElement, memo, useId } from "react";

import Description from "@/components/atoms/form/description/Description";
import Label from "@/components/atoms/form/label/Label";
import FormField from "@/components/molecules/form-field/FormField";

import FieldInfo from "../field-info/FieldInfo";
import { useFieldContext } from "../Form.utils";
import { getAriaDescribedBy } from "./InputField.utils";

const InputField: FC<
  {
    label: ReactNode;
    required?: boolean;
    disabled?: boolean;
    description?: ReactNode;
    passLabelToChildren?: boolean;
    asFieldSet?: boolean;
  } & ComponentPropsWithRef<typeof FormField>
> = ({
  label,
  children,
  required = false,
  disabled = false,
  description,
  passLabelToChildren = false,
  asFieldSet = false,
  ...props
}) => {
  const field = useFieldContext<string>();
  const descriptionId = useId();
  const infoId = useId();
  const id = useId();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const describedBy = getAriaDescribedBy(infoId, !!description && descriptionId);

  return (
    <FormField asFieldSet={asFieldSet} disabled={disabled} {...props}>
      {!passLabelToChildren ? (
        <Label as={asFieldSet ? "legend" : "label"} htmlFor={asFieldSet ? undefined : id} required={required}>
          {label}
        </Label>
      ) : null}
      {isValidElement<FieldProps>(children)
        ? cloneElement<FieldProps>(children, {
            id,
            required,
            name: field.name,
            disabled,
            label,
            "aria-invalid": isInvalid ? "true" : undefined,
            "aria-describedby": describedBy,
          })
        : null}
      {description ? <Description id={descriptionId}>{description}</Description> : null}
      <FieldInfo field={field} id={infoId} />
    </FormField>
  );
};

export default memo(InputField);
