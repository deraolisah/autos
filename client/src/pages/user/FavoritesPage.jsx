// pages/FavoritesPage.jsx
import { useFavorite } from "../../contexts/favoriteContext";
import { useAuth } from "../../contexts/authContext";
import VehicleCard from "../../components/VehicleCard"; 
import { Link } from "react-router-dom";

const FavoritesPage = () => {
    const { favorites, loading, fetchFavorites } = useFavorite();
    const { user } = useAuth();
    
    if (!user) {
        return (
            <div className="container py-4">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">My Favorites</h2>
                <div className="login-prompt">
                    <p>Please login to view your favorites</p>
                    <Link to="/login" className="btn-primary">Login</Link>
                </div>
            </div>
        );
    }
    
    if (loading) {
        return (
            <div className="container py-4">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">My Favorites</h2>
                <div className="loading-spinner">Loading your favorites...</div>
            </div>
        );
    }
    
    return (
        <div className="container py-4">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">My Favorites ({favorites.length})</h2>
            
            {favorites.length === 0 ? (
                <div className="empty-favorites">
                    <p>You haven't added any vehicles to your favorites yet.</p>
                    <Link to="/vehicles" className="btn-primary">Browse Vehicles</Link>
                </div>
            ) : (
                <div className="vehicles-grid grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-5 md:gap-5 mt-4">
                    {favorites.map(vehicle => (
                        <VehicleCard key={vehicle._id} vehicle={vehicle} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;