import User from "../models/userModels.js";
import Vehicle from "../models/vehicleModels.js";

// Add to favorites
export const addToFavorites = async (req, res) => {
  try {
    const userId = req.user._id; // comes from JWT middleware
    const { vehicleId } = req.params;

    // Add vehicle to user's favorites
    await User.findByIdAndUpdate(userId, {
      $addToSet: { favorites: vehicleId }
    });

    // Return the actual vehicle object
    const vehicle = await Vehicle.findById(vehicleId);
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Error adding to favorites", error: err.message });
  }
};

// Remove from favorites
export const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const { vehicleId } = req.params;

    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: vehicleId }
    });

    res.json({ message: "Vehicle removed from favorites", id: vehicleId });
  } catch (err) {
    res.status(500).json({ message: "Error removing from favorites", error: err.message });
  }
};

// Get all favorites
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    // Populate favorites with actual vehicle objects
    const user = await User.findById(userId).populate("favorites");

    // ✅ Always return an array of vehicles
    res.json(user.favorites || []);
  } catch (err) {
    res.status(500).json({ message: "Error fetching favorites", error: err.message });
  }
};
