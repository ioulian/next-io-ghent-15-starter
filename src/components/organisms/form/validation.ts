import { zodResolver } from "@hookform/resolvers/zod";
import { AppConfig } from "next-intl";
import { ZodType } from "zod";

import { Leaves } from "@/types/helpers";

export const createValidationMessage = <T extends Leaves<AppConfig["Messages"]>>(message: T) => ({
  message,
});

export const createZodResolver = <T extends ZodType>(schema: T) => zodResolver(schema);
