// Example using Context API for session management
import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';



interface UserType {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextProps {
    user: UserType | null;
    login: (userData: UserType) => void; 
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType |  null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData: UserType) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const value = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
};