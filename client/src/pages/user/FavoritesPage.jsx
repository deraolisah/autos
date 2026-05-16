// pages/FavoritesPage.jsx
import { useFavorites } from "../../contexts/favoritesContext";
import { useAuth } from "../../contexts/authContext";
import VehicleCard from "../../components/VehicleCard"; // Your existing vehicle card component
import { Link } from "react-router-dom";

const FavoritesPage = () => {
    const { favorites, loading, fetchFavorites } = useFavorites();
    const { user } = useAuth();
    
    if (!user) {
        return (
            <div className="favorites-container">
                <h2>My Favorites</h2>
                <div className="login-prompt">
                    <p>Please login to view your favorites</p>
                    <Link to="/login" className="btn-primary">Login</Link>
                </div>
            </div>
        );
    }
    
    if (loading) {
        return (
            <div className="favorites-container">
                <h2>My Favorites</h2>
                <div className="loading-spinner">Loading your favorites...</div>
            </div>
        );
    }
    
    return (
        <div className="favorites-container">
            <h2>My Favorites ({favorites.length})</h2>
            
            {favorites.length === 0 ? (
                <div className="empty-favorites">
                    <p>You haven't added any vehicles to your favorites yet.</p>
                    <Link to="/vehicles" className="btn-primary">Browse Vehicles</Link>
                </div>
            ) : (
                <div className="vehicles-grid">
                    {favorites.map(vehicle => (
                        <VehicleCard key={vehicle._id} vehicle={vehicle} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;