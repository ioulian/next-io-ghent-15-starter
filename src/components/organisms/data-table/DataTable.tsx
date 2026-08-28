import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./DataTable.module.css";

export type DataTableProps = {} & ComponentPropsWithRef<"div">;

/**
 * Table to be used for tanstack table
 */
const DataTable: FC<DataTableProps> = ({ children, ...props }) => {
  return (
    <div {...addClassNameToProps(props, styles.container)}>
      <table className={styles.table}>{children}</table>
    </div>
  );
};

export default memo(DataTable);
