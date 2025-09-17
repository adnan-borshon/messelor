import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Components/HomePage/Home.tsx';
import MainLayout from './Layout/MainLayout.tsx';
import About from './Components/HomePage/About.tsx';
import Contact from './Components/HomePage/Contact.tsx';
import { LoginForm } from './Components/HomePage/login-form.tsx';
import { SignUp } from './Components/HomePage/SignUp.tsx';
import MemberLayout from './Layout/MemberLayout.tsx';
import MemberDash from './Components/Member/MemberDash.tsx';




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
        path: "/login",
        element: <LoginForm/>
      },
      {
         path: "/signup",
        element: <SignUp/>
      }
  
    ]
  },
  {
    path: "/dashboard",
    element: <MemberLayout/>,
    children:[
      {
        path:"/dashboard",
        element: <MemberDash/>
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
