export const handleLogout=()=>{
    sessionStorage.removeItem('userToken');
    window.location.reload();
}