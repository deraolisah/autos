import { useState, useRef, useEffect } from "react";
import { Menu, Monitor, Sun, Moon, PanelRightOpen, ChevronDown } from "lucide-react";
import { useTheme } from "../../contexts/themeContext";
import ThemePopup from "../ThemePopup";
import { useAuth } from "../../contexts/authContext";

const Header = ({ setSidebarOpen }) => {
  const { user } = useAuth();
  const [themePopup, setThemePopup] = useState(false);
  const themeRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const toggleThemePopup = () => { setThemePopup(prev => !prev) }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setThemePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className='min-h-16 w-full px-4 border-b border-light-alt dark:border-dark-alt flex items-center justify-between duration-300 transition-all'>
        <button className="p-2 rounded-sm bg-light-alt/50 dark:bg-dark-alt/50 hover:bg-light-alt dark:hover:bg-dark-alt duration-300 transition-all" onClick={()=> {setSidebarOpen(prev => !prev)}}>
            {/* <Menu size={20} /> */}
            <PanelRightOpen size={20} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 cursor-pointer bg-light-alt dark:bg-dark-alt px-2 py-1 pr-1 rounded-md duration-300 transition-all">
            {user.role === "admin" ? (
              <span className="text-sm capitalize">
                {user.name}
                <ChevronDown size={14} strokeWidth={1.5} className="inline-block ml-1" />
              </span>
            ) : user.role === "user" ? (
              <span>
                {user.name}
                <ChevronDown size={14} strokeWidth={1.5} className="inline-block" />
              </span>
            ) : (
              <span className="text-sm capitalize">
                Guest
              </span>
            )}
          </div>



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