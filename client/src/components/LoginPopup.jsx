import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  }

  // Handle OAuth popup
  const handleSocialLogin = (provider) => {
    // Open OAuth window
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(
      `${API_URL}/api/auth/${provider}`,
      `${provider}_login`,
      `width=${width},height=${height},left=${left},top=${top}`
    );
    
    // Listen for message from popup
    window.addEventListener('message', (event) => {
      if (event.data.type === 'social_login_success') {
        const { token, user } = event.data;
        login(token, user);
        setMessage(`✅ Logged in with ${provider}!`);
        setTimeout(() => onClose?.(), 1500);
        popup?.close();
      } else if (event.data.type === 'social_login_error') {
        setMessage(`❌ ${provider} login failed`);
        popup?.close();
      }
    });
  };

  // Handle email/password submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin && (!email || !password)) {
      setMessage("❌ Please fill in all fields");
      return;
    }
    
    if (!isLogin && (!email || !password || !name)) {
      setMessage("❌ Please fill in all fields");
      return;
    }
    
    setLoading(true);
    setMessage("");
    
    try {
      const endpoint = isLogin ? '/login' : '/register';
      const payload = isLogin ? { email, password } : { email, password, name };
      
      const response = await axios.post(`${API_URL}/api/auth${endpoint}`, payload);
      
      if (response.data.success && response.data.token) {
        login(response.data.token, response.data.user);
        setMessage(isLogin ? "✅ Logged in successfully!" : "✅ Registered successfully!");
        setTimeout(() => onClose?.(), 1000);
        navigate("/account");
      }
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.error || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto max-h-[80svh] p-4 overflow-y-auto scrollbar-hidden relative z-2000 flex flex-col items-center justify-center border border-light-alt dark:border-dark-alt bg-light dark:bg-dark rounded-2xl duration-300 transition-all">      
        <h2 className="mb-2 font-semibold text-lg"> Login </h2>

        {message && <p className="mt-4 text-sm text-center">{message}</p>}
        
      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded dark:bg-dark-alt"
            disabled={loading}
            required={!isLogin}
          />
        )}
        
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded dark:bg-dark-alt focus:outline-none"
          disabled={loading}
          required
        />
        
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded dark:bg-dark-alt focus:outline-none"
            disabled={loading}
            required
            />
            <button type="button" onClick={()=>{togglePassword()}} className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 rounded-full text-dark dark:text-light hover:bg-light-alt dark:hover:bg-dark dark:hover:text-light-alt">
              {showPassword ? (
                <Eye size={16} />
              ) : (
                <EyeOff size={16} />
              )}
            </button>
        </div>
        
        <div className="flex items-center gap-3">
            <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-700 disabled:opacity-50 duration-300 transition-all">
                {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
            </button>

            <button type="button" onClick={onClose} className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
                Cancel
            </button>
        </div>
        
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mx-auto mt-2 text-xs hover:underline"
        >
          {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
        
      </form>


        <div className="relative my-4 w-full">
            <div className="w-full absolute inset-0 flex items-center">
                <div className="w-full border-t border-light-alt dark:border-dark-alt"></div>
            </div>
            <div className="relative flex justify-center text-xs">
                <span className="px-2.5 bg-light dark:bg-dark text-gray-500">Or</span>
            </div>
        </div>


      {/* Social Login Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => handleSocialLogin('google')}
          className="w-fit bg-red-600 text-white text-xs p-2 rounded-full hover:bg-red-700 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {/* Sign in with Google */}
        </button>
        
        <button
          onClick={() => handleSocialLogin('facebook')}
          className="w-fit bg-blue-800 text-white text-xs p-2 rounded-full hover:bg-blue-900 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
          </svg>
          {/* Continue with Facebook */}
        </button>
      </div>
      
      
      
    </div>
  );
};

export default LoginPopup;