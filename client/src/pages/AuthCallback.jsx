import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userParam = params.get('user');
    const error = params.get('error');

    if (error) {
      // Close popup and send error message
      if (window.opener) {
        window.opener.postMessage({ type: 'social_login_error' }, window.location.origin);
        window.close();
      } else {
        navigate('/login?error=auth_failed');
      }
    } else if (token && userParam) {
      const user = JSON.parse(decodeURIComponent(userParam));
      
      // Store token and user info
      login(token, user);
      
      // If in popup, send message to parent and close
      if (window.opener) {
        window.opener.postMessage({ 
          type: 'social_login_success', 
          token, 
          user 
        }, window.location.origin);
        window.close();
      } else {
        // Direct navigation
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [location, navigate, login]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4">Completing login...</p>
      </div>
    </div>
  );
};

export default AuthCallback;