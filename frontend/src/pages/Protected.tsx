import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Children {
    children: ReactNode;
}

function Protected({children}: Children) {
    const user = localStorage.getItem("token");
    if (!user) {
        return <Navigate to={"/login"} replace/>;
    }

    return <>{children}</>;
}

export default Protected;
