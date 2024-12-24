import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

import { Leaves } from "@/types/helpers";

export const createValidationMessage = <T extends Leaves<IntlMessages>>(message: T) => ({
  message,
});

export const createZodResolver = <T extends ZodType>(schema: T) => zodResolver(schema);
