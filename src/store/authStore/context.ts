import { createContext, useContext } from "react";
import type { AuthContextValue, AuthState } from "./types";

export const initialState: AuthState = { user: null, loading: true };

export const AuthContext = createContext< AuthContextValue | null>(null);

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);

    if(!ctx) throw new Error(`useAuthContext использовать совместно с AuthContext`);

    return ctx;
}
