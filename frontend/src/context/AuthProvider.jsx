import { createContext, useContext, useEffect } from "react";
import {userStore} from "../store/userStore.js";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { role, getRole } = userStore();
    const isLogin = localStorage.getItem("isLogin");

    useEffect(() => {
        (async()=>{
            if(isLogin){
                await getRole();
            }
        })()
    }, []);

    return (
        <AuthContext.Provider value={{ role, isLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
