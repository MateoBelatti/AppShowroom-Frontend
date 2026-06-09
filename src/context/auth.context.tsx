import type { AuthContextType} from "../types/auth.interfaces";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null >(null);

