import React, { Suspense } from "react";
import { useEffect } from "react";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import RouterLayout from "./components/RoutesLayout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const Home = lazy(() => import("./pages/Home"));
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"))

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <RouterLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/admin",
                element: <Admin />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }

]);

const App = () => {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback="Loading...">
                    <RouterProvider router={router} />
                </Suspense>
            </QueryClientProvider>
        </>
    );
};

export default App;