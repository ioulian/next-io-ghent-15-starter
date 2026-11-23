import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { useTableContext } from "../DataTable.utils";

import styles from "./DataTable.TFoot.module.css";

export type Props = { isSticky?: boolean } & ComponentPropsWithRef<"tfoot">;

function TFoot({ isSticky = false, ...props }: Props) {
  const table = useTableContext();

  return (
    <tfoot {...addClassNameToProps(props, styles.tfoot, isSticky && styles.sticky)}>
      {table.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((f) => (
            <table.AppFooter header={f} key={f.id}>
              {(footer) => {
                const columnId = footer.column.id;

                return <td colSpan={footer.colSpan}>{footer.isPlaceholder ? null : columnId}</td>;
              }}
            </table.AppFooter>
          ))}
        </tr>
      ))}
    </tfoot>
  );
}

export default memo(TFoot);
