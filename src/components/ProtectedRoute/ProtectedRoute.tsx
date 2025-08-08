import { useAuthContext } from "../../store/authStore/context";
import type { ProtectedRouteProps } from "./types";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const { state } = useAuthContext();

    if (state.loading) return <div>Loading...</div>;

    return state.user ? children : <Navigate to="/login" replace />;
}
