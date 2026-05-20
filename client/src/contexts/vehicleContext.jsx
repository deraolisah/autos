import { createContext, use, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import axios from "axios";

const VehicleContext = createContext();

export const useVehicle = () => {
    const context = useContext(VehicleContext);
    if(!context) throw new Error("useVehicle must be used within a VehicleProvider");
    return context;
}


export const VehicleProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const { token, isAuthenticated } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;


      // Import Vehicles from json file
    // Or fetch from Backend Api using Fetch Api
    // const getVehicles = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await fetch("/api/vehicles/all");
    //         const data = await res.json();
    //         setVehicles(data);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error("Failed to fetch your vehicles:", error);            
    //     }      
    //     // setVehicles(vehiclesData);
    // };


    // Fetch All Vehicles using Axios
    const getAllVehicles = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${API_URL}/api/vehicles/all`);

            if (res.data.success && Array.isArray(res.data.data)) {
                setVehicles(res.data.data);
            } else {
                setVehicles([]);
            }
        } catch (error) {
            console.error("Failed to fetch vehicles:", error);
            setError(error.message);
            setVehicles([]);
        } finally {
            setLoading(false);
        }
    }



    // Format Price Helper
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        }).format(amount);
    };




    
    // Fetch All Favorites for a User
    // const getFavorites = async () => {
    //     if (!isAuthenticated) return;
    //     setLoading(true);
    //     try {
    //         const res = await axios.get(`${API_URL}/api/favorites`, {
    //             headers: { Authorization: `Bearer ${token}` 
    //         }
    //     });

    //     // ✅ Always set to an array
    //     if (Array.isArray(res.data)) {
    //         setFavorites(res.data);
    //     } else {
    //         setFavorites([]);
    //     }
    //     } catch (error) {
    //         console.error("Error fetching favorites:", error);
    //         setFavorites([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // Add/Remove a Vehicle to/from Favorites
    // const toggleFavorite = async (vehicleId) => {
    //     if (!isAuthenticated) {
    //         alert("Please login to add favorites");
    //         return;
    //     }
        
    //     const isFav = Array.isArray(favorites) && favorites.some(v => v._id === vehicleId);
    //     const method = isFav ? "delete" : "post";
        
    //     try {
    //         const res = await axios({
    //             method,
    //             url: method === "post" ? `${API_URL}/api/favorites/add/${vehicleId}` : `${API_URL}/api/favorites/remove/${vehicleId}`,
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
            
    //         if (method === "post") {
    //             // backend returns the vehicle object
    //             setFavorites([...favorites, res.data]);
    //         } else {
    //             // backend returns { message, id }
    //             setFavorites(favorites.filter(v => v._id !== vehicleId));
    //         }
    //     } catch (error) {
    //         console.error("Error toggling favorite:", error.response?.data?.message || error.message);
    //     }
    // };



    // Get a Single Vehicle
    // const getVehicle = async (id) => {
    //     console.log("getVehicle called with id:", id);
        
    //     if (!id) {
    //         setError("Vehicle ID is required");
    //         return null;
    //     }
        
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         // Check if vehicle already exists in vehicles array
    //         const existingVehicle = vehicles.find(v => v._id === id || v.id === id);
    //         if (existingVehicle) {
    //             console.log("Found vehicle in cache:", existingVehicle);
    //             setVehicle(existingVehicle);
    //             return existingVehicle;
    //         }

    //         const res = await axios.get(`${API_URL}/api/vehicles/${id}`); 
    //         console.log("Single vehicle response:", res.data);

    //         if (res.data.success && res.data.data) {
    //             setVehicle(res.data.data);
    //             return res.data.data;
    //         } else {
    //             console.error("Unexpected response structure:", res.data);
    //             setError("Invalid response structure");
    //             setVehicle(null);
    //             return null;
    //         }            
    //     } catch (error) {
    //         console.error("Failed to fetch vehicle:", error);
    //         setError(error.response?.data?.message || error.message); 
    //         setVehicle(null);
    //         return null;           
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // ✅ Add this helper function
    // const isFavorited = (vehicleId) => {
    //     if (!Array.isArray(favorites)) return false;
    //     return favorites.some(fav => fav._id === vehicleId);
    // };


    useEffect(() => {
        if (vehicles.length === 0) getAllVehicles();
    }, []);

    // Separate effect for favorites - depends on auth
    // useEffect(() => {
    //     if (isAuthenticated && token) {
    //         getFavorites();
    //     }
    // }, [isAuthenticated, token]);


    // The context value MUST include both functions
    const contextValue = {
        vehicles,           // Array of all vehicles
        setVehicles,
        getAllVehicles,     // Function to fetch all vehicles
        formatAmount,
        // toggleFavorite,
        // getFavorites,
        // isFavorited,
        // favorites,
        loading,
        error,
    };

    // console.log("Provider providing these keys:", Object.keys(contextValue));
    // console.log("getVehicle type:", typeof contextValue.getVehicle);

    return(
        <VehicleContext.Provider value={contextValue}>
            {children}
        </VehicleContext.Provider>
    )
}


