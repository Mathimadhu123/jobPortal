import { Navigate } from "react-router-dom";    

const PrivateRouteEmployer  = ({children}) =>{
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token || role !== "employer"){
        return <Navigate to="/login"/>
    }
    return children;
}

export default PrivateRouteEmployer;