
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import  NotFound from "./components/notFound";
import {Protected} from "./utils/ProtectedRoutes";
import SignIn from "./pages/SignIn";
import Home from "./pages/Admin/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const AppRoutes = (prop) => {

  return (
    <Routes>
        <Route path="/" index element={
          <Protected  route="/signin">              
            <Homepage />
          </Protected>
        } />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="*" element={<NotFound/>} />
        <Route path="/admin/dashboard" element={
          <Protected route="/signin">
            <Home/>
          </Protected>
        }></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
    </Routes>
    );
  };
  
  export default AppRoutes;