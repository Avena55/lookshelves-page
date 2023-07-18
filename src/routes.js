import React, { useContext, useState }  from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterLogin from "./pages/RegisterLogin";
import Header from "./components/Header/Header";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/AuthContext";
import RegisterBook from "./pages/RegisterBook";


const ProtectedRoutes = (props) => {
    const { token } = useContext(AuthContext);

    return (
        token ? props.children : <Navigate to='/' />
    )
} 

function Router() {
    const [token, setToken] = useState();

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            <BrowserRouter>
                <Header/>     
                <Routes>                            
                    <Route path="/" element={<RegisterLogin />} />
                    <Route path="/perfil" element={<ProtectedRoutes> <Profile /> </ProtectedRoutes>}/>
                    <Route path="/registrarlivro" element={<ProtectedRoutes> <RegisterBook /> </ProtectedRoutes>}/>                    
                </Routes>                       
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default Router;