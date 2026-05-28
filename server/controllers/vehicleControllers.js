import Vehicle from "../models/vehicleModels.js";

// Create or Add a New Vehicle
export const addVehicle = async (req, res) => {
    // Using a try-catch block to..
    try {
        const { name, description, price, images, doors, avatar, brand, year, category, listed, ratings } = req.body;
        // const { name, price, listed } = req.body;
        // Check if all required fields are provided
        if(!name || !price || listed === undefined){
            return res.status(400).json({ 
                success: false, 
                message: "Name, price and listed are required!"
            });
        }

        // Validate images count
        if(images && images.length > 6){
            return res.status(400).json({
                success: false,
                message: "Maximum 6 images allowed per vehicle"
            });
        }

        // Then finally create the resource
        const vehicle = await Vehicle.create(req.body);
        res.status(201).json({ success: true, data: vehicle });        
    } catch (error) {
        console.error("Error creating vehicle:", error);
        res.status(500).json({ success: false, message: error.message});
    }
};


// Get All Vehicles
export const getAllVehicles = async (req, res) => {
    try {
        const { name, brand, category, search } = req.query;

        // Build filter
        const filter = {};
        if(name) filter.name = name;
        if(brand) filter.brand = brand;
        if(category) filter.category = category;

        // Integrate Search
        if(search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
            ];
        };

        const vehicles = await Vehicle.find(filter);

        res.status(200).json({ success: true, data: vehicles, count: vehicles.length,});
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: [] // Always return an empty array, even on error.
        })
    }
}



// Get A Single Vehicle by ID
export const getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await Vehicle.findById(id);

        if(!vehicle){
            return res.status(404).json({
                success: false,
                message: "Vehicle not found",
            })
        }

        res.status(200).json({ success: true, data: vehicle });        
    } catch (error) {
        console.error("Error fetching vehicle:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });        
    }
}




// Update an Entire Vehicle (PUT METHOD)
export const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        // Checking if that particular vehicle exists
        if(!updatedVehicle){
            res.status(404).json({
                success: false,
                message: "Vehicle not found!",
            });
        }
        res.status(200).json({ success: true, data: updatedVehicle });        
    } catch (error) {
        console.error("Error updating vehicle:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });        
    }
};

// Update a single field (price)
// export const updateVehiclePrice = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { price } = req.body;

//     if (!price) {
//       return res.status(400).json({
//         success: false,
//         message: "Price is required to update",
//       });
//     }

//     const updatedVehicle = await Vehicle.findByIdAndUpdate(
//       id,
//       { price }, // only update price
//       { new: true, runValidators: true }
//     );

//     if (!updatedVehicle) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     res.status(200).json({ success: true, data: updatedVehicle });
//   } catch (error) {
//     console.error("Error updating vehicle:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };




// Update a Vehicle Field (PATCH METHOD)
export const patchVehicle = async (req, res) => {
  try {
    const { id } = req.params;

        // Validate images count if images are being updated
    if(req.body.images && req.body.images.length > 6){
      return res.status(400).json({
        success: false,
        message: "Maximum 6 images allowed per vehicle"
      });
    }

    // req.body can contain one or more fields to update
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { $set: req.body }, // only update provided fields
      { new: true, runValidators: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({ success: true, data: updatedVehicle });
  } catch (error) {
    console.error("Error updating vehicle field:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};





// Delete a Vehicle
export const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await Vehicle.findByIdAndDelete(id);

        if(!vehicle){
            res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        res.json({ success: true, data: vehicle });        
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });        
    }
}