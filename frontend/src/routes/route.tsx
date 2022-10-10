import { Route, Routes } from "react-router-dom";
import { Main } from "../components/Main";
import { Register } from "../components/Register";
import { RequireAuth } from "../context/RequireAuth";

export function MyRouter() {
    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <RequireAuth>
                        <Main />
                    </RequireAuth>
                } 
            />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}