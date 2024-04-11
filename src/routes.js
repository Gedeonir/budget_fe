
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import  NotFound from "./components/notFound";
import {Protected} from "./utils/ProtectedRoutes";
import SignIn from "./pages/SignIn";

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
    </Routes>
    );
  };
  
  export default AppRoutes;