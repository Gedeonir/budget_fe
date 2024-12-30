
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
import MyBudgets from "./pages/Users/MyBudgets";
import Officials from "./pages/Admin/Officials";
import UpdateInstitution from "./pages/Admin/UpdateInstitution";
import BudgetRequest from "./pages/Users/BudgetRequest";
import NewRequest from "./pages/Users/NewRequest";
import ViewRequest from "./pages/Users/ViewRequest";
import ViewRequestAdmin from "./pages/Admin/ViewRequestAdmin";
import BudgetDetails from "./pages/Users/BudgetDetails";
import ViewBudgetDetails from "./pages/Admin/ViewBudgetDetails";
import PlanBudget from "./pages/Admin/PlanBudget";
// import Reports from "./pages/Admin/Reports";
import AdminBudgets from "./pages/Admin/AdminBudgets";
import UpdateUser from "./pages/Admin/UpdateUser";
import MyBudget from "./pages/Admin/MyBudget";


const AppRoutes = (prop) => {

  return (
    <Routes>
        <Route path="/" index element={
          <Protected  route="/signin">              
            <Homepage />
          </Protected>
        } />

        <Route path="/expennditures" element={
          <Protected route="/signin">
            <Expenses/>
          </Protected>
        }/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="*" element={<NotFound/>} />
        <Route path="/plan-budget" element={
          <Protected route="/signin">
            <Plan_new_budget/>
          </Protected>
        }></Route>

        <Route path="/my-budgets" element={
          <Protected route="/signin">
            <MyBudgets/>
          </Protected>
        }></Route>

        <Route path="/my-budgets/:id" element={
          <Protected route="/signin">
            <BudgetDetails/>
          </Protected>
        }></Route>

        <Route path="/budget/requests" element={
          <Protected route="/signin">
            <BudgetRequest/>
          </Protected>
        }></Route>

        <Route path="/budget/requests/:id" element={
          <Protected route="/signin">
            <ViewRequest/>
          </Protected>
        }></Route>

        <Route path="/budget/requests/new" element={
          <Protected route="/signin">
            <NewRequest/>
          </Protected>
        }></Route>
        
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="dashboard/requests" element={<Requests/>}/>
        <Route path="/dashboard/all-budgets/:id" element={<ViewBudgetDetails/>}/>
        <Route path="dashboard/incomes/" element={<IncomeStatements/>}/>
        <Route path="dashboard/forecast-and-analysis" element={<Forecast/>}></Route>
        <Route path="dashboard/institutions/:id" element={<UpdateInstitution/>}/>
        <Route path="dashboard/user/:id" element={<UpdateUser/>}/>
        <Route path="dashboard/manage/my-budgets" element={<MyBudget/>}/>

        <Route path="/dashboard/budget/requests/:id" element={<ViewRequestAdmin/>}/>
        <Route path="/dashboard/plan-budget" element={<PlanBudget/>}/>
        <Route path="/dashboard/my-budgets" element={<AdminBudgets/>}/>
        <Route path="forecast" element={<Forecast/>}/>
        {/* <Route path="/report-and-analytics" element={<Reports/>}/> */}

        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
    </Routes>
    );
  };
  
  export default AppRoutes;