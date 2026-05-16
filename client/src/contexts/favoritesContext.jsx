// contexts/favoritesContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error("useFavorites must be used within a FavoritesProvider");
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, token } = useAuth();

    // Fetch favorites when user logs in
    useEffect(() => {
        if (user && token) {
            fetchFavorites();
        } else {
            setFavorites([]);
        }
    }, [user, token]);

    const fetchFavorites = async () => {
        if (!user) return;
        
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/favorites/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFavorites(response.data);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const addToFavorites = async (vehicleId) => {
        if (!user) {
            // Optionally trigger a login modal here
            alert("Please login to add favorites");
            return false;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/favorites/add/${vehicleId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Add the vehicle to favorites state
            setFavorites(prev => [...prev, response.data]);
            return true;
        } catch (error) {
            console.error("Error adding to favorites:", error);
            return false;
        }
    };

    const removeFromFavorites = async (vehicleId) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/favorites/remove/${vehicleId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Remove from favorites state
            setFavorites(prev => prev.filter(vehicle => vehicle._id !== vehicleId));
            return true;
        } catch (error) {
            console.error("Error removing from favorites:", error);
            return false;
        }
    };

    const isFavorite = (vehicleId) => {
        return favorites.some(vehicle => vehicle._id === vehicleId);
    };

    const value = {
        favorites,
        loading,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        fetchFavorites
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};