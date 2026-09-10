import type { ChangeEventHandler, ComponentPropsWithRef, FC, MouseEventHandler } from "react";

import { memo, useCallback } from "react";

import { shallow, useSelector } from "@tanstack/react-store";
import { useTranslations } from "next-intl";

import Input from "@/components/atoms/form/input/Input";

import { useHeaderContext, useTableContext } from "../DataTable.utils";

type ColumnFilterProps = {} & ComponentPropsWithRef<"div">;

const ColumnFilter: FC<ColumnFilterProps> = ({ onClick, ...props }) => {
  const t = useTranslations("common.dataTable");
  const header = useHeaderContext();
  const table = useTableContext();
  const columnId = header.column.id;

  const columnFilterValue = useSelector(
    // eslint-disable-next-line sonarjs/deprecation
    table.store,
    (state) => state.columnFilters.find((f) => f.id === columnId)?.value as string | undefined,
    { compare: shallow },
  );

  const onDivClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.stopPropagation();
      onClick?.(e);
    },
    [onClick],
  );

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      header.column.setFilterValue(e.target.value);
    },
    [header.column],
  );

  return (
    <div {...props} onClick={onDivClick}>
      <Input
        value={columnFilterValue ?? ""}
        onChange={onInputChange}
        placeholder={t("filter.placeholder", { columnId })}
      />
    </div>
  );
};

export default memo(ColumnFilter);
