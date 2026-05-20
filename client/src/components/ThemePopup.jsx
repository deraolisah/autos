import React from 'react';
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from '../contexts/themeContext';

const ThemePopup = () => {
    const { theme, toggleTheme, setTheme } = useTheme();

    
  return (
    <div className="w-full text-left space-y-1 text-sm" >
        {/* {theme === "light" ? "Switch to Dark Mode" : theme === "dark" ? "Switch to Light Mode" : "Switch to System Theme"} */}
        <button className={`w-full flex items-center gap-2 py-1 p-3 pr-4 rounded-md hover:bg-gray-300 dark:hover:bg-dark-alt ${theme === "system" ? "bg-gray-300 dark:bg-dark-alt" : ""}`} onClick={() => setTheme("system")}>
            <Monitor size={15} />
            <span>System</span>
        </button>
        <button className={`w-full flex items-center gap-2 py-1 p-3 pr-4 rounded-md hover:bg-gray-300 dark:hover:bg-dark-alt ${theme === "light" ? "bg-gray-300 dark:bg-dark-alt" : ""}`} onClick={() => setTheme("light")}>
            <Sun size={16} />
            <span> Light </span>
        </button>
        <button className={`w-full flex items-center gap-2 py-1 p-3 pr-4 rounded-md hover:bg-gray-300 dark:hover:bg-dark-alt ${theme === "dark" ? "bg-gray-300 dark:bg-dark-alt" : ""}`} onClick={() => setTheme("dark")}>
            <Moon size={16} strokeWidth={1.5} />
            <span> Dark </span>
        </button>
    </div>      
  )
}

export default ThemePopup;