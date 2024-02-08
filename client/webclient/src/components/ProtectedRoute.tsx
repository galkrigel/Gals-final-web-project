import { Navigate } from "react-router-dom";
import { Routers } from "../enums/routers";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const refreshToken = localStorage.getItem("refreshToken") ?? '';

    if (!refreshToken) {
        return <Navigate to={Routers.Login} replace />;
    }

    return children;
};

export default ProtectedRoute;