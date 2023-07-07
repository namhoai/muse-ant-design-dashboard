// React js
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// components
import { ProtectedRoute } from '@components/ProtectedRoute';

// layouts
import DashboardLayout from '@layouts/Main';

// Pages
import ReceiveToken from '@pages/ReceiveToken';
import LoginPage from '@pages/Login';
import LoginPageSSO from '@pages/LoginSSO';
import NotFound from '@pages/Page404';

import DashboardApp from '@pages/AdminPage/Home';

import Workspaces from '@pages/AdminPage/Workspace/Workspaces';
import WorkspacesDetail from '@pages/AdminPage/Workspace/WorkspacesDetail';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Page: Login.
    {
      path: '/login',
      element: <LoginPage />
    },
    {
        path: '/login_sso',
        element: <LoginPageSSO />
    },
    // Page: Admin.
    {
      path: '/admin',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        // dashboard
        { path: 'home', element: <DashboardApp /> },
        // class
        { path: 'workspaces', element: <Workspaces /> },
        { path: 'workspaces/:workspaceId', element: <WorkspacesDetail /> },
        // { path: 'users', element: <CTrinhHoc /> },
        // { path: 'users/detail', element: <CTrinhHoc /> },
      ]
    },
    // Page: Redirect revice info from SSO.
    {
      path: '/rececive',
      element: <ReceiveToken />
    },
    // Page: Handle Error, Exception.
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/admin/home" replace /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
