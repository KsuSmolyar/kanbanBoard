import { useEffect, useReducer, type ReactNode } from "react";
import { authTypes, type AuthAction, type AuthState } from "./types";
import { AuthContext, initialState } from "./context";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { API_URL } from "../../constants";
import { createAuthFetch } from "../../utils/createAuthFetch";

const authReducer = (state: AuthState, action: AuthAction) => {
    switch(action.type) {
        case authTypes.SET_USER: {
            return { ...state, user: action.payload, loading: false };
        }
        case authTypes.LOGOUT: {
            return { user: null, loading: false };
        }
        case authTypes.SET_LOADING: {
            return { ...state, loading: action.payload };
        }
        default:
            return state
    }
}


export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(authReducer,initialState);

    const logout = async () => {
        await fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
        dispatch({ type: authTypes.SET_USER, payload: null });
    };

    const authFetch = createAuthFetch(logout);

    const login = async (email: string, password: string) => {
        const res = await authFetch(`${API_URL}/api/auth/login`, {
        method: 'POST', 
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Login failed');
        }

        const user = await res.json();
        dispatch({ type: 'SET_USER', payload: user });
  };

    const register = async (name: string, email: string, password: string) => {
        const res = await authFetch(`${API_URL}/api/auth/register`, {
        method: 'POST', 
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Register failed');
        }
        const user = await res.json();
        dispatch({ type: authTypes.SET_USER, payload: user });
    };

    useEffect(() => {
        (async () => {
            try {
                dispatch({ type: authTypes.SET_LOADING, payload: true });
                const res = await authFetch(`${API_URL}/api/auth/me`, { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    dispatch({ type: authTypes.SET_USER, payload: data });
                } else {
                    dispatch({ type: authTypes.SET_USER, payload: null });
                }
            } catch {
                dispatch({ type: authTypes.SET_USER, payload: null });
            } finally {
                dispatch({ type: authTypes.SET_LOADING, payload: false });
            }
        })();
    },[])

    return (
        <AuthContext.Provider value={{state, dispatch, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}
