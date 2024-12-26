import { createBrowserRouter } from "react-router-dom";
import LoanApplicationForm from "../forms/LoanApplicationForm";
import SuccessFormApplication from "../forms/SuccessFormApplication";

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            { path: '', element: <LoanApplicationForm /> },
            { path: 'success', element: <SuccessFormApplication /> },
        ]

    }
])