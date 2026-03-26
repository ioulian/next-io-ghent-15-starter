import type { Leaves } from "@/types/helpers";
import type { AppConfig } from "next-intl";
import type { FieldValues } from "react-hook-form";
import type z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

export const createValidationMessage = <T extends Leaves<AppConfig["Messages"]>>(message: T) => {
  return {
    message,
  };
};

export const createZodResolver = <T extends z.ZodType<FieldValues, FieldValues>>(schema: T) => zodResolver(schema);
