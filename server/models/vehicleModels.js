import mongoose, { Schema } from "mongoose";

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true, default: 0 },
    year: { type: String, required: false },
    vehicleType: { type: String, enum: ["Car", "Suv", "Truck", "Pick-up" ], required: false },
    fuelType: { type: String, enum: ["Electric", "Petrol", "Diesel", ], required: false },
    images: { type: [String], required: false },
    avatar: { type: String, required: false },
    brand: { type: String, required: false },
    category: { type: String },
    condition: { type: String,  enum: ["New", "Used", "Cpo" ] },
    listed: {type: Boolean, required: true, default: true },
    ratings: { type: Number, default: 0 },
});


const Vehicle = mongoose.model("Vehicle", vehicleSchema);


export default Vehicle;