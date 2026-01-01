import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import AllBillsPage from "../Pages/AllBillsPage";
import MyProfile from "../Components/MyProfile";
import PrivateRoute from "../Private/PrivateRoute";
import BillDetailsPage from "../Pages/BillDetailsPage";
import AddBillsPage from "../Pages/AddBillsPage";
import MyBills from "../Pages/MyBills";
import Error404page from "../Pages/Error404page";

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        errorElement:<Error404page/>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/auth/login',
                Component: Login
            },
            {
                path: '/auth/signup',
                Component: SignUp
            },
            {
                path: '/bills/all-bills',
                Component: AllBillsPage,
            },
            {
                path: "/bills/:id",
                loader: ({ params }) => fetch(`https://bill-management-server-five.vercel.app/bills/${params.id}`),
                element: <BillDetailsPage></BillDetailsPage>
            },
            {
                path:'/bills/add-bills',
                element:<PrivateRoute>
                    <AddBillsPage/>
                </PrivateRoute>
            },
            {
                path:'/bills/my-bills',
                element:<PrivateRoute>
                    <MyBills/>
                </PrivateRoute>
            },
            {
                path: "my-profile",
                element: <PrivateRoute>
                    <MyProfile/>
                </PrivateRoute>
            }
        ]
    }
])

export default router