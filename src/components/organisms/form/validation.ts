import { zodResolver } from "@hookform/resolvers/zod";
import { AppConfig } from "next-intl";

import type { FieldValues } from "react-hook-form";
import type z from "zod";
import { Leaves } from "@/types/helpers";

export const createValidationMessage = <T extends Leaves<AppConfig["Messages"]>>(message: T) => ({
  message,
});

export const createZodResolver = <T extends z.ZodType<FieldValues, FieldValues>>(schema: T) =>
  zodResolver(schema);
