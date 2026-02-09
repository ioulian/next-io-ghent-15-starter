import { createContext } from "react";

import type { HeaderContextType } from "./Header.types";

export const HeaderContext = createContext<HeaderContextType>({});
