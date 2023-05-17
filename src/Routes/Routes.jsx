import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import BookService from "../pages/BookService/BookService";
import Bookings from "../pages/Bookings/Bookings";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/sign-up",
                element: <SignUp />
            },
            {
                path: "/book/:id",
                element: <PrivateRoutes> <BookService /> </PrivateRoutes>,
                loader: ({ params }) => fetch(`https://car-doctor-server-mocha-theta.vercel.app/services/${params.id}`)
            },
            {
                path: "/bookings",
                element: <PrivateRoutes> <Bookings /> </PrivateRoutes>
            }
        ]
    },
]);

export default router;