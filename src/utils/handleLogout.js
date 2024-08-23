import { useNavigate } from "react-router-dom";


export const handleLogout=()=>{
    const navigate=useNavigate();
    sessionStorage.removeItem('userToken');
    navigate("/signin");
}