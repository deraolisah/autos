// components/FavoriteButton.jsx
import { useState } from "react";
import { useFavorites } from "../contexts/favoritesContext";
import { useAuth } from "../contexts/authContext";

const FavoriteButton = ({ vehicleId, className = "" }) => {
    const { isFavorite, addToFavorites, removeFromFavorites, loading } = useFavorites();
    const { user } = useAuth();
    const [localLoading, setLocalLoading] = useState(false);
    
    const favorite = isFavorite(vehicleId);
    
    const handleToggle = async (e) => {
        e.preventDefault(); // Prevent navigation if button is inside a link
        e.stopPropagation(); // Stop event bubbling
        
        if (!user) {
            // You can replace this with a proper modal
            alert("Please login to add vehicles to favorites");
            return;
        }
        
        setLocalLoading(true);
        
        if (favorite) {
            await removeFromFavorites(vehicleId);
        } else {
            await addToFavorites(vehicleId);
        }
        
        setLocalLoading(false);
    };
    
    const isLoading = loading || localLoading;
    
    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`favorite-button ${favorite ? 'active' : ''} ${className}`}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
            {isLoading ? (
                <span className="spinner">⏳</span>
            ) : (
                <span>{favorite ? '❤️' : '🤍'}</span>
            )}
        </button>
    );
};

export default FavoriteButton;