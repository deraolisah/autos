import { createContext, useContext, useEffect, useState } from "react";
// import { vehicles as vehiclesData } from "../assets/data";
import axios from "axios";

const VehicleContext = createContext();

export const useVehicle = () => {
    const context = useContext(VehicleContext);
    if(!context) throw new Error("useVehicle must be used within a VehicleProvider");
    return context;
}


export const VehicleProvider = ({ children }) => {
    // const [vehicle, setVehicle] = useState(null);  // Changed from undefined to null
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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


    // Get All Vehicles using Axios
    const getAllVehicles = async () => {
        // console.log("getVehicles called with URL:", `${API_URL}/api/vehicles/all`);
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${API_URL}/api/vehicles/all`);
            // console.log("API Response:", res.data);

            if (res.data.success && Array.isArray(res.data.data)) {
                setVehicles(res.data.data);
            } else {
                // console.error("Unexpected API response structure:", res.data);
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

    useEffect(() => {
        if (vehicles.length === 0) {
            getAllVehicles();
        }
    }, []);


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

    // useEffect(() => {
    //     if (vehicle.length === 0) {
    //         getVehicle();
    //     }
    // }, []);


    // The context value MUST include both functions
    const contextValue = {
        vehicles,           // Array of all vehicles
        setVehicles,
        getAllVehicles,     // Function to fetch all vehicles
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


