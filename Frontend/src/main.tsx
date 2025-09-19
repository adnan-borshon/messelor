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
import ManagerLayout from './Layout/ManagerLaylout.tsx'; // Add this import
import AdminLayout from './Layout/AdminLayout.tsx'; // Add this import
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

import { useParams, Navigate } from "react-router-dom";

// Helper function to get user role from localStorage
const getUserRole = (): string | null => {
  return localStorage.getItem('role');
};

// Helper function to get username from localStorage
const getUsername = (): string | null => {
  return localStorage.getItem('username');
};

// Helper function to check if user is authenticated
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  return !!(token && username && role);
};

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const role = getUserRole();
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// Role-based route wrapper that ensures correct username in URL
const RoleBasedRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const { username: urlUsername } = useParams();
  const storageUsername = getUsername();

  // Redirect if URL username doesn't match stored username
  if (storageUsername && urlUsername !== storageUsername) {
    return <Navigate to={`/${storageUsername}/dashboard`} replace />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  // Public pages
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-of-service", element: <TermsOfService /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/role", element: <Role /> },
    ],
  },

  // Member routes
  {
    path: "/:username",
    element: (
      <ProtectedRoute allowedRoles={['MEMBER']}>
        <RoleBasedRouteWrapper>
          <MemberLayout />
        </RoleBasedRouteWrapper>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <MemberDash userId={1} messId={1} />,
      },
      {
        path: "log-meal",
        element: <LogMeal userId={1} messId={1} />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "ai-insights",
        element: <AiInsights />,
      },
    ],
  },

  // Admin routes
  {
    path: "/:username/admin",
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <RoleBasedRouteWrapper>
          <AdminLayout />
        </RoleBasedRouteWrapper>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <AdminDash />,
      },
      {
        path: "mess-management",
        element: <MessManagementDashboard />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "expenses",
        element: <Expenses />,
      },
      {
        path: "log-meal",
        element: <LogMeal userId={1} messId={1} />,
      },
      {
        path: "ai-insights",
        element: <AiInsights />,
      },
    ],
  },

  // Manager routes
  {
    path: "/:username/manager",
    element: (
      <ProtectedRoute allowedRoles={['MANAGER']}>
        <RoleBasedRouteWrapper>
          <ManagerLayout />
        </RoleBasedRouteWrapper>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <ManagerDash />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "expenses",
        element: <Expenses />,
      },
      {
        path: "log-meal",
        element: <LogMeal userId={1} messId={1} />,
      },
      {
        path: "ai-insights",
        element: <AiInsights />,
      },
      {
        path: "community",
        element: <Community />,
      },
    ],
  },

  // Catch-all for unauthorized access
  {
    path: "/unauthorized",
    element: (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <a href="/login" className="text-blue-500 hover:underline">Go back to login</a>
        </div>
      </div>
    ),
  },

  // 404 fallback
  {
    path: "*",
    element: (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
          <a href="/" className="text-blue-500 hover:underline">Go back to home</a>
        </div>
      </div>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);