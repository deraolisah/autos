// hooks/useFavorites.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchFavorites = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites", error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (vehicleId) => {
    if (!isAuthenticated) {
      alert("Please login to add favorites");
      return false;
    }

    try {
      const response = await axios.post(`${API_URL}/api/favorites`, 
        { vehicleId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorites(prev => [...prev, response.data]);
      return true;
    } catch (error) {
      console.error("Error adding favorite", error);
      return false;
    }
  };

  const removeFromFavorites = async (favoriteId) => {
    try {
      await axios.delete(`${API_URL}/api/favorites/${favoriteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
      return true;
    } catch (error) {
      console.error("Error removing favorite", error);
      return false;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  return { favorites, loading, addToFavorites, removeFromFavorites, fetchFavorites };
};