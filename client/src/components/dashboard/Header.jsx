import { useState, useRef } from "react";
import { Menu, Monitor, Sun, Moon, PanelRightOpen } from "lucide-react";
import { useTheme } from "../../contexts/themeContext";
import ThemePopup from "../ThemePopup";

const Header = ({ setSidebarOpen }) => {
  const [themePopup, setThemePopup] = useState(false);
  const themeRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const toggleThemePopup = () => { setThemePopup(prev => !prev) }

  return (
    <header className='h-16 w-full px-4 border-b border-light-alt dark:border-dark-alt flex items-center justify-between duration-300 transition-all'>
        <button className="p-2 rounded-sm bg-light-alt/50 dark:bg-dark-alt/50 hover:bg-light-alt dark:hover:bg-dark-alt duration-300 transition-all" onClick={()=> {setSidebarOpen(prev => !prev)}}>
            {/* <Menu size={20} /> */}
            <PanelRightOpen size={20} strokeWidth={1.5} />
        </button>

        header

        <div>
          <button className="rounded-full p-2 hover:bg-gray-300 dark:hover:bg-dark-alt duration-300 transition-all" title="Theme" onClick={() => {toggleThemePopup()}}>
            {theme === "system" ? (
                <Monitor size={16} strokeWidth={1.5} />
            ) : theme === "dark" ? (
                <Moon size={16} strokeWidth={1.5} />
            ) : theme === "light" ? (
                <Sun size={16} strokeWidth={1.5} />
            ) : (
                <Monitor size={16} strokeWidth={1.5} />
            )}
          </button>

          {themePopup && (
            <div ref={themeRef} className='fixed z-100 top-15 right-[1rem] md:right-[2rem] bg-light dark:bg-dark shadow-xl rounded-xl border border-gray-300 dark:border-dark-alt p-1'>
                <ThemePopup />
            </div>
          )}
        </div>
    </header>
  )
}

export default Header;