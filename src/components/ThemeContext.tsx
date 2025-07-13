import { useState } from 'react'
import { useContext, createContext } from 'react';
import type { ReactNode } from 'react'

interface ThemeContextProps {
    theme: string,
    doSetTheme: (value : string) => void

}

const ThemeContext = createContext<ThemeContextProps | null>(null)

export const ThemeProvider = ({ children } : { children : ReactNode }) => {
    const [theme, setTheme] = useState(sessionStorage.getItem("theme") || 'light');

    const doSetTheme = (value : string) => {
        sessionStorage.setItem("theme", value);
        setTheme(value);
    }
    
    return (
        <ThemeContext.Provider  value={{ theme, doSetTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const theme = useContext(ThemeContext);

    if (!theme) {
        throw new Error("useTheme should be within ThemeProvider");
    }

    return theme;
}