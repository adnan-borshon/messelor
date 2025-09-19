import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Components/HomePage/Home.tsx';
import MainLayout from './Layout/MainLayout.tsx';
import About from './Components/HomePage/About.tsx';
import Contact from './Components/HomePage/Contact.tsx';
import { LoginForm } from './Components/Authentication/login-form.tsx';
import { SignUp } from './Components/Authentication/SignUp.tsx';
import MemberLayout from './Layout/MemberLayout.tsx';
import MemberDash from './Components/Member/MemberDash.tsx';
import Role from './Components/Authentication/Role.tsx';
import LogMeal from './Components/LogMeal.tsx';
import Billing from './Components/Billing.tsx';
import Community from './Components/Community.tsx';
import ManagerDash from './Components/Manager/ManagerDash.tsx';
import MessManagementDashboard from './Components/MessManagementDashboard.tsx';
import Expenses from './Components/Manager/Expenses.tsx';
import AdminDash from './Components/Admin/AdminDash.tsx';
import AiInsights from './Components/AiInsights.tsx';
import PrivacyPolicy from './Components/HomePage/PrivacyPolicy.tsx';
import TermsOfService from './Components/HomePage/TermsOfService.tsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/about",
        element: <About/>
      },
        {
        path: "/contact",
        element: <Contact/>
      },
          {
        path: "/terms",
        element: <TermsOfService/>
      },
          {
        path: "/privacy-policy",
        element: <PrivacyPolicy/>
      },
        {
        path: "/login",
        element: <LoginForm/>
      },
      {
         path: "/signup",
        element: <SignUp/>
      },
        {
         path: "/role",
        element: <Role closeModal={() => {}}/>
      },
        {
        path:"/log-meal",
        element: <LogMeal userId={1} messId={1}/>
      },
          {
        path:"/billing",
        element: <Billing/>
      },
         {
        path:"/community",
        element: <Community/>
      },
         {
        path:"/manager",
        element: <ManagerDash/>
      },
         {
        path:"/mess-management",
        element: <MessManagementDashboard/>
      },
           {
        path:"/expenses",
        element: <Expenses/>
      },
              {
        path:"/admin-dashboard",
        element: <AdminDash/>
      },
                   {
        path:"/ai-insights",
        element: <AiInsights/>
      },
    ]
  },
  {
    path: "/dashboard",
    element: <MemberLayout/>,
    children:[
      {
        path:"/dashboard",
        element: <MemberDash userId={1} messId={1}/>
      },
    
      
   
]
  },
  {}
])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
