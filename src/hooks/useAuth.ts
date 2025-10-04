import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user, accessToken, logout } = useAuthStore();
  const navigate = useNavigate();

  const isAuthenticated = !!accessToken;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return { user, isAuthenticated, handleLogout };
};
