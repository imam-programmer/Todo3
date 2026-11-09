import React from 'react'
import RootLayout from './root/RootLayout';
import RegistrationPage from './pages/RegistrationPage';
import { createBrowserRouter, RouterProvider } from 'react-router';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';

const App = () => {
  const router=createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: RegistrationPage },
      { path: "login", Component: LoginPage },
      { path: "todo", Component: TodoPage },
    ],
  },
]);

  return (
    <RouterProvider router={router}>
     
    </RouterProvider>
  )
}

export default App