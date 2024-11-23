import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from '../layouts/Main';
import Home from '../pages/Home/Payment/Payment';
import Login from '../pages/Login/Login';
import SingUp from '../pages/SingUp/SingUp';
import AllStudents from '../pages/Dashboard/AllStudents/AllStudents';
import AllUsers from '../pages/Dashboard/AllUser/AllUsers';
import AddStudents from '../pages/Dashboard/AddStudents/AddStudents';
import PaymentError from '../pages/PaymentError/PaymentError';
import PaymentSuccess from '../pages/PaymentSuccess/PaymentSuccess';
import PrivateRoutes from './PrivateRoutes';
import AdminRoutes from './AdminRoutes';
import StudentDetails from '../pages/StudentDetails/StudentDetails';

const router = createBrowserRouter([
    {
        path:"/",
        element: <Main></Main>,
        children:[
            {
                path: "/payment",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "singUp",
                element: <SingUp></SingUp>
            },
            // * Dashboard:
            {
                path: "allStudents",
                element: <PrivateRoutes><AdminRoutes><AllStudents></AllStudents></AdminRoutes></PrivateRoutes>
            },
            {
                path: "allUsers",
                element: <PrivateRoutes><AdminRoutes><AllUsers></AllUsers></AdminRoutes></PrivateRoutes>
            },
            {
                path: "addStudents",
                element: <PrivateRoutes><AdminRoutes><AddStudents></AddStudents></AdminRoutes></PrivateRoutes>
            },
            {
                path: "studentDetails/:id",
                element: <PrivateRoutes><AdminRoutes><StudentDetails></StudentDetails></AdminRoutes></PrivateRoutes>
            },
            {
                path: "paymentError",
                element: <PaymentError></PaymentError>
            },
            {
                path: "paymentSuccess",
                element: <PaymentSuccess></PaymentSuccess>
            }
        ]
    }
])

export default router;