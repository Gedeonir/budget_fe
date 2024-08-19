
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Users/Homepage";
import  NotFound from "./components/notFound";
import {Protected} from "./utils/ProtectedRoutes";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Plan_new_budget from "./pages/Users/Plan_new_budget";
import Expenses from "./pages/Users/Expenses";
import AdminDashboard from "./components/AdminDashboard";
import Dashboard from "./pages/Admin/Dashboard";
import Requests from "./pages/Admin/Requests";
import IncomeStatements from "./pages/Admin/IncomeStatements";
import Forecast from "./pages/Admin/Forecast";
import Institutions from "./pages/Admin/Institutions";

const AppRoutes = (prop) => {

  return (
    <Routes>
        <Route path="/" index element={
          // <Protected  route="/signin">              
            <Homepage />
          // </Protected>
        } />

        <Route path="/expennditures" element={
          // <Protected route="/signin">
            <Expenses/>
          // </Protected>
        }/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="*" element={<NotFound/>} />
        <Route path="/plan-budget" element={
          // <Protected route="/signin">
            <Plan_new_budget/>
          // </Protected>
        }></Route>
        
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="dashboard/requests" element={<Requests/>}/>
        <Route path="dashboard/incomes/" element={<IncomeStatements/>}/>
        <Route path="dashboard/forecast-and-analysis" element={<Forecast/>}></Route>
        <Route path="/dashboard/government-institutions" element={<Institutions/>}/>

        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
    </Routes>
    );
  };
  
  export default AppRoutes;