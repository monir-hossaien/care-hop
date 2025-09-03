import { createContext, useContext, useEffect } from "react";
import { userStore } from "../store/userStore.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { role, isLogin, getRole } = userStore();

    useEffect(() => {
        (async () => {
            // await getRole();
        })();
    }, []);


    return (
        <AuthContext.Provider value={{ role, isLogin, getRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
