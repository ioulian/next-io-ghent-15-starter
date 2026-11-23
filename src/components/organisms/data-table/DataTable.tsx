import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./DataTable.module.css";

export type Props = ComponentPropsWithRef<"div">;

/**
 * Table to be used for tanstack table
 */
function DataTable({ children, ...props }: Props) {
  return (
    <div {...addClassNameToProps(props, styles.container)}>
      <table className={styles.table}>{children}</table>
    </div>
  );
}

export default memo(DataTable);
