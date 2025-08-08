export const authTypes = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGOUT: "LOGOUT",
    SET_USER: "SET_USER",
    SET_LOADING: "SET_LOADING"
} as const;

export type AuthTypes = keyof typeof authTypes;

export type User = { 
    id: string; 
    name: string; 
    email: string 
} | null;
export type AuthState = { 
    user: User; 
    loading: boolean 
};
export type AuthAction =
  | { type: typeof authTypes.SET_USER; payload: User }
  | { type: typeof authTypes.LOGOUT }
  | { type: typeof authTypes.SET_LOADING; payload: boolean };


  export type AuthContextValue = {
    state: AuthState; 
    dispatch: React.Dispatch<AuthAction>;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  }
